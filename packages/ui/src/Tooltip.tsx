import { type ReactNode, useId } from 'react'
import { cn } from './cn'

export type TooltipSide = 'top' | 'bottom'

export interface TooltipProps {
  label: ReactNode
  side?: TooltipSide
  className?: string
  children: ReactNode
}

const SIDE: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
}

// hover and focus both show it, and it is described rather than labelled, so a
// screen reader still reads the control's own name first.
export function Tooltip({ label, side = 'top', className, children }: TooltipProps) {
  const id = useId()

  return (
    <span className={cn('group relative inline-flex', className)}>
      <span aria-describedby={id}>{children}</span>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-56 border border-night-edge bg-night px-2.5 py-1.5 text-[12px] leading-snug text-ink-on-night',
          'opacity-0 transition-opacity duration-(--motion-fast)',
          'group-hover:opacity-100 group-focus-within:opacity-100',
          'motion-reduce:transition-none',
          SIDE[side],
        )}>
        {label}
      </span>
    </span>
  )
}
