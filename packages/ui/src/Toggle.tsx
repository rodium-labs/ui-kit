import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'

export type ToggleSize = 'sm' | 'md'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'aria-pressed'> {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  size?: ToggleSize
  icon?: ReactNode
  children?: ReactNode
}

const SIZE: Record<ToggleSize, string> = {
  sm: 'min-h-9 gap-1.5 px-3 text-[13px]',
  md: 'min-h-11 gap-2 px-4 text-[14px]',
}

// a button that stays down. aria-pressed is what carries the state, so the
// border and the fill are describing it rather than being it: with forced
// colours on, or with the stylesheet gone, the state is still announced.
export function Toggle({
  pressed,
  onPressedChange,
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...rest
}: ToggleProps) {
  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'press inline-flex shrink-0 cursor-pointer items-center justify-center border font-medium whitespace-nowrap',
        'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
        'disabled:pointer-events-none disabled:opacity-45',
        SIZE[size],
        // two channels, not one. hover only brightens: edge and ink, no fill.
        // pressed takes the fill and turns its edge green. the accent is the
        // mark, never the ink - it is darker than white, so a label painted
        // with it would make the chosen one the dimmest thing in the row.
        pressed
          ? 'border-brand-green bg-night-wash text-ink-on-night'
          : 'border-night-edge text-ink-on-night-mid hover:border-night-edge-lit hover:text-ink-on-night',
        focus,
        className,
      )}>
      {icon ? (
        <span
          aria-hidden="true"
          className="flex shrink-0">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  )
}
