'use client'

import { type PointerEvent, useId, useRef, useState } from 'react'
import { ChartFrame } from './ChartFrame.js'
import { ChartLegend } from './ChartLegend.js'
import { ChartTable } from './ChartTable.js'
import { format, line, SERIES, type Series, span, ticks } from './chart.js'
import { cn } from './cn.js'
import { useChartWidth } from './useChartWidth.js'

export interface LineChartProps {
  title: string
  caption?: string
  series: readonly Series[]
  /** off where the movement is small and zero would flatten it; say so in the caption */
  zero?: boolean
  height?: number
  className?: string
}

const PAD = {
  top: 8,
  right: 8,
  bottom: 22,
  left: 40,
}

// a trend, with a crosshair that reads every series at the same x. two series
// is the ceiling the palette was validated for; past that the honest form is
// small multiples, or the table this already carries.
export function LineChart({ title, caption, series, zero = true, height = 180, className }: LineChartProps) {
  const id = useId()
  const [at, setAt] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const W = useChartWidth(box)
  const w = W - PAD.left - PAD.right
  const h = height - PAD.top - PAD.bottom

  const all = series.flatMap(s => s.points.map(p => p.value))
  const of = span(all, zero)
  const labels = series.at(0)?.points.map(p => p.label) ?? []
  const marks = ticks(of)

  const read = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width) * W - PAD.left
    const i = Math.round((x / w) * (labels.length - 1))
    setAt(i >= 0 && i < labels.length ? i : null)
  }

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      legend={series.length > 1 ? <ChartLegend names={series.map(s => s.name)} /> : undefined}
      table={<ChartTable series={series} />}>
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
          <title id={id}>{title}</title>
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
          {at !== null && labels.length > 1 ? (
            <line
              x1={PAD.left + (at / (labels.length - 1)) * w}
              x2={PAD.left + (at / (labels.length - 1)) * w}
              y1={PAD.top}
              y2={PAD.top + h}
              stroke="var(--color-chart-axis)"
              strokeWidth={1}
            />
          ) : null}
          <g transform={`translate(${PAD.left} ${PAD.top})`}>
            {series.map((s, si) => (
              <path
                key={s.name}
                d={line(s.points, of, w, h)}
                fill="none"
                stroke={SERIES[si % SERIES.length]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {at !== null
              ? series.map((s, si) => {
                  const p = s.points.at(at)
                  if (!p) return null
                  return (
                    <circle
                      key={s.name}
                      cx={(at / Math.max(1, labels.length - 1)) * w}
                      cy={h - ((p.value - of.min) / (of.max - of.min)) * h}
                      r={4}
                      fill={SERIES[si % SERIES.length]}
                      stroke="var(--color-night)"
                      strokeWidth={2}
                    />
                  )
                })
              : null}
          </g>
          {labels.map((l, i) =>
            i === 0 || i === labels.length - 1 ? (
              <text
                key={l}
                x={PAD.left + (i / Math.max(1, labels.length - 1)) * w}
                y={height - 6}
                textAnchor={i === 0 ? 'start' : 'end'}
                className="fill-ink-on-night-dim text-[11px]">
                {l}
              </text>
            ) : null,
          )}
        </svg>
        {at !== null && labels.at(at) ? (
          <div
            className={cn(
              'pointer-events-none absolute top-0 z-10 w-max border border-night-edge bg-night px-2.5 py-1.5',
              'text-[11px] leading-snug text-ink-on-night shadow-[0_10px_28px_rgb(0_0_0/0.8)]',
            )}
            style={{
              left: `${((PAD.left + (at / Math.max(1, labels.length - 1)) * w) / W) * 100}%`,
              transform: 'translateX(-50%)',
            }}>
            <p className="text-ink-on-night-dim">{labels.at(at)}</p>
            {series.map((s, si) => (
              <p
                key={s.name}
                className="flex items-center gap-1.5 tabular-nums">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0"
                  style={{
                    background: SERIES[si % SERIES.length],
                  }}
                />
                {s.name} {format(s.points.at(at)?.value ?? 0)}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </ChartFrame>
  )
}
