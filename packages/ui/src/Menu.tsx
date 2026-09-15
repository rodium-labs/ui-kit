'use client'

import { type ReactNode, useRef } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { ChevronDown } from './glyphs.js'
import { useEdgeShift } from './useEdgeShift.js'
import { useMenuDismiss } from './useMenuDismiss.js'

export interface MenuItem {
  label: string
  href?: string
  onSelect?: () => void
  danger?: boolean
  icon?: ReactNode
  shortcut?: string
  disabled?: boolean
}

export interface MenuGroup {
  label?: string
  items: readonly MenuItem[]
}

export interface MenuProps {
  label: string
  items?: readonly MenuItem[]
  groups?: readonly MenuGroup[]
  align?: 'start' | 'end'
  className?: string
}

const ALIGN = {
  start: 'start-0',
  end: 'end-0',
}

const ITEM =
  'group/item flex min-h-9 w-full items-center gap-2.5 px-3 text-start text-[13px] transition-colors duration-(--motion-fast) motion-reduce:transition-none'

const TONE = {
  normal: 'text-ink-on-night-mid hover:bg-night-wash hover:text-ink-on-night',
  danger: 'text-danger hover:bg-[color-mix(in_oklab,var(--color-danger)_14%,transparent)]',
  // the same treatment the other controls wear, rather than the decoration
  // token: at 0.15 the label of an unavailable command cannot be read at all,
  // so nobody can tell what it is they cannot do
  off: 'pointer-events-none opacity-45',
}

function tone(item: MenuItem): string {
  if (item.disabled) return TONE.off
  return item.danger ? TONE.danger : TONE.normal
}

function Row({ item }: { item: MenuItem }) {
  const body = (
    <>
      {item.icon ? (
        <span
          aria-hidden="true"
          className="flex w-4 shrink-0 justify-center opacity-70">
          {item.icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.shortcut ? (
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[11px] text-ink-on-night-dim transition-colors duration-(--motion-fast) group-hover/item:text-ink-on-night motion-reduce:transition-none">
          {item.shortcut}
        </span>
      ) : null}
    </>
  )

  if (item.href && !item.disabled) {
    return (
      <a
        href={item.href}
        className={cn(ITEM, tone(item), focus)}>
        {body}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={item.onSelect}
      disabled={item.disabled}
      className={cn(ITEM, tone(item), focus)}>
      {body}
    </button>
  )
}

// the same native disclosure the bar wears, at menu scale. the dismissal is a
// hook rather than an injected script, so it runs in a plain client render too.
export function Menu({ label, items, groups, align = 'start', className }: MenuProps) {
  const ref = useRef<HTMLDetailsElement>(null)
  useMenuDismiss(ref)
  useEdgeShift(ref)

  const sections: readonly MenuGroup[] = groups ?? [
    {
      items: items ?? [],
    },
  ]

  return (
    <details
      ref={ref}
      className={cn('menu group relative inline-block', className)}>
      <summary
        className={cn(
          'flex min-h-9 cursor-pointer list-none items-center gap-2 border border-night-edge px-3 text-[13px] font-medium text-ink-on-night',
          'transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash',
          'group-open:border-night-edge-lit group-open:bg-night-wash',
          '[&::-webkit-details-marker]:hidden motion-reduce:transition-none',
          focus,
        )}>
        {label}
        <ChevronDown
          size={12}
          className="text-ink-on-night-dim transition-transform duration-(--motion-base) ease-through group-open:-rotate-180 motion-reduce:transition-none"
        />
      </summary>

      <div
        className={cn(
          'sheet absolute top-[calc(100%+6px)] z-40 min-w-[13rem] border border-night-edge bg-night py-1 shadow-[0_18px_44px_rgb(0_0_0/0.7)]',
          ALIGN[align],
        )}>
        {sections.map((section, index) => (
          <div
            key={section.label ?? `group-${index}`}
            className={index > 0 ? 'mt-1 border-t border-night-rule pt-1' : undefined}>
            {section.label ? (
              <p className="px-3 pt-1.5 pb-1 text-[11px] font-medium tracking-[0.14em] text-ink-on-night-dim uppercase">
                {section.label}
              </p>
            ) : null}
            {section.items.map(item => (
              <Row
                key={item.label}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    </details>
  )
}
