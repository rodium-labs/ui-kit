import type { HTMLAttributes } from 'react'
import { cn } from './cn'

export type KbdProps = HTMLAttributes<HTMLElement>

export function Kbd({ className, children, ...rest }: KbdProps) {
  return (
    <kbd
      {...rest}
      className={cn(
        'inline-flex min-h-6 min-w-6 items-center justify-center border border-night-edge px-1.5 font-mono text-[11px] text-ink-on-night-mid',
        className,
      )}>
      {children}
    </kbd>
  )
}
