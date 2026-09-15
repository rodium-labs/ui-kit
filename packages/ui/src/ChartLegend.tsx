import { SERIES } from './chart.js'
import { cn } from './cn.js'

export interface ChartLegendProps {
  names: readonly string[]
  className?: string
}

// present whenever there is more than one series, so identity never rests on
// telling two colours apart. the swatch carries the colour; the name is ink.
export function ChartLegend({ names, className }: ChartLegendProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5', className)}>
      {names.map((name, i) => (
        <li
          key={name}
          className="flex items-center gap-1.5 text-[12px] text-ink-on-night-mid">
          <span
            aria-hidden="true"
            className="size-2 shrink-0"
            style={{
              background: SERIES[i % SERIES.length],
            }}
          />
          {name}
        </li>
      ))}
    </ul>
  )
}
