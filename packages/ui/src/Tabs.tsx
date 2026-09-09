'use client'

import { type ReactNode, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from './cn'
import { Glass } from './Glass'

export interface TabItem {
  value: string
  label: ReactNode
  panel?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: readonly TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  listClassName?: string
}

const CHIP_RADIUS = 10

export function Tabs({ items, value, defaultValue, onValueChange, className, listClassName }: TabsProps) {
  const name = useId()
  const [internal, setInternal] = useState(defaultValue ?? items.at(0)?.value ?? '')
  const active = value ?? internal

  const list = useRef<HTMLDivElement>(null)
  const pane = useRef<HTMLSpanElement>(null)
  const tabs = useRef(new Map<string, HTMLButtonElement>())

  const place = useCallback(() => {
    const el = pane.current
    const strip = list.current
    const tab = tabs.current.get(active)
    if (!el || !strip || !tab) return
    const a = tab.getBoundingClientRect()
    const b = strip.getBoundingClientRect()
    el.style.width = `${a.width}px`
    el.style.height = `${a.height}px`
    el.style.transform = `translate(${a.left - b.left}px, ${a.top - b.top}px)`
    el.style.opacity = '1'
  }, [
    active,
  ])

  useLayoutEffect(() => {
    place()
  }, [
    place,
  ])

  useEffect(() => {
    const strip = list.current
    if (!strip) return
    const observer = new ResizeObserver(place)
    observer.observe(strip)
    return () => observer.disconnect()
  }, [
    place,
  ])

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
    (event: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div className={cn('flex flex-col gap-5', className)}>
      <div
        ref={list}
        role="tablist"
        onKeyDown={onKeyDown}
        className={cn(
          'relative isolate inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto',
          listClassName,
        )}>
        <span
          ref={pane}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 isolate rounded-[10px] opacity-0 transition-[transform,width,height,opacity] duration-300 ease-rl motion-reduce:transition-[opacity]">
          <Glass
            radius={CHIP_RADIUS}
            fill="var(--chip)"
            nested
          />
        </span>
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
              'relative z-1 h-9 shrink-0 cursor-pointer rounded-[10px] px-3 text-[13px] font-medium whitespace-nowrap',
              'transition-[color,opacity] duration-(--motion-fast) ease-rl',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-green)',
              'disabled:pointer-events-none disabled:opacity-35',
              'motion-reduce:transition-none',
              item.value === active ? 'text-ink-on-night' : 'text-ink-on-night-dim hover:text-ink-on-night',
            )}>
            {item.label}
          </button>
        ))}
      </div>
      {current?.panel ? (
        <div
          role="tabpanel"
          id={`${name}-panel-${current.value}`}
          aria-labelledby={`${name}-tab-${current.value}`}
          className="animate-fade motion-reduce:animate-none">
          {current.panel}
        </div>
      ) : null}
    </div>
  )
}
