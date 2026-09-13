import { type ReactNode, type SelectHTMLAttributes, useId } from 'react'
import { cn } from './cn.js'
import { CONTROL_SKIN, Field } from './Field.js'

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  fieldClassName?: string
}

export function NativeSelect({
  label,
  hint,
  error,
  className,
  fieldClassName,
  id,
  children,
  ...rest
}: NativeSelectProps) {
  const auto = useId()
  const selectId = id ?? auto
  const hintId = `${selectId}-hint`

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={selectId}
      hintId={hintId}
      required={rest.required}
      className={fieldClassName}>
      <div className="relative flex items-center">
        <select
          {...rest}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          className={cn(CONTROL_SKIN, 'min-h-11 appearance-none pe-9 ps-3 text-[16px] sm:text-[14px]', className)}>
          {children}
        </select>
        <svg
          width={12}
          height={12}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="square"
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute end-3 text-ink-on-night-dim">
          <path d="M4 6.5 L8 10.5 L12 6.5" />
        </svg>
      </div>
    </Field>
  )
}
