import { ChartFrame } from './ChartFrame.js'
import { format, type Point } from './chart.js'
import { Table } from './Table.js'

export interface DivergingBarProps {
  title: string
  caption?: string
  name: string
  /** signed: above the baseline is a gain, below it a loss */
  points: readonly Point[]
  className?: string
}

// change against a baseline, which is the one case where a second colour is
// about polarity rather than identity. the midpoint is the baseline itself and
// carries no hue: it has to read as nothing happened.
export function DivergingBar({ title, caption, name, points, className }: DivergingBarProps) {
  const reach = Math.max(...points.map(p => Math.abs(p.value)), 1)

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      table={
        <Table
          head={[
            '',
            name,
          ]}
          rows={points.map(p => [
            p.label,
            (p.value > 0 ? '+' : '') + format(p.value),
          ])}
        />
      }>
      <ul className="flex flex-col gap-2">
        {points.map(p => {
          const share = (Math.abs(p.value) / reach) * 50
          const up = p.value >= 0
          return (
            <li
              key={p.label}
              className="flex items-center gap-3">
              <span className="w-20 shrink-0 truncate text-[12px] text-ink-on-night-mid">{p.label}</span>
              <span
                aria-hidden="true"
                className="relative h-3 min-w-0 flex-1">
                <span className="absolute inset-y-0 start-1/2 w-px bg-chart-axis" />
                <span
                  className="absolute inset-y-0"
                  style={{
                    [up ? 'left' : 'right']: '50%',
                    width: `${share}%`,
                    background: up ? 'var(--color-series-1)' : 'var(--color-series-2)',
                  }}
                />
              </span>
              <span className="w-14 shrink-0 text-end text-[12px] text-ink-on-night tabular-nums">
                {up ? '+' : ''}
                {format(p.value)}
              </span>
            </li>
          )
        })}
      </ul>
    </ChartFrame>
  )
}
