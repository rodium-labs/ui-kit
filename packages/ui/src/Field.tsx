import type { ReactNode } from 'react'
import { cn } from './cn'

export interface FieldProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
  hintId?: string
  errorId?: string
  required?: boolean
  className?: string
  children: ReactNode
}

export function Field({
  label,
  hint,
  error,
  htmlFor,
  hintId,
  errorId,
  required = false,
  className,
  children,
}: FieldProps) {
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
              className="text-brand-green">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          className="text-[12px] text-danger-lit">
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

// the one skin every control in the kit wears, so an input, a select and a
// textarea line up on the same edge and light the same way on focus.
export const CONTROL_SKIN =
  'w-full rounded-[10px] border border-night-edge bg-night-wash text-ink-on-night placeholder:text-ink-on-night-dim ' +
  'transition-[border-color,box-shadow,background-color] duration-(--motion-fast) ease-rl ' +
  'hover:border-night-edge-lit ' +
  'focus:border-brand-green focus:bg-transparent focus:outline-none ' +
  'focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-green)_22%,transparent)] ' +
  'disabled:pointer-events-none disabled:opacity-45 ' +
  'aria-[invalid=true]:border-danger aria-[invalid=true]:focus:border-danger ' +
  'aria-[invalid=true]:focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-danger)_22%,transparent)] ' +
  'motion-reduce:transition-none'
