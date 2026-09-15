'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { cn } from './cn.js'

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
        // the host sets the pace. a stat changes every couple of seconds and can
        // afford a long roll; a control you can press eight times a second
        // cannot, and a roll that outlasts the next press leaves the field
        // showing a number it no longer holds.
        className="flex flex-col transition-transform duration-[var(--odometer-motion,var(--motion-slower))] ease-through motion-reduce:transition-none"
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

export interface OdometerProps {
  /** the number as it should read, separators and signs included */
  value: string
  /** the reading is announced by the control that owns it */
  silent?: boolean
  className?: string
}

// how close together two changes have to be before the roll gives up.
//
// not the roll's own length. a transition that is retargeted mid-flight carries
// on from where it is, so presses a few hundred milliseconds apart keep the
// drum turning and simply trail it a little - which is what a drum does. only
// changes far faster than the eye can follow a roll are worth giving up for: a
// held arrow key repeats around every 33ms, and frantic clicking lands near
// 100ms. deliberate pressing sits at 300ms and up, and must never be caught.
const RUSH = 180

/**
 * A number that rolls to its new value rather than swapping to it.
 *
 * The whole number is announced once from a visually hidden copy, and the
 * rolling digits are kept out of the accessibility tree: a screen reader
 * walking ten digits per column would read a wall of numbers instead of a
 * value. Where the surrounding control already announces the number - a
 * spinbutton does - pass `silent` so it is not read twice.
 */

export function Odometer({ value, silent = false, className }: OdometerProps) {
  // the first paint sits on the final digits, so a column only rolls on a
  // change rather than counting up from zero when the page loads
  const [shown, setShown] = useState(value)
  // a long roll is the point of this component, and it is also what makes a
  // held arrow key display a number the control no longer holds. so the pace
  // is not fixed: one change at a time gets the full roll, and changes that
  // arrive faster than it shorten until they stop.
  const [rushed, setRushed] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    const now = performance.now()
    const gap = now - last.current
    last.current = now
    if (gap < RUSH) setRushed(true)
    const settle = setTimeout(() => setRushed(false), RUSH)
    const frame = requestAnimationFrame(() => setShown(value))
    return () => {
      clearTimeout(settle)
      cancelAnimationFrame(frame)
    }
  }, [
    value,
  ])

  return (
    <>
      {silent ? null : <span className="sr-only">{value}</span>}
      <span
        aria-hidden="true"
        style={
          rushed
            ? ({
                '--odometer-motion': '0ms',
              } as CSSProperties)
            : undefined
        }
        className={cn('inline-flex items-baseline leading-none', className)}>
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
