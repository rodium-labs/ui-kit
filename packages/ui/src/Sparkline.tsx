import { line, type Point, span } from './chart.js'
import { cn } from './cn.js'

export interface SparklineProps {
  points: readonly Point[]
  /** what it is, for anyone who cannot see it */
  label: string
  /** a sparkline reads shape, not magnitude, so it does not start at zero */
  width?: number
  height?: number
  className?: string
}

// the smallest chart there is: a shape beside a number, with no axis and no
// legend. it carries no tooltip either - there is nothing to point at that the
// stat it sits next to does not already say.
export function Sparkline({ points, label, width = 96, height = 24, className }: SparklineProps) {
  const of = span(
    points.map(p => p.value),
    false,
  )
  const last = points.at(-1)

  return (
    <svg
      role="img"
      aria-label={`${label}: ${points.length} readings, ending at ${last?.value ?? 0}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn('overflow-visible', className)}>
      <path
        d={line(points, of, width, height)}
        fill="none"
        stroke="var(--color-series-1)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {last ? (
        <circle
          cx={width}
          cy={height - ((last.value - of.min) / (of.max - of.min)) * height}
          r={2.5}
          fill="var(--color-series-1)"
          stroke="var(--color-night)"
          strokeWidth={2}
        />
      ) : null}
    </svg>
  )
}
