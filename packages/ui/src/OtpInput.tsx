'use client'

import { type ClipboardEvent, type KeyboardEvent, useId, useRef } from 'react'
import { cn } from './cn.js'

export interface OtpInputProps {
  /** how many characters the code has */
  length?: number
  value: string
  onValueChange: (value: string) => void
  label: string
  hint?: string
  disabled?: boolean
  className?: string
}

const DIGIT = /^\d$/

// one box per character, but one value: the boxes are a picture of the code,
// not five separate fields. autocomplete carries the whole thing, so the sms
// the phone just received fills every box from the first one. paste is handled
// by hand because a paste into box three should still fill from the start.
export function OtpInput({
  length = 6,
  value,
  onValueChange,
  label,
  hint,
  disabled = false,
  className,
}: OtpInputProps) {
  const id = useId()
  const boxes = useRef<(HTMLInputElement | null)[]>([])
  const chars = value.slice(0, length).split('')

  const focusBox = (index: number) => {
    const next = boxes.current.at(Math.max(0, Math.min(index, length - 1)))
    next?.focus()
    next?.select()
  }

  const write = (index: number, char: string) => {
    const next = value.padEnd(length, ' ').split('')
    next[index] = char
    onValueChange(next.join('').replace(/ +$/, ''))
  }

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (chars.at(index)) write(index, ' ')
      else {
        write(Math.max(0, index - 1), ' ')
        focusBox(index - 1)
      }
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusBox(index - 1)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusBox(index + 1)
      return
    }
    if (DIGIT.test(event.key)) {
      event.preventDefault()
      write(index, event.key)
      focusBox(index + 1)
    }
  }

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onValueChange(pasted)
    focusBox(pasted.length)
  }

  return (
    <fieldset
      aria-describedby={hint ? `${id}-hint` : undefined}
      className={cn('flex min-w-0 flex-col gap-2', className)}>
      <legend className="mb-2 text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {Array.from({
          length,
        }).map((_, index) => {
          const char = chars.at(index)?.trim() ?? ''
          const key = `${id}-${index}`
          return (
            <input
              key={key}
              ref={element => {
                boxes.current[index] = element
              }}
              // the whole code is one autocomplete token, announced on the first
              // box; the rest are filled from it by the browser
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              inputMode="numeric"
              // a pattern rather than type=number: the spinner and the scroll
              // wheel have no business on a code field
              pattern="\d*"
              maxLength={1}
              disabled={disabled}
              value={char}
              aria-label={`Digit ${index + 1} of ${length}`}
              onChange={() => {}}
              onKeyDown={onKeyDown(index)}
              onPaste={onPaste}
              onFocus={event => event.currentTarget.select()}
              className={cn(
                'size-11 border border-night-edge bg-transparent text-center text-[17px] font-medium tabular-nums text-ink-on-night',
                'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast) ease-rl motion-reduce:transition-none',
                'hover:border-night-edge-lit hover:bg-night-wash',
                'focus:border-brand-green focus:bg-transparent focus:outline-none',
                'focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-green)_22%,transparent)]',
                'disabled:pointer-events-none disabled:opacity-45',
              )}
            />
          )
        })}
      </div>
      {hint ? (
        <p
          id={`${id}-hint`}
          className="text-[12px] text-ink-on-night-dim">
          {hint}
        </p>
      ) : null}
    </fieldset>
  )
}
