import { type ChangeEvent, type InputHTMLAttributes, type ReactNode, useCallback, useId, useState } from 'react'
import { cn } from './cn'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
}

// role=switch has to carry its own aria-checked, so the on state is mirrored
// here. the native checked attribute still drives the paint and the keyboard.
export function Switch({ label, hint, className, id, checked, defaultChecked, onChange, ...rest }: SwitchProps) {
  const auto = useId()
  const switchId = id ?? auto
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
    <div className={cn('flex items-start gap-3', className)}>
      <span className="relative flex h-6 w-10 shrink-0 items-center">
        <input
          {...rest}
          id={switchId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          aria-checked={on}
          onChange={handleChange}
          className="peer absolute inset-0 z-1 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
        <span
          aria-hidden="true"
          className={cn(
            'h-6 w-10 rounded-[999px] border border-night-edge bg-night-wash',
            'transition-[background-color,border-color] duration-(--motion-base) ease-rl',
            'peer-hover:border-night-edge-lit',
            'peer-checked:border-brand-green peer-checked:bg-brand-green',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-brand-green)',
            'peer-disabled:opacity-45',
            'motion-reduce:transition-none',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-1 size-4 rounded-full bg-ink-on-night',
            'transition-[translate,background-color] duration-(--motion-base) ease-rl',
            'peer-checked:translate-x-4 peer-checked:bg-on-accent',
            'motion-reduce:transition-none',
          )}
        />
      </span>
      {label ? (
        <span className="flex flex-col gap-0.5">
          <label
            htmlFor={switchId}
            className="cursor-pointer text-[14px] leading-6 text-ink-on-night">
            {label}
          </label>
          {hint ? <span className="text-[12px] text-ink-on-night-dim">{hint}</span> : null}
        </span>
      ) : null}
    </div>
  )
}
