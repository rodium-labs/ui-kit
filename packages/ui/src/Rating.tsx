'use client'

import { useId } from 'react'
import { cn } from './cn.js'

export interface RatingProps {
  value: number
  /** leave it out and the rating is a reading, not a control */
  onValueChange?: (value: number) => void
  max?: number
  label: string
  className?: string
}

// a score out of a few. when it takes a change handler it is a radio group, so
// the arrow keys work and the position is announced; when it does not, it is an
// image with the score written into its name. either way the number is never
// left to be counted off the shapes.
export function Rating({ value, onValueChange, max = 5, label, className }: RatingProps) {
  const name = useId()
  const marks = Array.from(
    {
      length: max,
    },
    (_, i) => i + 1,
  )

  const star = (filled: boolean) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={filled ? 'text-brand-green' : 'text-night-edge'}>
      <path
        d="M8 1.5 9.9 5.9 14.5 6.3 11 9.4 12.1 14 8 11.6 3.9 14 5 9.4 1.5 6.3 6.1 5.9Z"
        fill="currentColor"
      />
    </svg>
  )

  if (!onValueChange) {
    return (
      <span
        role="img"
        aria-label={`${label}: ${value} out of ${max}`}
        className={cn('inline-flex items-center gap-1', className)}>
        {marks.map(m => (
          <span key={m}>{star(m <= value)}</span>
        ))}
      </span>
    )
  }

  return (
    <fieldset className={cn('flex min-w-0 items-center gap-1', className)}>
      <legend className="sr-only">{label}</legend>
      {marks.map(m => (
        <label
          key={m}
          className={cn(
            'flex size-11 cursor-pointer items-center justify-center',
            'transition-transform duration-(--motion-fast) ease-through hover:scale-110 motion-reduce:transition-none',
            'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-4px] has-[:focus-visible]:outline-(--color-brand-green)',
          )}>
          <input
            type="radio"
            name={name}
            value={m}
            checked={m === value}
            onChange={() => onValueChange(m)}
            className="absolute size-0 opacity-0"
          />
          <span className="sr-only">
            {m} out of {max}
          </span>
          {star(m <= value)}
        </label>
      ))}
    </fieldset>
  )
}
