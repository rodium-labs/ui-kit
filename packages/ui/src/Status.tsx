import type { HTMLAttributes } from 'react'
import { cn } from './cn.js'

export type StatusTone = 'accent' | 'neutral' | 'warm' | 'danger'

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone
}

const TONE: Record<StatusTone, string> = {
  accent: 'text-ink-green-on-night',
  neutral: 'text-ink-on-night-dim',
  warm: 'text-brand-pink',
  danger: 'text-danger',
}

// the one label that carries a state. it is set in the surface's own uppercase
// rather than boxed, because a filled pill is the only rounded thing here.
export function Status({ tone = 'accent', className, children, ...rest }: StatusProps) {
  return (
    <span
      {...rest}
      className={cn('text-[12px] font-medium tracking-[0.12em] uppercase', TONE[tone], className)}>
      {children}
    </span>
  )
}
