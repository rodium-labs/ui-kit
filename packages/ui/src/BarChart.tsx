'use client'

import { useRef, useState } from 'react'
import { ChartFrame } from './ChartFrame.js'
import { ChartTable } from './ChartTable.js'
import { format, type Point, span, ticks } from './chart.js'
import { cn } from './cn.js'
import { useChartWidth } from './useChartWidth.js'

export interface BarChartProps {
  title: string
  caption?: string
  name: string
  points: readonly Point[]
  /** the one bar the story is about; the rest go quiet behind it */
  emphasis?: string
  height?: number
  className?: string
}

const PAD = {
  top: 8,
  right: 8,
  bottom: 24,
  left: 40,
}
const MAX_BAR = 24
const GAP = 2

// columns from a zero baseline, because a cut baseline turns a two percent
// difference into a doubling. `emphasis` is the form this kit reaches for most:
// one bar in the accent, the rest in a quiet step of the same hue, which says
// which one the sentence above is about without spending a second colour.
export function BarChart({ title, caption, name, points, emphasis, height = 180, className }: BarChartProps) {
  const [at, setAt] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const W = useChartWidth(box)
  const w = W - PAD.left - PAD.right
  const h = height - PAD.top - PAD.bottom
  const of = span(points.map(p => p.value))
  const marks = ticks(of)
  const slot = w / Math.max(1, points.length)
  const bar = Math.min(MAX_BAR, slot - GAP * 2)

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      table={
        <ChartTable
          series={[
            {
              name,
              points,
            },
          ]}
        />
      }>
      <div
        ref={box}
        className="relative">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          // no pixel height: w-full fills the column and the viewBox sets the
          // shape. a fixed height made the svg letterbox itself inside the
          // column and sit off to one side of it.
          className="h-auto w-full touch-none"
          onPointerLeave={() => setAt(null)}
          aria-hidden="true">
          {marks.map(t => {
            const y = PAD.top + h - ((t - of.min) / (of.max - of.min)) * h
            return (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + w}
                  y1={y}
                  y2={y}
                  stroke={t === 0 ? 'var(--color-chart-axis)' : 'var(--color-chart-grid)'}
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-ink-on-night-dim text-[11px] tabular-nums">
                  {format(t, true)}
                </text>
              </g>
            )
          })}
          {points.map((p, i) => {
            const size = ((p.value - of.min) / (of.max - of.min)) * h
            const x = PAD.left + i * slot + (slot - bar) / 2
            const lit = emphasis === undefined || p.label === emphasis
            return (
              <g key={p.label}>
                <rect
                  x={x}
                  y={PAD.top + h - size}
                  width={bar}
                  height={Math.max(0, size)}
                  // rounded at the data end, square where it meets the baseline
                  rx={4}
                  fill={lit ? 'var(--color-series-1)' : 'var(--color-scale-1)'}
                />
                <rect
                  x={x}
                  y={PAD.top + h - Math.min(size, 4)}
                  width={bar}
                  height={Math.min(size, 4)}
                  fill={lit ? 'var(--color-series-1)' : 'var(--color-scale-1)'}
                />
                {/* a hit target the whole slot wide, so a thin bar is still easy to point at */}
                <rect
                  x={PAD.left + i * slot}
                  y={PAD.top}
                  width={slot}
                  height={h}
                  fill="transparent"
                  onPointerEnter={() => setAt(i)}
                />
              </g>
            )
          })}
          {points.map((p, i) => (
            <text
              key={p.label}
              x={PAD.left + i * slot + slot / 2}
              y={height - 6}
              textAnchor="middle"
              className="fill-ink-on-night-dim text-[11px]">
              {p.label}
            </text>
          ))}
        </svg>
        {at !== null && points.at(at) ? (
          <div
            className={cn(
              'pointer-events-none absolute top-0 z-10 w-max border border-night-edge bg-night px-2.5 py-1.5',
              'text-[11px] leading-snug text-ink-on-night shadow-[0_10px_28px_rgb(0_0_0/0.8)]',
            )}
            style={{
              left: `${((PAD.left + at * slot + slot / 2) / W) * 100}%`,
              transform: 'translateX(-50%)',
            }}>
            <p className="text-ink-on-night-dim">{points.at(at)?.label}</p>
            <p className="tabular-nums">{format(points.at(at)?.value ?? 0)}</p>
          </div>
        ) : null}
      </div>
    </ChartFrame>
  )
}
