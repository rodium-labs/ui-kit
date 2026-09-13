'use client'

import { type KeyboardEvent, type ReactNode, useCallback, useId, useRef, useState } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'

export interface TabItem {
  value: string
  label: ReactNode
  panel?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: readonly TabItem[]
  label?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  listClassName?: string
}

// the selected tab draws the same underline the bar's links draw on hover, so
// the two read as one idea rather than as a tab strip bolted on.
const TAB =
  'relative flex min-h-9 shrink-0 cursor-pointer items-center px-3 text-[14px] whitespace-nowrap transition-colors duration-(--motion-fast) after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-(--motion-base) motion-reduce:transition-none motion-reduce:after:hidden'

export function Tabs({
  items,
  label = 'Sections',
  value,
  defaultValue,
  onValueChange,
  className,
  listClassName,
}: TabsProps) {
  const name = useId()
  const [internal, setInternal] = useState(defaultValue ?? items.at(0)?.value ?? '')
  const active = value ?? internal
  const tabs = useRef(new Map<string, HTMLButtonElement>())

  const select = useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next)
      onValueChange?.(next)
    },
    [
      value,
      onValueChange,
    ],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
      if (step === 0) return
      event.preventDefault()
      const usable = items.filter(item => !item.disabled)
      const at = usable.findIndex(item => item.value === active)
      const next = usable.at((at + step) % usable.length)
      if (!next) return
      select(next.value)
      tabs.current.get(next.value)?.focus()
    },
    [
      items,
      active,
      select,
    ],
  )

  const current = items.find(item => item.value === active)

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn('flex w-full items-center gap-1 overflow-x-auto border-b border-night-rule', listClassName)}>
        {items.map(item => (
          <button
            key={item.value}
            ref={node => {
              if (node) tabs.current.set(item.value, node)
              else tabs.current.delete(item.value)
            }}
            type="button"
            role="tab"
            id={`${name}-tab-${item.value}`}
            aria-selected={item.value === active}
            aria-controls={item.panel ? `${name}-panel-${item.value}` : undefined}
            tabIndex={item.value === active ? 0 : -1}
            disabled={item.disabled}
            onClick={() => select(item.value)}
            className={cn(
              TAB,
              focus,
              'disabled:pointer-events-none disabled:opacity-35',
              item.value === active
                ? 'text-ink-on-night after:scale-x-100'
                : 'text-ink-on-night-dim after:scale-x-0 hover:text-ink-on-night hover:after:scale-x-100',
            )}>
            {item.label}
          </button>
        ))}
      </div>
      {current?.panel ? (
        <div
          role="tabpanel"
          id={`${name}-panel-${current.value}`}
          aria-labelledby={`${name}-tab-${current.value}`}>
          {current.panel}
        </div>
      ) : null}
    </div>
  )
}
