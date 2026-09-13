'use client'

import { type ReactNode, useRef } from 'react'
import { Arrow } from './Arrow.js'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { useMenuDismiss } from './useMenuDismiss.js'

export interface BarLink {
  label: string
  href: string
}

export interface BarProps {
  logo?: ReactNode
  name?: string
  home?: string
  links?: readonly BarLink[]
  actionLabel?: string
  actionHref?: string
  /** sits between the links and the outbound action, in the row and the sheet */
  actions?: ReactNode
  className?: string
}

// the link that draws its own underline on hover and focus, left to right
const section =
  'relative flex items-center text-[14px] text-ink-on-night-mid transition-colors duration-(--motion-fast) after:absolute after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-(--motion-base) hover:text-ink-on-night hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:hidden'

const outbound =
  'nudge press flex shrink-0 items-center gap-1.5 border border-night-edge font-medium text-ink-on-night transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash motion-reduce:transition-none'

export function Bar({ logo, name, home = '/', links = [], actionLabel, actionHref, actions, className }: BarProps) {
  const menu = useRef<HTMLDetailsElement>(null)
  useMenuDismiss(menu)

  return (
    <header className={cn('bar sticky top-0 z-40 h-(--nav-h)', className)}>
      <div
        aria-hidden="true"
        className="glass"
      />
      <div className="mx-auto flex h-full w-full max-w-[1120px] items-center gap-x-8 px-6 py-2.5 min-[620px]:py-5">
        <a
          href={home}
          className={cn('flex min-h-11 shrink-0 items-center gap-2.5 text-ink-on-night min-[620px]:min-h-6', focus)}>
          {logo}
          {name ? <span className="text-[15px] font-semibold tracking-[-0.01em]">{name}</span> : null}
        </a>

        {links.length > 0 ? (
          <nav
            aria-label="Sections"
            className="ms-auto hidden items-center gap-x-1 min-[620px]:flex">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={cn(section, 'min-h-9 px-3 after:inset-x-3 after:bottom-1.5', focus)}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div
          className={cn('flex shrink-0 items-center gap-2', links.length > 0 ? 'ms-auto min-[620px]:ms-0' : 'ms-auto')}>
          {actions}

          {actionHref && actionLabel ? (
            <a
              href={actionHref}
              target="_blank"
              rel="noreferrer"
              className={cn(outbound, 'hidden min-h-9 px-3.5 text-[14px] min-[620px]:flex', focus)}>
              {actionLabel}
              <Arrow />
            </a>
          ) : null}

          {/* narrow widths carry one row and a disclosure. the panel hangs off
              the bar rather than growing it, so the cover keeps its screen. */}
          {links.length > 0 ? (
            <details
              ref={menu}
              className="menu min-[620px]:hidden">
              <summary
                aria-label="Menu"
                className={cn(
                  'flex size-11 cursor-pointer list-none items-center justify-center text-ink-on-night [&::-webkit-details-marker]:hidden',
                  focus,
                )}>
                <span
                  aria-hidden="true"
                  className="bars"
                />
              </summary>
              <nav
                aria-label="Sections"
                className="sheet">
                <div className="mx-auto grid w-full max-w-[1120px] gap-1 px-6 py-4">
                  {links.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(section, 'min-h-11 text-[16px] after:inset-x-0 after:bottom-2', focus)}>
                      {link.label}
                    </a>
                  ))}
                  {actionHref && actionLabel ? (
                    <a
                      href={actionHref}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(outbound, 'mt-3 min-h-11 justify-center px-4 text-[15px]', focus)}>
                      {actionLabel}
                      <Arrow />
                    </a>
                  ) : null}
                </div>
              </nav>
            </details>
          ) : null}
        </div>
      </div>
    </header>
  )
}
