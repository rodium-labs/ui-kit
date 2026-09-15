import { ChartFrame } from './ChartFrame.js'
import { format } from './chart.js'
import { cn } from './cn.js'

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
        {/* the browser's own meter, styled through its parts. it is the element
            for a measurement inside a known range, so the value, the bounds and
            the spoken text come from the platform rather than from aria written
            by hand. the same trick the slider uses on its track. */}
        <meter
          value={value}
          min={0}
          max={limit}
          aria-label={`${title}: ${format(value)} of ${format(limit)}${unit ? ` ${unit}` : ''}`}
          className={cn(
            'h-1.5 w-full appearance-none bg-night-frame',
            '[&::-webkit-meter-bar]:h-1.5 [&::-webkit-meter-bar]:border-0 [&::-webkit-meter-bar]:bg-night-frame',
            '[&::-webkit-meter-optimum-value]:bg-[var(--color-series-1)]',
            '[&::-webkit-meter-suboptimum-value]:bg-[var(--color-series-1)]',
            '[&::-webkit-meter-even-less-good-value]:bg-[var(--color-series-1)]',
            '[&::-moz-meter-bar]:bg-[var(--color-series-1)]',
          )}
        />
        <p className="text-[12px] text-ink-on-night-dim tabular-nums">{pct}% used</p>
      </div>
    </ChartFrame>
  )
}
