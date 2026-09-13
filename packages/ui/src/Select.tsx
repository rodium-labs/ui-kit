'use client'

import { type KeyboardEvent, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from './cn.js'
import { Field } from './Field.js'
import { Check, ChevronDown } from './glyphs.js'

export interface SelectOption {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export interface SelectProps {
  options: readonly SelectOption[]
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  id?: string
  className?: string
  fieldClassName?: string
}

const TYPEAHEAD_MS = 500

function indexByPrefix(list: readonly SelectOption[], prefix: string): number {
  const needle = prefix.toLowerCase()
  return list.findIndex(option => option.label.toLowerCase().startsWith(needle))
}

// the select-only combobox from the ARIA practices: focus stays on the button
// and aria-activedescendant names the active row, which keeps one tab stop and
// leaves the browser's own focus handling alone.
export function Select({
  options,
  label,
  hint,
  error,
  placeholder = 'Select…',
  value,
  defaultValue,
  onValueChange,
  name,
  required,
  disabled,
  id,
  className,
  fieldClassName,
}: SelectProps) {
  const auto = useId()
  const selectId = id ?? auto
  const hintId = `${selectId}-hint`
  const listId = `${selectId}-list`

  const usable = useMemo(
    () => options.filter(option => !option.disabled),
    [
      options,
    ],
  )

  const [internal, setInternal] = useState(defaultValue ?? '')
  const chosen = value ?? internal
  const selected = options.find(option => option.value === chosen)

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      usable.findIndex(option => option.value === chosen),
    ),
  )

  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const typed = useRef({
    text: '',
    at: 0,
  })

  const activeOption = usable.at(active)

  const commit = useCallback(
    (option: SelectOption) => {
      if (value === undefined) setInternal(option.value)
      onValueChange?.(option.value)
      setOpen(false)
      trigger.current?.focus()
    },
    [
      value,
      onValueChange,
    ],
  )

  // the active row has to stay in the scrolled box as the keys move it
  useEffect(() => {
    if (!open) return
    list.current?.querySelector('[data-active="true"]')?.scrollIntoView({
      block: 'nearest',
    })
  }, [
    open,
  ])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && root.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [
    open,
  ])

  const move = useCallback(
    (to: number) => {
      if (usable.length === 0) return
      const next = (to + usable.length) % usable.length
      setActive(next)
      requestAnimationFrame(() => {
        list.current?.querySelector('[data-active="true"]')?.scrollIntoView({
          block: 'nearest',
        })
      })
    },
    [
      usable.length,
    ],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const { key } = event

      if (key === 'Escape') {
        if (open) {
          event.preventDefault()
          setOpen(false)
        }
        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End') {
        event.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        if (key === 'Home') move(0)
        else if (key === 'End') move(usable.length - 1)
        else move(active + (key === 'ArrowDown' ? 1 : -1))
        return
      }

      if (key === 'Enter' || key === ' ') {
        event.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        if (activeOption) commit(activeOption)
        return
      }

      // typeahead: letters jump to the first option that starts with them
      if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const now = Date.now()
        const text = now - typed.current.at > TYPEAHEAD_MS ? key : typed.current.text + key
        typed.current = {
          text,
          at: now,
        }
        const found = indexByPrefix(usable, text)
        if (found >= 0) {
          if (!open) setOpen(true)
          move(found)
        }
      }
    },
    [
      open,
      active,
      activeOption,
      usable,
      move,
      commit,
    ],
  )

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={selectId}
      hintId={hintId}
      required={required}
      className={fieldClassName}>
      <div
        ref={root}
        className="relative">
        {name ? (
          <input
            type="hidden"
            name={name}
            value={chosen}
          />
        ) : null}

        <button
          ref={trigger}
          type="button"
          id={selectId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-activedescendant={open && activeOption ? `${selectId}-o-${activeOption.value}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          aria-required={required}
          disabled={disabled}
          onClick={() => setOpen(was => !was)}
          onKeyDown={onKeyDown}
          className={cn(
            'flex min-h-11 w-full items-center gap-2 border border-night-edge bg-transparent px-3 text-start text-[16px] sm:text-[14px]',
            'transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash',
            'focus:border-brand-green focus:outline-none',
            'focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-green)_22%,transparent)]',
            'aria-expanded:border-night-edge-lit',
            'aria-[invalid=true]:border-danger',
            'disabled:pointer-events-none disabled:opacity-45',
            'motion-reduce:transition-none',
            selected ? 'text-ink-on-night' : 'text-ink-on-night-dim',
            className,
          )}>
          <span className="min-w-0 flex-1 truncate">{selected?.label ?? placeholder}</span>
          <ChevronDown
            size={12}
            className={cn(
              'shrink-0 text-ink-on-night-dim transition-transform duration-(--motion-base) ease-rl motion-reduce:transition-none',
              open && '-rotate-180',
            )}
          />
        </button>

        {open ? (
          <div
            ref={list}
            id={listId}
            role="listbox"
            aria-labelledby={selectId}
            className="sheet-pop absolute inset-x-0 top-[calc(100%+6px)] z-40 max-h-60 overflow-y-auto border border-night-edge bg-night py-1 shadow-[0_18px_44px_rgb(0_0_0/0.7)]">
            {options.map(option => {
              const at = usable.indexOf(option)
              const isActive = at >= 0 && at === active
              return (
                <button
                  key={option.value}
                  type="button"
                  id={`${selectId}-o-${option.value}`}
                  role="option"
                  aria-selected={option.value === chosen}
                  data-active={isActive}
                  tabIndex={-1}
                  disabled={option.disabled}
                  onPointerEnter={() => {
                    if (at >= 0) setActive(at)
                  }}
                  onClick={() => {
                    if (!option.disabled) commit(option)
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-start gap-2.5 px-3 py-2 text-start text-[14px]',
                    option.disabled && 'pointer-events-none text-ink-on-night-faint',
                    !option.disabled && isActive && 'bg-night-wash text-ink-on-night',
                    !option.disabled && !isActive && 'text-ink-on-night-mid',
                  )}>
                  <span className="flex w-3.5 shrink-0 justify-center pt-0.5">
                    {option.value === chosen ? (
                      <Check
                        size={11}
                        className="text-brand-green"
                      />
                    ) : null}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate">{option.label}</span>
                    {option.hint ? <span className="text-[12px] text-ink-on-night-dim">{option.hint}</span> : null}
                  </span>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </Field>
  )
}
