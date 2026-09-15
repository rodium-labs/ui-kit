import { ChartFrame } from './ChartFrame.js'
import { format } from './chart.js'

export interface MeterProps {
  title: string
  caption?: string
  value: number
  limit: number
  /** what the number counts */
  unit?: string
  className?: string
}

// one ratio against a limit. a pie of two slices is the wrong form for this and
// a meter is the right one: the track is the limit, the fill is the value, and
// the number is written out rather than left to be estimated from an angle.
export function Meter({ title, caption, value, limit, unit, className }: MeterProps) {
  const share = Math.max(0, Math.min(1, value / (limit || 1)))
  const pct = Math.round(share * 100)

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}>
      <div className="flex flex-col gap-2">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[28px] leading-none font-semibold tracking-[-0.02em] text-ink-on-night tabular-nums">
            {format(value)}
          </span>
          <span className="text-[13px] text-ink-on-night-dim tabular-nums">
            of {format(limit)}
            {unit ? ` ${unit}` : ''}
          </span>
        </p>
        {/* <meter> is the element for this and it is not usable here: with or
            without appearance:none, chrome ignores ::-webkit-meter-bar and
            ::-webkit-meter-optimum-value and paints its own lime green, which
            belongs to no part of this surface. the role is the exact mapping of
            the element it replaces, and every bound it announces is written out
            below, so nothing is lost but the styling problem. */}
        {/* biome-ignore lint/a11y/useSemanticElements: <meter> cannot be repainted in chrome; see above */}
        <div
          role="meter"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-valuetext={`${format(value)} of ${format(limit)}${unit ? ` ${unit}` : ''}, ${pct} percent`}
          className="h-1.5 w-full bg-night-frame">
          <div
            className="h-full bg-series-1 transition-[width] duration-(--motion-slow) ease-through motion-reduce:transition-none"
            style={{
              width: `${share * 100}%`,
            }}
          />
        </div>
        <p className="text-[12px] text-ink-on-night-dim tabular-nums">{pct}% used</p>
      </div>
    </ChartFrame>
  )
}
