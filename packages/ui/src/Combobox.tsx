'use client'

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { cn } from './cn.js'
import { CONTROL_SKIN, Field } from './Field.js'
import { Check, ChevronDown } from './glyphs.js'

export interface ComboboxOption {
  value: string
  label: string
  hint?: string
}

export interface ComboboxProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  options: readonly ComboboxOption[]
  value: string | null
  onValueChange: (value: string) => void
  placeholder?: string
  /** what the list says when nothing matches */
  empty?: string
  disabled?: boolean
  className?: string
}

// Select with a filter. the difference is the text field: a select-only combobox
// is a button, this one is an input you type into, which is the right form once
// the list is longer than a screen. the aria pattern is the editable combobox,
// so the list is owned by the field and the active option is named rather than
// focused - focus never leaves the input.
export function Combobox({
  label,
  hint,
  error,
  options,
  value,
  onValueChange,
  placeholder = 'Type to filter',
  empty = 'Nothing matches',
  disabled = false,
  className,
}: ComboboxProps) {
  const id = useId()
  const listId = `${id}-list`
  const hintId = `${id}-hint`
  const wrap = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const chosen = options.find(o => o.value === value) ?? null
  const found = query.trim() ? options.filter(o => o.label.toLowerCase().includes(query.trim().toLowerCase())) : options
  const activeOption = found.at(active)

  // closing on focus leaving the whole widget needs the container, and a jsx
  // handler on a plain div is a handler on something that is not a control.
  // the listener goes on the node itself, where focusout actually belongs.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const leave = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node | null)) setOpen(false)
    }
    el.addEventListener('focusout', leave)
    return () => el.removeEventListener('focusout', leave)
  }, [])

  const commit = (option: ComboboxOption) => {
    onValueChange(option.value)
    setQuery('')
    setOpen(false)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive(at => (at + step + found.length) % Math.max(1, found.length))
      return
    }
    if (event.key === 'Enter' && open && activeOption) {
      event.preventDefault()
      commit(activeOption)
    }
  }

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={id}
      hintId={hintId}
      className={className}>
      <div
        ref={wrap}
        className="relative">
        <div className="relative flex items-center">
          <input
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && activeOption ? `${id}-o-${activeOption.value}` : undefined}
            aria-describedby={hint || error ? hintId : undefined}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            value={open ? query : (chosen?.label ?? '')}
            placeholder={chosen ? chosen.label : placeholder}
            onChange={event => {
              setQuery(event.currentTarget.value)
              setActive(0)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={cn(CONTROL_SKIN, 'min-h-11 px-3 pe-9 text-[16px] sm:text-[14px]')}
          />
          <ChevronDown
            size={12}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute end-3 text-ink-on-night-dim',
              'transition-transform duration-(--motion-base) ease-through motion-reduce:transition-none',
              open && '-rotate-180',
            )}
          />
        </div>
        <div
          id={listId}
          role="listbox"
          aria-label={typeof label === 'string' ? label : 'Options'}
          data-open={open || undefined}
          className={cn(
            'sheet-pop absolute inset-x-0 top-[calc(100%+6px)] z-40 max-h-60 overflow-y-auto',
            'border border-night-edge bg-night py-1 shadow-[0_18px_44px_rgb(0_0_0/0.7)]',
          )}>
          {found.length === 0 ? (
            <p className="px-3 py-3 text-[13px] text-ink-on-night-dim">{empty}</p>
          ) : (
            found.map((option, i) => (
              <button
                key={option.value}
                type="button"
                id={`${id}-o-${option.value}`}
                role="option"
                aria-selected={option.value === value}
                tabIndex={-1}
                onPointerMove={() => setActive(i)}
                onClick={() => commit(option)}
                className={cn(
                  'flex w-full cursor-pointer items-start gap-2.5 px-3 py-2 text-start text-[14px]',
                  'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
                  i === active ? 'bg-night-wash text-ink-on-night' : 'text-ink-on-night-mid',
                )}>
                <span className="flex w-3.5 shrink-0 justify-center pt-0.5">
                  {option.value === value ? (
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
            ))
          )}
        </div>
      </div>
    </Field>
  )
}
