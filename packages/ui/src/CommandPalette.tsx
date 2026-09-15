'use client'

import { type KeyboardEvent, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from './cn.js'
import { Search } from './glyphs.js'
import { Kbd } from './Kbd.js'

export interface CommandItem {
  id: string
  label: string
  group?: string
  hint?: string
  keywords?: string
  onSelect: () => void
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: readonly CommandItem[]
  placeholder?: string
  empty?: ReactNode
  label?: string
}

function score(item: CommandItem, query: string): number {
  if (query === '') return 0
  const q = query.toLowerCase()
  const label = item.label.toLowerCase()
  if (label === q) return 0
  if (label.startsWith(q)) return 1
  if (label.includes(q)) return 2
  const haystack = `${item.group ?? ''} ${item.keywords ?? ''} ${item.hint ?? ''}`.toLowerCase()
  return haystack.includes(q) ? 3 : Number.POSITIVE_INFINITY
}

/**
 * Opens on the platform's own shortcut and on the slash key, closes on escape.
 * The input keeps focus the whole time and aria-activedescendant names the
 * highlighted row, which is what lets one field drive a list.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = 'Search…',
  empty = 'Nothing matched.',
  label = 'Search',
}: CommandPaletteProps) {
  const base = useId()
  const listId = `${base}-list`
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const found = useMemo(() => {
    const ranked = items
      .map(item => ({
        item,
        rank: score(item, query),
      }))
      .filter(entry => entry.rank !== Number.POSITIVE_INFINITY)
    if (query !== '') ranked.sort((a, b) => a.rank - b.rank)
    return ranked.map(entry => entry.item)
  }, [
    items,
    query,
  ])

  const activeItem = found.at(active)

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      setQuery('')
      setActive(0)
      input.current?.focus()
    }
    if (!open && el.open) el.close()
  }, [
    open,
  ])

  // the shortcut is global, so it is bound to the document rather than a field
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey
      if (mod && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(true)
        return
      }
      // a bare slash only opens it when the reader is not already typing
      if (event.key === '/' && !mod) {
        const target = event.target
        const typing =
          target instanceof HTMLElement &&
          (target.isContentEditable ||
            [
              'INPUT',
              'TEXTAREA',
              'SELECT',
            ].includes(target.tagName))
        if (typing) return
        event.preventDefault()
        onOpenChange(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [
    onOpenChange,
  ])

  const pick = useCallback(
    (item: CommandItem) => {
      onOpenChange(false)
      item.onSelect()
    },
    [
      onOpenChange,
    ],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (found.length === 0) return
        const step = event.key === 'ArrowDown' ? 1 : -1
        const next = (active + step + found.length) % found.length
        setActive(next)
        requestAnimationFrame(() => {
          list.current?.querySelector('[data-active="true"]')?.scrollIntoView({
            block: 'nearest',
          })
        })
        return
      }
      if (event.key === 'Enter' && activeItem) {
        event.preventDefault()
        pick(activeItem)
      }
    },
    [
      active,
      found,
      activeItem,
      pick,
    ],
  )

  let lastGroup: string | undefined

  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onCancel={event => {
        event.preventDefault()
        onOpenChange(false)
      }}
      onClose={() => onOpenChange(false)}
      className={cn(
        'sheet-in m-0 mx-auto mt-[12vh] w-[min(calc(100vw-2rem),34rem)] border border-night-edge bg-night p-0 text-ink-on-night',
        'overscroll-contain shadow-[0_32px_80px_rgb(0_0_0/0.7)] backdrop:bg-black/70 backdrop:backdrop-blur-[2px]',
      )}>
      <div className="flex items-center gap-3 border-b border-night-rule px-4">
        <Search
          size={15}
          className="shrink-0 text-ink-on-night-dim"
        />
        <input
          ref={input}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={activeItem ? `${base}-${activeItem.id}` : undefined}
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={event => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          className="min-h-12 w-full bg-transparent text-[16px] text-ink-on-night placeholder:text-ink-on-night-dim focus:outline-none sm:text-[15px]"
        />
        <Kbd className="hidden shrink-0 sm:inline-flex">esc</Kbd>
      </div>

      <div
        ref={list}
        id={listId}
        role="listbox"
        aria-label={label}
        className="max-h-[min(24rem,60vh)] overflow-y-auto py-1">
        {found.length === 0 ? (
          <p className="px-4 py-10 text-center text-[14px] text-ink-on-night-dim">{empty}</p>
        ) : (
          found.map((item, index) => {
            const header = item.group !== lastGroup ? item.group : undefined
            lastGroup = item.group
            const isActive = index === active
            return (
              <div key={item.id}>
                {header ? (
                  <p className="px-4 pt-3 pb-1 text-[11px] font-medium tracking-[0.14em] text-ink-on-night-dim uppercase">
                    {header}
                  </p>
                ) : null}
                <button
                  type="button"
                  id={`${base}-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={-1}
                  data-active={isActive}
                  onPointerMove={() => setActive(index)}
                  onClick={() => pick(item)}
                  className={cn(
                    'flex w-full cursor-pointer items-baseline gap-3 px-4 py-2.5 text-start text-[14px]',
                    // the highlight moves on every arrow key, so it stays inside
                    // the fast step: long enough to follow, short enough that
                    // holding the key down does not lag behind the selection
                    'transition-colors duration-(--motion-fast) ease-rl motion-reduce:transition-none',
                    isActive ? 'bg-night-wash text-ink-on-night' : 'text-ink-on-night-mid',
                  )}>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint ? <span className="shrink-0 text-[12px] text-ink-on-night-dim">{item.hint}</span> : null}
                </button>
              </div>
            )
          })
        )}
      </div>

      <div className="flex items-center gap-4 border-t border-night-rule px-4 py-2.5 text-[11px] text-ink-on-night-dim">
        <span className="flex items-center gap-1.5">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          to move
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd>↵</Kbd>
          to open
        </span>
      </div>
    </dialog>
  )
}
