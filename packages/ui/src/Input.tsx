import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn'
import { CONTROL_SKIN, Field } from './Field'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  icon?: ReactNode
  fieldClassName?: string
}

export function Input({ label, hint, error, icon, className, fieldClassName, id, ...rest }: InputProps) {
  const auto = useId()
  const inputId = id ?? auto
  const hintId = `${inputId}-hint`

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={inputId}
      hintId={hintId}
      required={rest.required}
      className={fieldClassName}>
      <div className="relative flex items-center">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-3 flex text-ink-on-night-dim">
            {icon}
          </span>
        ) : null}
        <input
          {...rest}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          className={cn(CONTROL_SKIN, 'min-h-11 px-3 text-[16px] sm:text-[14px]', icon && 'ps-9', className)}
        />
      </div>
    </Field>
  )
}
