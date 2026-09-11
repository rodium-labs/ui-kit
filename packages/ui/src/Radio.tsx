import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
}

// the one round thing on a square surface. the shape is what tells a reader
// this is a choice of one, and a square radio reads as a checkbox that has
// forgotten how to be unticked.
export function Radio({ label, hint, className, id, ...rest }: RadioProps) {
  const auto = useId()
  const radioId = id ?? auto
  const hintId = `${radioId}-hint`

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={radioId}
        className="flex cursor-pointer items-start gap-3 has-[:disabled]:cursor-not-allowed">
        <span className="relative flex size-[18px] shrink-0 items-center justify-center">
          {/* the visible dial is 18px; the target it carries is 24px */}
          <input
            {...rest}
            id={radioId}
            type="radio"
            aria-describedby={hint ? hintId : undefined}
            className="peer absolute -inset-[3px] z-1 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <span
            aria-hidden="true"
            className={cn(
              'flex size-[18px] items-center justify-center rounded-full border border-night-edge',
              'transition-colors duration-(--motion-fast)',
              'peer-hover:border-night-edge-lit peer-hover:bg-night-wash',
              'peer-checked:border-brand-green',
              'peer-checked:[&>span]:scale-100 peer-checked:[&>span]:opacity-100',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-brand-green)',
              'peer-disabled:opacity-45',
              'motion-reduce:transition-none',
            )}>
            <span className="size-2 scale-25 rounded-full bg-brand-green opacity-0 transition-[scale,opacity] duration-(--motion-fast) ease-rl motion-reduce:transition-none" />
          </span>
        </span>
        {label ? <span className="text-[14px] leading-[1.4] text-ink-on-night">{label}</span> : null}
      </label>
      {hint ? (
        <span
          id={hintId}
          className="ps-[30px] text-[12px] leading-[1.5] text-ink-on-night-dim">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export interface RadioOption {
  value: string
  label: ReactNode
  hint?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  legend: ReactNode
  options: readonly RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

// a fieldset, because the legend is what names the choice for a screen reader
export function RadioGroup({ name, legend, options, value, defaultValue, onValueChange, className }: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col gap-3 border-0 p-0', className)}>
      <legend className="mb-1 text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">
        {legend}
      </legend>
      {options.map(option => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          hint={option.hint}
          disabled={option.disabled}
          {...(value === undefined
            ? {
                defaultChecked: defaultValue === option.value,
              }
            : {
                checked: value === option.value,
              })}
          onChange={event => {
            if (event.target.checked) onValueChange?.(option.value)
          }}
        />
      ))}
    </fieldset>
  )
}
