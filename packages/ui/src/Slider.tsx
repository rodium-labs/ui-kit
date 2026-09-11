import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn'
import { Field } from './Field'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
  showValue?: boolean
  fieldClassName?: string
}

// the native range input: it already has the keyboard, the value and the
// announcement. only the track and the thumb are drawn here.
const TRACK =
  'h-6 w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-night-edge [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-night-edge'

const THUMB =
  '[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-[15px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-ink-on-night [&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink-on-night'

export function Slider({
  label,
  hint,
  showValue = false,
  className,
  fieldClassName,
  id,
  value,
  defaultValue,
  ...rest
}: SliderProps) {
  const auto = useId()
  const sliderId = id ?? auto
  const hintId = `${sliderId}-hint`
  const shown = value ?? defaultValue

  return (
    <Field
      label={
        showValue && shown !== undefined ? (
          <span className="flex w-full items-baseline justify-between gap-4">
            {label}
            <span className="text-ink-on-night tabular-nums">{String(shown)}</span>
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
        value={value}
        defaultValue={defaultValue}
        aria-describedby={hint ? hintId : undefined}
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
