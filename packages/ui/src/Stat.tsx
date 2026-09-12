'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from './cn'

export type StatTrend = 'up' | 'down' | 'flat'

export interface StatProps {
  label: string
  value: ReactNode
  unit?: string
  trend?: StatTrend
  delta?: string
  /** count to the number instead of snapping to it */
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

const COUNT_MS = 650

function decimals(text: string): number {
  const dot = text.indexOf('.')
  return dot < 0 ? 0 : text.length - dot - 1
}

/**
 * Counts from the previous number to the next one. Anything that is not a plain
 * number is handed back untouched, and a reduced-motion preference skips
 * straight to the value rather than animating to it.
 */
function useCounted(value: ReactNode, enabled: boolean): ReactNode {
  const text = typeof value === 'number' || typeof value === 'string' ? String(value) : null
  const target = text !== null && text.trim() !== '' && Number.isFinite(Number(text)) ? Number(text) : null

  const [shown, setShown] = useState(target)
  const from = useRef(target)
  const frame = useRef(0)

  useEffect(() => {
    if (target === null) return

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled || calm) {
      from.current = target
      setShown(target)
      return
    }

    const start = from.current ?? target
    if (start === target) {
      setShown(target)
      return
    }

    const began = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - began) / COUNT_MS)
      // ease-out cubic: fast first, settling into the number
      const eased = 1 - (1 - t) ** 3
      setShown(start + (target - start) * eased)
      if (t < 1) {
        frame.current = requestAnimationFrame(step)
        return
      }
      from.current = target
    }

    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [
    target,
    enabled,
  ])

  if (target === null || shown === null) return value
  return shown.toFixed(decimals(text ?? ''))
}

export function Stat({ label, value, unit, trend, delta, animate = false, className }: StatProps) {
  const direction = trend ? TREND[trend] : null
  const shown = useCounted(value, animate)

  return (
    <div className={cn('flex flex-col gap-2 border-t border-night-rule pt-4', className)}>
      <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-[28px] leading-none font-semibold tracking-[-0.02em] text-ink-on-night tabular-nums">
          {shown}
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
