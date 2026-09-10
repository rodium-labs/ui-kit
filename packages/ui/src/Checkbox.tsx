import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
}

// the native box does the state and the keyboard; it is made invisible rather
// than removed, so the mark below is only ever a picture of it.
export function Checkbox({ label, hint, className, id, ...rest }: CheckboxProps) {
  const auto = useId()
  const boxId = id ?? auto

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <span className="relative flex size-[18px] shrink-0 items-center justify-center">
        <input
          {...rest}
          id={boxId}
          type="checkbox"
          className="peer absolute inset-0 z-1 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
        <span
          aria-hidden="true"
          className={cn(
            'flex size-[18px] items-center justify-center border border-night-edge text-night',
            'transition-colors duration-(--motion-fast)',
            'peer-hover:border-night-edge-lit peer-hover:bg-night-wash',
            'peer-checked:border-brand-green peer-checked:bg-brand-green',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-brand-green)',
            'peer-disabled:opacity-45',
            'motion-reduce:transition-none',
          )}>
          <svg
            width={11}
            height={11}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="square"
            aria-hidden="true"
            focusable="false"
            className="opacity-0 transition-opacity duration-(--motion-fast) peer-checked:opacity-100 motion-reduce:transition-none">
            <path d="M3 8.5 L6.5 12 L13 4" />
          </svg>
        </span>
      </span>
      {label ? (
        <span className="flex flex-col gap-0.5">
          <label
            htmlFor={boxId}
            className="cursor-pointer text-[14px] leading-[18px] text-ink-on-night">
            {label}
          </label>
          {hint ? <span className="text-[12px] text-ink-on-night-dim">{hint}</span> : null}
        </span>
      ) : null}
    </div>
  )
}
