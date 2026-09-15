'use client'

import type { ReactNode } from 'react'
import { cn } from './cn.js'
import { Odometer } from './Odometer.js'

export type StatTrend = 'up' | 'down' | 'flat'

export interface StatProps {
  label: string
  value: ReactNode
  unit?: string
  trend?: StatTrend
  delta?: string
  /** roll each digit to its new value instead of snapping */
  animate?: boolean
  className?: string
}

// the arrow and the hidden word carry the direction alongside the colour, so
// the reading does not depend on telling green from red.
const TREND: Record<
  StatTrend,
  {
    ink: string
    mark: string
    word: string
  }
> = {
  up: {
    ink: 'text-ink-green-on-night',
    mark: '↑',
    word: 'up',
  },
  down: {
    ink: 'text-danger',
    mark: '↓',
    word: 'down',
  },
  flat: {
    ink: 'text-ink-on-night-dim',
    mark: '→',
    word: 'level',
  },
}

export function Stat({ label, value, unit, trend, delta, animate = false, className }: StatProps) {
  const direction = trend ? TREND[trend] : null
  const text = typeof value === 'number' || typeof value === 'string' ? String(value) : null
  const rolls = animate && text !== null

  return (
    <div className={cn('flex flex-col gap-2 border-t border-night-rule pt-4', className)}>
      <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-[28px] leading-none font-semibold tracking-[-0.02em] text-ink-on-night tabular-nums">
          {rolls && text !== null ? <Odometer value={text} /> : value}
        </span>
        {unit ? <span className="text-[14px] text-ink-on-night-dim">{unit}</span> : null}
      </span>
      {direction && delta ? (
        <span className={cn('flex items-center gap-1 text-[13px] tabular-nums', direction.ink)}>
          <span aria-hidden="true">{direction.mark}</span>
          {delta}
          <span className="sr-only">{direction.word}</span>
        </span>
      ) : null}
    </div>
  )
}
