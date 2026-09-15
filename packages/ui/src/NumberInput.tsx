'use client'

import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn.js'
import { CONTROL_SKIN, Field } from './Field.js'
import { focus } from './focus.js'
import { Odometer } from './Odometer.js'

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** what the number counts, shown after the field */
  unit?: string
  fieldClassName?: string
}

// a number with two buttons, on top of the native number input rather than
// instead of it: the arrow keys, the spin behaviour and the mobile keypad all
// come from the platform. the buttons exist because a spinner drawn by the
// browser is a four-pixel target nobody can hit.
export function NumberInput({
  label,
  hint,
  error,
  value,
  onValueChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  unit,
  className,
  fieldClassName,
  id,
  disabled,
  ...rest
}: NumberInputProps) {
  const auto = useId()
  const inputId = id ?? auto
  const hintId = `${inputId}-hint`
  const clamp = (n: number) => Math.min(max, Math.max(min, n))

  const nudge = (by: number) => onValueChange(clamp(Math.round((value + by) * 1e6) / 1e6))

  const button = cn(
    'press flex w-10 shrink-0 cursor-pointer items-center justify-center text-[16px] leading-none text-ink-on-night-dim',
    'transition-colors duration-(--motion-fast) hover:bg-night-wash hover:text-ink-on-night motion-reduce:transition-none',
    'disabled:pointer-events-none disabled:opacity-45',
    focus,
  )

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={inputId}
      hintId={hintId}
      required={rest.required}
      className={fieldClassName}>
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={() => nudge(-step)}
          disabled={disabled || value <= min}
          aria-label="Decrease"
          className={cn(button, 'border border-e-0 border-night-edge')}>
          −
        </button>
        {/* the value rolls to its new reading rather than swapping to it, the
            same way the stat does. text inside a native input cannot be
            animated, so the odometer sits over it and the input's own text is
            transparent - until it takes focus, when the real text and the
            caret come back and the roll gets out of the way. */}
        <span className="relative flex min-w-0 flex-1">
          <input
            {...rest}
            id={inputId}
            type="number"
            inputMode="decimal"
            value={value}
            min={min === Number.NEGATIVE_INFINITY ? undefined : min}
            max={max === Number.POSITIVE_INFINITY ? undefined : max}
            step={step}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={hint || error ? hintId : undefined}
            onChange={event => {
              const next = Number(event.currentTarget.value)
              if (!Number.isNaN(next)) onValueChange(clamp(next))
            }}
            className={cn(
              CONTROL_SKIN,
              // larger than the other controls on purpose: this field holds one short
              // value read at a glance, not a line of text
              'peer min-h-11 w-full px-3 text-center text-[17px] tabular-nums',
              'text-transparent focus:text-ink-on-night',
              // the browser's own spinner is a target nobody can hit; the two
              // buttons beside it are the ones that are meant to be used
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              className,
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 flex items-center justify-center',
              'text-[17px] text-ink-on-night tabular-nums',
              'transition-opacity duration-(--motion-fast) peer-focus:opacity-0 motion-reduce:transition-none',
              disabled && 'opacity-45',
            )}>
            {/* the input is a spinbutton and announces the value itself */}
            <Odometer
              value={String(value)}
              silent
            />
          </span>
        </span>
        <button
          type="button"
          onClick={() => nudge(step)}
          disabled={disabled || value >= max}
          aria-label="Increase"
          className={cn(button, 'border border-s-0 border-night-edge')}>
          +
        </button>
        {unit ? (
          <span className="flex shrink-0 items-center ps-3 text-[13px] text-ink-on-night-dim">{unit}</span>
        ) : null}
      </div>
    </Field>
  )
}
