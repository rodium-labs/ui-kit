import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

export type BadgeTone = 'neutral' | 'accent' | 'warm' | 'danger' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  dot?: boolean
  children?: ReactNode
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-night-wash text-ink-on-night-mid',
  accent: 'bg-[color-mix(in_oklab,var(--color-brand-green)_18%,transparent)] text-brand-green-lit',
  warm: 'bg-[color-mix(in_oklab,var(--color-brand-pink)_16%,transparent)] text-brand-pink-lit',
  danger: 'bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-danger-lit',
  outline: 'border border-night-edge text-ink-on-night-mid',
}

const DOT: Record<BadgeTone, string> = {
  neutral: 'bg-ink-on-night-dim',
  accent: 'bg-brand-green',
  warm: 'bg-brand-pink',
  danger: 'bg-danger',
  outline: 'bg-ink-on-night-dim',
}

export function Badge({ tone = 'neutral', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[999px] px-2.5 text-[12px] font-medium tracking-[0.01em]',
        TONE[tone],
        className,
      )}>
      {dot ? (
        <span
          aria-hidden="true"
          className={cn('size-1.5 rounded-full', DOT[tone])}
        />
      ) : null}
      {children}
    </span>
  )
}
