import { cloneElement, isValidElement, type ReactElement, type ReactNode, useId } from 'react'
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

// the width is clamped to the viewport because html clips rather than scrolls:
// an unclamped tooltip near the trailing edge loses its text to the clip.
// hover and focus both show it, and it is described rather than labelled, so a
// screen reader still reads the control's own name first. the description has
// to land on the control itself: on a wrapper it names an element nothing ever
// focuses, and the text never reaches assistive technology.
export function Tooltip({ label, side = 'top', className, children }: TooltipProps) {
  const id = useId()

  const described = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{
          'aria-describedby'?: string
        }>,
        {
          'aria-describedby': id,
        },
      )
    : children

  return (
    <span className={cn('group relative inline-flex', className)}>
      {described}
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-[min(14rem,calc(100vw-2rem))] border border-night-edge bg-night px-2.5 py-1.5 text-[12px] leading-snug text-ink-on-night',
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
