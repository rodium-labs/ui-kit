'use client'

import { useState } from 'react'
import { ChartFrame } from './ChartFrame.js'
import { format, SCALE, span, step } from './chart.js'
import { cn } from './cn.js'
import { Table } from './Table.js'

export interface HeatCell {
  row: string
  column: string
  value: number
}

export interface HeatmapProps {
  title: string
  caption?: string
  cells: readonly HeatCell[]
  className?: string
}

// magnitude across a grid, on the sequential ramp: one hue, brighter where
// there is more. the scale legend is not optional here - a reader has no other
// way to turn a shade back into a number.
export function Heatmap({ title, caption, cells, className }: HeatmapProps) {
  const [at, setAt] = useState<HeatCell | null>(null)
  const rows = [
    ...new Set(cells.map(c => c.row)),
  ]
  const columns = [
    ...new Set(cells.map(c => c.column)),
  ]
  const of = span(cells.map(c => c.value))
  const find = (row: string, column: string) => cells.find(c => c.row === row && c.column === column)

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      legend={
        <div className="flex items-center gap-2 text-[12px] text-ink-on-night-dim tabular-nums">
          <span>{format(of.min)}</span>
          <span
            aria-hidden="true"
            className="flex gap-0.5">
            {SCALE.map(c => (
              <span
                key={c}
                className="size-2.5"
                style={{
                  background: c,
                }}
              />
            ))}
          </span>
          <span>{format(of.max)}</span>
        </div>
      }
      table={
        <Table
          head={[
            '',
            ...columns,
          ]}
          rows={rows.map(r => [
            r,
            ...columns.map(c => format(find(r, c)?.value ?? 0)),
          ])}
        />
      }>
      <div
        className="flex flex-col gap-1 overflow-x-auto"
        onPointerLeave={() => setAt(null)}>
        {rows.map(row => (
          <div
            key={row}
            className="flex items-center gap-2">
            <span className="w-16 shrink-0 truncate text-[11px] text-ink-on-night-dim">{row}</span>
            <div className="flex gap-1">
              {columns.map(column => {
                const cell = find(row, column)
                return (
                  <span
                    key={column}
                    onPointerEnter={() => setAt(cell ?? null)}
                    className={cn('size-4 shrink-0', at === cell && 'outline-1 outline-offset-1 outline-ink-on-night')}
                    style={{
                      background: cell ? SCALE[step(cell.value, of)] : 'var(--color-night-frame)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="min-h-4 text-[11px] text-ink-on-night-mid tabular-nums">
        {at ? `${at.row} · ${at.column} · ${format(at.value)}` : ''}
      </p>
    </ChartFrame>
  )
}
