import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from './cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
}

// the whole row is the label, so there is no dead strip between the box and
// its text. the native box does the state and the keyboard; it is made
// invisible rather than removed, and the mark below is a picture of it.
export function Checkbox({ label, hint, className, id, ...rest }: CheckboxProps) {
  const auto = useId()
  const boxId = id ?? auto
  const hintId = `${boxId}-hint`

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={boxId}
        className="flex cursor-pointer items-start gap-3 has-[:disabled]:cursor-not-allowed">
        <span className="relative flex size-[18px] shrink-0 items-center justify-center">
          {/* the visible box is 18px; the target it carries is 24px */}
          <input
            {...rest}
            id={boxId}
            type="checkbox"
            aria-describedby={hint ? hintId : undefined}
            className="peer absolute -inset-[3px] z-1 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <span
            aria-hidden="true"
            className={cn(
              'flex size-[18px] items-center justify-center border border-night-edge text-night',
              'transition-colors duration-(--motion-fast)',
              'peer-[:hover:not(:checked)]:border-night-edge-lit peer-[:hover:not(:checked)]:bg-night-wash',
              'peer-checked:border-brand-green peer-checked:bg-brand-green',
              'peer-checked:[&>svg]:opacity-100',
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
              className="opacity-0 transition-opacity duration-(--motion-fast) motion-reduce:transition-none">
              <path d="M3 8.5 L6.5 12 L13 4" />
            </svg>
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
