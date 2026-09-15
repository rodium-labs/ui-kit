import { ChartFrame } from './ChartFrame.js'
import { ChartTable } from './ChartTable.js'
import { format, type Point, span } from './chart.js'
import { cn } from './cn.js'

export interface BarListProps {
  title: string
  caption?: string
  name: string
  points: readonly Point[]
  /** the one row the story is about */
  emphasis?: string
  className?: string
}

// horizontal, which is what a long category name needs: the label reads along
// the row instead of being turned on its side under a column. the value rides
// the tip of each bar, so no axis is needed at all.
export function BarList({ title, caption, name, points, emphasis, className }: BarListProps) {
  const of = span(points.map(p => p.value))

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
      <ul className="flex flex-col gap-2.5">
        {points.map(p => {
          const width = Math.max(1, ((p.value - of.min) / (of.max - of.min)) * 100)
          // scale-2 clears 3:1; the ramp's dimmest step does not, and a quiet
          // bar is still a bar someone has to read against its neighbours
          const lit = emphasis === undefined || p.label === emphasis
          return (
            <li
              key={p.label}
              className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4 text-[12px]">
                <span className="min-w-0 truncate text-ink-on-night-mid">{p.label}</span>
                <span className="shrink-0 text-ink-on-night tabular-nums">{format(p.value)}</span>
              </div>
              <div
                aria-hidden="true"
                className="h-1.5 w-full bg-night-frame">
                <div
                  className={cn(
                    'h-full transition-[width] duration-(--motion-slow) ease-through motion-reduce:transition-none',
                  )}
                  style={{
                    width: `${width}%`,
                    background: lit ? 'var(--color-series-1)' : 'var(--color-scale-2)',
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </ChartFrame>
  )
}
