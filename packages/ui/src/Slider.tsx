'use client'

import { type ChangeEvent, type CSSProperties, type InputHTMLAttributes, type ReactNode, useId, useState } from 'react'
import { cn } from './cn.js'
import { Field } from './Field.js'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  hint?: ReactNode
  showValue?: boolean
  fieldClassName?: string
}

// the track is painted as a gradient stop rather than a second element, so the
// filled part and the rest are one paint that follows the value exactly.
const TRACK =
  'h-6 w-full appearance-none bg-transparent ' +
  '[&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-brand-green)_var(--fill),var(--color-night-edge)_var(--fill))] ' +
  '[&::-moz-range-track]:h-px [&::-moz-range-track]:bg-night-edge ' +
  '[&::-moz-range-progress]:h-px [&::-moz-range-progress]:bg-brand-green'

const THUMB =
  '[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-[15px] [&::-webkit-slider-thumb]:appearance-none ' +
  '[&::-webkit-slider-thumb]:bg-ink-on-night [&::-webkit-slider-thumb]:transition-[background-color,scale] ' +
  '[&::-webkit-slider-thumb]:duration-(--motion-fast) [&::-webkit-slider-thumb]:ease-rl ' +
  'hover:[&::-webkit-slider-thumb]:bg-ink-green-on-night active:[&::-webkit-slider-thumb]:scale-125 ' +
  'active:[&::-webkit-slider-thumb]:bg-brand-green ' +
  '[&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink-on-night ' +
  '[&::-moz-range-thumb]:transition-colors [&::-moz-range-thumb]:duration-(--motion-fast) ' +
  'hover:[&::-moz-range-thumb]:bg-ink-green-on-night active:[&::-moz-range-thumb]:bg-brand-green ' +
  'motion-reduce:[&::-webkit-slider-thumb]:transition-none motion-reduce:[&::-moz-range-thumb]:transition-none'

function ratio(value: number, min: number, max: number): string {
  if (max === min) return '0%'
  return `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`
}

export function Slider({
  label,
  hint,
  showValue = false,
  className,
  fieldClassName,
  id,
  value,
  defaultValue,
  min = 0,
  max = 100,
  onChange,
  ...rest
}: SliderProps) {
  const auto = useId()
  const sliderId = id ?? auto
  const hintId = `${sliderId}-hint`

  const lower = Number(min)
  const upper = Number(max)
  const [internal, setInternal] = useState(Number(defaultValue ?? lower))
  const current = value === undefined ? internal : Number(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternal(Number(event.target.value))
    onChange?.(event)
  }

  return (
    <Field
      label={
        showValue ? (
          <span className="flex w-full items-baseline justify-between gap-4">
            {label}
            <span className="text-ink-on-night tabular-nums">{current}</span>
          </span>
        ) : (
          label
        )
      }
      hint={hint}
      htmlFor={sliderId}
      hintId={hintId}
      className={fieldClassName}>
      <input
        {...rest}
        id={sliderId}
        type="range"
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-describedby={hint ? hintId : undefined}
        style={
          {
            '--fill': ratio(current, lower, upper),
          } as CSSProperties
        }
        className={cn(
          'cursor-pointer',
          TRACK,
          THUMB,
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-brand-green)',
          'disabled:pointer-events-none disabled:opacity-45',
          className,
        )}
      />
    </Field>
  )
}
