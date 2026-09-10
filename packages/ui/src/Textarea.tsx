import { type ReactNode, type TextareaHTMLAttributes, useId } from 'react'
import { cn } from './cn'
import { CONTROL_SKIN, Field } from './Field'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  fieldClassName?: string
}

export function Textarea({ label, hint, error, className, fieldClassName, id, rows = 4, ...rest }: TextareaProps) {
  const auto = useId()
  const areaId = id ?? auto
  const hintId = `${areaId}-hint`

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={areaId}
      hintId={hintId}
      required={rest.required}
      className={fieldClassName}>
      <textarea
        {...rest}
        id={areaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? hintId : undefined}
        className={cn(CONTROL_SKIN, 'resize-y px-3 py-2.5 text-[14px] leading-[1.65]', className)}
      />
    </Field>
  )
}
