'use client'

import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface ToggleOption {
  value: string
  label: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

export interface ToggleGroupProps {
  label: string
  options: readonly ToggleOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

// one choice out of a few, shown all at once. radios in a row would carry the
// same meaning, but a segmented control is read as a control rather than as a
// form field, so it is built from radios and only looks like a bar: the arrow
// keys, the single tab stop and the announced position all come for free.
export function ToggleGroup({ label, options, value, onValueChange, className }: ToggleGroupProps) {
  return (
    <fieldset className={cn('flex min-w-0 border border-night-edge', className)}>
      <legend className="sr-only">{label}</legend>
      {options.map(option => {
        const active = option.value === value
        return (
          <label
            key={option.value}
            className={cn(
              'relative flex min-h-10 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 px-3 text-[13px] font-medium whitespace-nowrap',
              'border-s border-night-edge first:border-s-0',
              'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
              // the kit's ring sits 4px outside its control, which here would
              // be drawn over the neighbouring segment. this one is inset.
              'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-(--color-brand-green)',
              option.disabled
                ? 'pointer-events-none text-ink-on-night-mid opacity-45'
                : active
                  ? 'bg-brand-green-wash text-ink-green-on-night'
                  : 'text-ink-on-night-mid hover:bg-night-wash hover:text-ink-on-night',
            )}>
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={active}
              disabled={option.disabled}
              onChange={() => onValueChange(option.value)}
              className="absolute size-0 opacity-0"
            />
            {option.icon ? (
              <span
                aria-hidden="true"
                className="flex shrink-0">
                {option.icon}
              </span>
            ) : null}
            <span className="truncate">{option.label}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
