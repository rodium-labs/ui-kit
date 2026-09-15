import { ChartFrame } from './ChartFrame.js'
import { ChartLegend } from './ChartLegend.js'
import { format, SERIES } from './chart.js'
import { cn } from './cn.js'
import { Table } from './Table.js'

export interface StackedPart {
  name: string
  value: number
}

export interface StackedBarProps {
  title: string
  caption?: string
  parts: readonly StackedPart[]
  className?: string
}

// part to whole in one bar. the segments are separated by a gap in the surface
// colour rather than by a stroke: a border round each one adds ink that is not
// data, and on a dark ground it reads as a seam.
export function StackedBar({ title, caption, parts, className }: StackedBarProps) {
  const total = parts.reduce((sum, p) => sum + p.value, 0) || 1

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      legend={<ChartLegend names={parts.map(p => p.name)} />}
      table={
        <Table
          head={[
            'part',
            'value',
            'share',
          ]}
          rows={parts.map(p => [
            p.name,
            format(p.value),
            `${Math.round((p.value / total) * 100)}%`,
          ])}
        />
      }>
      <div
        aria-hidden="true"
        className="flex h-6 w-full gap-0.5">
        {parts.map((p, i) => (
          <div
            key={p.name}
            className={cn('h-full min-w-0')}
            style={{
              flexBasis: `${(p.value / total) * 100}%`,
              background: SERIES[i % SERIES.length],
            }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {parts.map(p => (
          <li
            key={p.name}
            className="text-[12px] text-ink-on-night-mid tabular-nums">
            <span className="text-ink-on-night">{Math.round((p.value / total) * 100)}%</span> {p.name}
          </li>
        ))}
      </ul>
    </ChartFrame>
  )
}
