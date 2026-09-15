'use client'

import { useRef, useState } from 'react'
import { ChartFrame } from './ChartFrame.js'
import { format, span, ticks } from './chart.js'
import { cn } from './cn.js'
import { Table } from './Table.js'
import { useChartWidth } from './useChartWidth.js'

export interface ScatterPoint {
  label: string
  x: number
  y: number
}

export interface ScatterChartProps {
  title: string
  caption?: string
  points: readonly ScatterPoint[]
  xLabel: string
  yLabel: string
  height?: number
  className?: string
}

const PAD = {
  top: 10,
  right: 12,
  bottom: 26,
  left: 42,
}

// two measures against each other. the dots carry a 2px ring in the surface
// colour so they stay countable where they overlap, and the ring is part of the
// hit target rather than only spacing.
export function ScatterChart({ title, caption, points, xLabel, yLabel, height = 200, className }: ScatterChartProps) {
  const [at, setAt] = useState<ScatterPoint | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const W = useChartWidth(box)
  const w = W - PAD.left - PAD.right
  const h = height - PAD.top - PAD.bottom
  const ofX = span(points.map(p => p.x))
  const ofY = span(points.map(p => p.y))

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      table={
        <Table
          head={[
            '',
            xLabel,
            yLabel,
          ]}
          rows={points.map(p => [
            p.label,
            format(p.x),
            format(p.y),
          ])}
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
          {ticks(ofY).map(t => {
            const y = PAD.top + h - ((t - ofY.min) / (ofY.max - ofY.min)) * h
            return (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + w}
                  y1={y}
                  y2={y}
                  stroke="var(--color-chart-grid)"
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
          {points.map(p => {
            const cx = PAD.left + ((p.x - ofX.min) / (ofX.max - ofX.min)) * w
            const cy = PAD.top + h - ((p.y - ofY.min) / (ofY.max - ofY.min)) * h
            return (
              <circle
                key={p.label}
                cx={cx}
                cy={cy}
                r={at === p ? 6 : 4.5}
                fill="var(--color-series-1)"
                stroke="var(--color-night)"
                strokeWidth={2}
                onPointerEnter={() => setAt(p)}
              />
            )
          })}
          <text
            x={PAD.left + w}
            y={height - 6}
            textAnchor="end"
            className="fill-ink-on-night-dim text-[11px]">
            {xLabel} →
          </text>
        </svg>
        {at ? (
          <div
            className={cn(
              'pointer-events-none absolute top-0 left-0 z-10 w-max border border-night-edge bg-night px-2.5 py-1.5',
              'text-[11px] leading-snug text-ink-on-night shadow-[0_10px_28px_rgb(0_0_0/0.8)]',
            )}>
            <p className="text-ink-on-night-dim">{at.label}</p>
            <p className="tabular-nums">
              {xLabel} {format(at.x)} · {yLabel} {format(at.y)}
            </p>
          </div>
        ) : null}
      </div>
    </ChartFrame>
  )
}
