'use client'

import { type PointerEvent, useRef, useState } from 'react'
import { ChartFrame } from './ChartFrame.js'
import { ChartTable } from './ChartTable.js'
import { format, line, type Point, span, ticks } from './chart.js'
import { cn } from './cn.js'
import { useChartWidth } from './useChartWidth.js'

export interface AreaChartProps {
  title: string
  caption?: string
  /** one series: the fill is what makes it an area, and two fills overlap badly */
  name: string
  points: readonly Point[]
  height?: number
  className?: string
}

const PAD = {
  top: 8,
  right: 8,
  bottom: 22,
  left: 40,
}

// one series under a wash. the fill is the whole point of the form, and two
// washes on one plot hide each other, so this takes a single series and the
// title names it - which is also why it carries no legend.
export function AreaChart({ title, caption, name, points, height = 180, className }: AreaChartProps) {
  const [at, setAt] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const W = useChartWidth(box)
  const w = W - PAD.left - PAD.right
  const h = height - PAD.top - PAD.bottom
  const of = span(points.map(p => p.value))
  const marks = ticks(of)

  const read = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width) * W - PAD.left
    const i = Math.round((x / w) * (points.length - 1))
    setAt(i >= 0 && i < points.length ? i : null)
  }

  const path = line(points, of, w, h)

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
          onPointerMove={read}
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
          <g transform={`translate(${PAD.left} ${PAD.top})`}>
            <path
              d={`${path} L${w} ${h} L0 ${h} Z`}
              fill="var(--color-series-1)"
              fillOpacity={0.1}
            />
            <path
              d={path}
              fill="none"
              stroke="var(--color-series-1)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {at !== null && points.at(at) ? (
              <circle
                cx={(at / Math.max(1, points.length - 1)) * w}
                cy={h - (((points.at(at)?.value ?? 0) - of.min) / (of.max - of.min)) * h}
                r={4}
                fill="var(--color-series-1)"
                stroke="var(--color-night)"
                strokeWidth={2}
              />
            ) : null}
          </g>
          {points.map((p, i) =>
            i === 0 || i === points.length - 1 ? (
              <text
                key={p.label}
                x={PAD.left + (i / Math.max(1, points.length - 1)) * w}
                y={height - 6}
                textAnchor={i === 0 ? 'start' : 'end'}
                className="fill-ink-on-night-dim text-[11px]">
                {p.label}
              </text>
            ) : null,
          )}
        </svg>
        {at !== null && points.at(at) ? (
          <div
            className={cn(
              'pointer-events-none absolute top-0 z-10 w-max border border-night-edge bg-night px-2.5 py-1.5',
              'text-[11px] leading-snug text-ink-on-night shadow-[0_10px_28px_rgb(0_0_0/0.8)]',
            )}
            style={{
              left: `${((PAD.left + (at / Math.max(1, points.length - 1)) * w) / W) * 100}%`,
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
