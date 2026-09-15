'use client'

import { type KeyboardEvent, type ReactNode, useId, useState } from 'react'
import { cn } from './cn.js'
import { Field } from './Field.js'
import { focus } from './focus.js'
import { Close } from './glyphs.js'

export interface TagInputProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  values: readonly string[]
  /** the caller owns the list it is handed, so it arrives mutable */
  onValuesChange: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

// several values in one field. enter and comma commit; backspace on an empty
// field takes the last one back, which is the behaviour anyone who has used one
// of these already expects. each chip carries its own named remove button, so
// the mouse and the keyboard both have a way out.
export function TagInput({
  label,
  hint,
  error,
  values,
  onValuesChange,
  placeholder,
  disabled = false,
  className,
}: TagInputProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const [draft, setDraft] = useState('')

  const commit = (raw: string) => {
    const value = raw.trim().replace(/,$/, '')
    if (!value || values.includes(value)) return
    onValuesChange([
      ...values,
      value,
    ])
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commit(draft)
      setDraft('')
      return
    }
    if (event.key === 'Backspace' && draft === '' && values.length > 0) {
      onValuesChange(values.slice(0, -1))
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
        className={cn(
          'flex min-h-11 w-full flex-wrap items-center gap-1.5 border border-night-edge px-2 py-1.5',
          'transition-[border-color,box-shadow] duration-(--motion-fast) ease-rl motion-reduce:transition-none',
          'has-[input:focus]:border-brand-green',
          'has-[input:focus]:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-green)_22%,transparent)]',
          disabled && 'pointer-events-none opacity-45',
        )}>
        {values.map(value => (
          <span
            key={value}
            className="flex items-center gap-1 border border-night-frame ps-2 text-[12px] text-ink-on-night">
            {value}
            <button
              type="button"
              onClick={() => onValuesChange(values.filter(v => v !== value))}
              aria-label={`Remove ${value}`}
              className={cn(
                'flex size-6 cursor-pointer items-center justify-center text-ink-on-night-dim',
                'transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
                focus,
              )}>
              <Close size={9} />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          disabled={disabled}
          placeholder={values.length === 0 ? placeholder : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          aria-invalid={error ? true : undefined}
          onChange={event => setDraft(event.currentTarget.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            commit(draft)
            setDraft('')
          }}
          className="min-w-24 flex-1 bg-transparent px-1 text-[16px] text-ink-on-night placeholder:text-ink-on-night-dim focus:outline-none sm:text-[14px]"
        />
      </div>
    </Field>
  )
}
