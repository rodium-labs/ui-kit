import { type ReactNode, type SelectHTMLAttributes, useId } from 'react'
import { cn } from './cn'
import { CONTROL_SKIN, Field } from './Field'
import { ChevronDown } from './glyphs'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  fieldClassName?: string
}

export function Select({ label, hint, error, className, fieldClassName, id, children, ...rest }: SelectProps) {
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
      errorId={hintId}
      required={rest.required}
      className={fieldClassName}>
      <div className="relative flex items-center">
        <select
          {...rest}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          className={cn(CONTROL_SKIN, 'h-11 appearance-none pr-9 pl-3 text-[14px]', className)}>
          {children}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 text-ink-on-night-dim"
        />
      </div>
    </Field>
  )
}
