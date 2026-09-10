import type { HTMLAttributes } from 'react'
import { cn } from './cn'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  muted?: boolean
}

// a bordered chip for a version, a count, a filter. square, like everything
// else the surface draws.
export function Tag({ muted = false, className, children, ...rest }: TagProps) {
  return (
    <span
      {...rest}
      className={cn(
        'inline-flex min-h-6 shrink-0 items-center border border-night-edge px-2 text-[12px] whitespace-nowrap',
        muted ? 'text-ink-on-night-dim' : 'text-ink-on-night-mid',
        className,
      )}>
      {children}
    </span>
  )
}
