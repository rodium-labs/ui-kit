import { type ChangeEvent, type InputHTMLAttributes, type ReactNode, useCallback, useId, useState } from 'react'
import { cn } from './cn.js'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
}

// role=switch has to carry its own aria-checked, so the on state is mirrored
// here. the native checked attribute still drives the paint and the keyboard.
export function Switch({ label, hint, className, id, checked, defaultChecked, onChange, ...rest }: SwitchProps) {
  const auto = useId()
  const switchId = id ?? auto
  const hintId = `${switchId}-hint`
  const [internal, setInternal] = useState(defaultChecked ?? false)
  const on = checked ?? internal

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setInternal(event.target.checked)
      onChange?.(event)
    },
    [
      checked,
      onChange,
    ],
  )

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={switchId}
        className="flex cursor-pointer items-start gap-3 has-[:disabled]:cursor-not-allowed">
        <span className="relative flex h-[18px] w-8 shrink-0 items-center">
          {/* the visible track is 18px tall; the target it carries is 24px */}
          <input
            {...rest}
            id={switchId}
            type="checkbox"
            role="switch"
            checked={checked}
            defaultChecked={checked === undefined ? defaultChecked : undefined}
            aria-checked={on}
            aria-describedby={hint ? hintId : undefined}
            onChange={handleChange}
            className="peer absolute -inset-y-[3px] inset-x-0 z-1 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <span
            aria-hidden="true"
            className={cn(
              'h-[18px] w-8 border border-night-edge',
              'transition-colors duration-(--motion-fast)',
              'peer-[:hover:not(:checked)]:border-night-edge-lit',
              'peer-checked:border-brand-green peer-checked:bg-brand-green',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-brand-green)',
              'peer-disabled:opacity-45',
              'motion-reduce:transition-none',
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute start-[3px] size-3 bg-ink-on-night-dim',
              'transition-[translate,background-color] duration-(--motion-base) ease-rl',
              'peer-checked:translate-x-[14px] peer-checked:bg-night',
              'peer-disabled:opacity-45',
              'motion-reduce:transition-none',
            )}
          />
        </span>
        {label ? <span className="text-[14px] leading-[1.4] text-ink-on-night">{label}</span> : null}
      </label>
      {hint ? (
        <span
          id={hintId}
          className="ps-11 text-[12px] leading-[1.5] text-ink-on-night-dim">
          {hint}
        </span>
      ) : null}
    </div>
  )
}
