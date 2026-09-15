'use client'

import { type InputHTMLAttributes, type ReactNode, useId, useState } from 'react'
import { cn } from './cn.js'
import { CONTROL_SKIN, Field } from './Field.js'
import { focus } from './focus.js'

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  fieldClassName?: string
}

// a password with a way to read it back. the toggle is a real button with a
// name that changes with the state, so it is not a mystery eye: someone using a
// screen reader hears "show password" and then "hide password".
export function PasswordInput({ label, hint, error, className, fieldClassName, id, ...rest }: PasswordInputProps) {
  const auto = useId()
  const inputId = id ?? auto
  const hintId = `${inputId}-hint`
  const [shown, setShown] = useState(false)

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
        <input
          {...rest}
          id={inputId}
          type={shown ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? hintId : undefined}
          className={cn(CONTROL_SKIN, 'min-h-11 px-3 pe-12 text-[16px] sm:text-[14px]', className)}
        />
        <button
          type="button"
          onClick={() => setShown(was => !was)}
          aria-label={shown ? 'Hide password' : 'Show password'}
          aria-pressed={shown}
          className={cn(
            'press absolute end-0 flex size-11 cursor-pointer items-center justify-center text-ink-on-night-dim',
            'transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
            focus,
          )}>
          <svg
            width={15}
            height={15}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            aria-hidden="true"
            focusable="false">
            <path d="M1 8s2.6-4.5 7-4.5S15 8 15 8s-2.6 4.5-7 4.5S1 8 1 8Z" />
            <circle
              cx="8"
              cy="8"
              r="2"
            />
            {shown ? (
              <path
                d="M2.5 13.5 13.5 2.5"
                strokeWidth={1.6}
              />
            ) : null}
          </svg>
        </button>
      </div>
    </Field>
  )
}
