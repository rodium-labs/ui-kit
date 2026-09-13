'use client'

import { type CSSProperties, type ReactNode, useEffect, useState } from 'react'
import { cn } from './cn'

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

const DIGITS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]

/**
 * One column of 0-9, shifted so the wanted digit sits in the window. Only the
 * columns whose digit actually changed move, because the others are already
 * where they need to be.
 */
function Digit({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-baseline tabular-nums">
      <span
        className="flex flex-col transition-transform duration-(--motion-slow) ease-rl motion-reduce:transition-none"
        style={
          {
            transform: `translateY(-${digit * 10}%)`,
          } as CSSProperties
        }>
        {DIGITS.map(d => (
          <span
            key={d}
            className="flex h-[1em] items-center justify-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

/**
 * The whole number is announced once, from a visually hidden copy. The rolling
 * digits are hidden from the accessibility tree: a screen reader walking ten
 * digits per column would read a wall of numbers instead of the value.
 */
function Odometer({ value }: { value: string }) {
  // the first paint sits on the final digits, so the column only rolls on a
  // change rather than counting up from zero when the page loads
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(value))
    return () => cancelAnimationFrame(frame)
  }, [
    value,
  ])

  return (
    <>
      <span className="sr-only">{value}</span>
      <span
        aria-hidden="true"
        className="inline-flex items-baseline leading-none">
        {[
          ...shown,
        ].map((char, index) => {
          const digit = Number(char)
          const key = `${index}-${char.match(/\d/) ? 'd' : char}`
          return Number.isNaN(digit) || char === ' ' ? (
            <span key={key}>{char}</span>
          ) : (
            <Digit
              key={key}
              digit={digit}
            />
          )
        })}
      </span>
    </>
  )
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
