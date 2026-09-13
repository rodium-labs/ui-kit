import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface FieldProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
  hintId?: string
  required?: boolean
  className?: string
  children: ReactNode
}

export function Field({ label, hint, error, htmlFor, hintId, required = false, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1 text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">
          {label}
          {required ? (
            <span
              aria-hidden="true"
              className="text-ink-green-on-night">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={hintId}
          className="text-[12px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="text-[12px] text-ink-on-night-dim">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

// the one skin every control wears, so an input, a select and a textarea line
// up on the same edge and light the same way. square, like the rest of the
// surface; the ring sits closer than the page's own because a form packs them.
export const CONTROL_SKIN = cn(
  'w-full border border-night-edge bg-transparent text-ink-on-night placeholder:text-ink-on-night-dim',
  'transition-colors duration-(--motion-fast)',
  'hover:border-night-edge-lit hover:bg-night-wash',
  'focus:border-brand-green focus:bg-transparent focus:outline-none',
  'focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-green)_22%,transparent)]',
  'disabled:pointer-events-none disabled:opacity-45',
  'aria-[invalid=true]:border-danger',
  'aria-[invalid=true]:focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-danger)_22%,transparent)]',
  'motion-reduce:transition-none',
)
