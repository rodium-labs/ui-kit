'use client'

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from './cn'
import { Glass } from './Glass'

export interface NavLink {
  label: string
  href: string
}

export interface NavbarProps {
  logo?: ReactNode
  name?: string
  home?: string
  links?: readonly NavLink[]
  actions?: ReactNode
  className?: string
}

const CONDENSE_AT = 24
const BAR_HEIGHT = 56
const BAR_HEIGHT_TOUCH = 64
const BAR_RADIUS = 14
const SHEET_RADIUS = 14
const CHIP_RADIUS = 12
const BUTTON_RADIUS = 10

export function Navbar({ logo, name, home = '/', links = [], actions, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [touch, setTouch] = useState(false)
  const row = useRef<HTMLElement>(null)
  const pane = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () =>
      setScrolled(was => {
        const now = window.scrollY > CONDENSE_AT
        return now === was ? was : now
      })
    onScroll()
    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    const narrow = window.matchMedia('(width < 769px)')
    const onNarrow = () => setTouch(narrow.matches)
    onNarrow()
    narrow.addEventListener('change', onNarrow)

    return () => {
      window.removeEventListener('scroll', onScroll)
      narrow.removeEventListener('change', onNarrow)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    menuOpen,
  ])

  const moveTo = useCallback((link: HTMLElement | null) => {
    const el = pane.current
    const strip = row.current
    if (!el || !strip) return
    if (!link) {
      el.style.opacity = '0'
      return
    }
    const a = link.getBoundingClientRect()
    const b = strip.getBoundingClientRect()
    el.style.width = `${a.width}px`
    el.style.height = `${a.height}px`
    el.style.transform = `translate(${a.left - b.left}px, ${a.top - b.top}px)`
    el.style.opacity = '1'
  }, [])

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close the menu"
          onClick={() => setMenuOpen(false)}
          className="animate-fade fixed inset-0 z-40 cursor-default bg-(--veil) motion-reduce:animate-none min-[769px]:hidden"
        />
      ) : null}

      <header
        className={cn(
          'animate-drop pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4 motion-reduce:animate-none min-[769px]:top-5 min-[769px]:px-(--gutter)',
          className,
        )}>
        <Bar
          lit={scrolled}
          radius={BAR_RADIUS}
          height={touch ? BAR_HEIGHT_TOUCH : BAR_HEIGHT}
          className={cn(
            'pointer-events-auto w-full transition-[max-width] duration-500 ease-rl motion-reduce:transition-none',
            scrolled ? 'max-w-[1276px]' : 'max-w-[1680px]',
          )}
          inner="flex h-full w-full items-center justify-between px-2.5 min-[769px]:pl-4">
          <div className="flex min-w-0 items-center">
            <a
              href={home}
              className="flex min-h-11 min-w-11 shrink-0 items-center gap-2 text-ink-on-night transition-opacity duration-(--motion-fast) hover:opacity-70">
              {logo}
              {name ? (
                <span className="hidden text-[15px] font-medium tracking-[-0.01em] min-[341px]:inline">{name}</span>
              ) : null}
            </a>

            {links.length > 0 ? (
              <>
                <span
                  aria-hidden="true"
                  className="mr-2 ml-[18px] hidden text-[18px] font-light text-ink-on-night-dim select-none min-[769px]:block">
                  /
                </span>

                <nav
                  ref={row}
                  aria-label="Sections"
                  className="relative hidden items-center gap-2 min-[769px]:flex"
                  onPointerLeave={() => moveTo(null)}
                  onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget)) moveTo(null)
                  }}>
                  <span
                    ref={pane}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 isolate rounded-[12px] opacity-0 transition-[transform,width,height,opacity] duration-300 ease-rl motion-reduce:transition-[opacity]">
                    <Glass
                      radius={CHIP_RADIUS}
                      fill="var(--chip)"
                      nested
                    />
                  </span>
                  {links.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      onPointerEnter={event => moveTo(event.currentTarget)}
                      onFocus={event => moveTo(event.currentTarget)}
                      className="relative z-1 rounded-[12px] px-2.5 py-2.5 text-[13px] font-medium tracking-[0.04em] text-ink-on-night uppercase opacity-75 transition-[opacity,scale] duration-(--motion-fast) ease-rl hover:opacity-100 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100">
                      {link.label}
                    </a>
                  ))}
                </nav>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2 min-[769px]:gap-3">
            {actions}
            {links.length > 0 ? (
              <button
                type="button"
                aria-label={menuOpen ? 'Close the menu' : 'Open the menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(open => !open)}
                className="group relative isolate flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[12px] text-ink-on-night transition-[translate,scale] duration-(--motion-base) ease-rl hover:-translate-y-px hover:[--chip:var(--chip-hover)] hover:[--glass-specular:var(--glass-specular-hover)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[769px]:hidden">
                <Glass
                  radius={BUTTON_RADIUS}
                  fill="var(--chip)"
                  sweep
                  nested
                />
                <MenuGlyph open={menuOpen} />
              </button>
            ) : null}
          </div>
        </Bar>

        {menuOpen ? (
          <Bar
            lit
            tint={0.62}
            radius={SHEET_RADIUS}
            className="animate-sheet pointer-events-auto mt-2 w-full origin-top motion-reduce:animate-none min-[769px]:hidden"
            inner="animate-fade flex w-full flex-col gap-1 p-1 motion-reduce:animate-none">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group relative isolate flex min-h-11 items-center rounded-[10px] px-3 text-[13px] font-medium tracking-[0.04em] text-ink-on-night uppercase">
                <span className="opacity-0 transition-opacity duration-(--motion-fast) group-hover:opacity-100">
                  <Glass
                    radius={BUTTON_RADIUS}
                    fill="var(--chip)"
                    sweep
                    nested
                  />
                </span>
                {link.label}
              </a>
            ))}
          </Bar>
        ) : null}
      </header>
    </>
  )
}

interface BarProps {
  lit: boolean
  radius: number
  height?: number
  tint?: number
  className: string
  inner: string
  children: ReactNode
}

function Bar({ lit, radius, height, tint = 0, className, inner, children }: BarProps) {
  return (
    <div
      className={cn('relative isolate', className)}
      style={{
        borderRadius: radius,
        height,
        backgroundColor: lit && tint > 0 ? `rgb(0 0 0 / ${tint})` : undefined,
      }}>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-[-1] transition-[opacity,visibility] duration-500 ease-rl motion-reduce:transition-none',
          lit ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        style={{
          borderRadius: radius,
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          backgroundImage: 'var(--glass-sheen)',
          boxShadow: 'var(--glass-glow)',
        }}
      />
      <div className={inner}>{children}</div>
    </div>
  )
}

function MenuGlyph({ open }: { open: boolean }) {
  const line = 'origin-center transition-transform duration-(--motion-base) ease-rl motion-reduce:transition-none'
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round">
        <line
          x1={2.5}
          y1={open ? 8 : 5}
          x2={13.5}
          y2={open ? 8 : 5}
          className={cn(line, open && 'rotate-45')}
        />
        <line
          x1={2.5}
          y1={open ? 8 : 11}
          x2={13.5}
          y2={open ? 8 : 11}
          className={cn(line, open && '-rotate-45')}
        />
      </g>
    </svg>
  )
}
