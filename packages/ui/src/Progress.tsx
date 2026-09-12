import { cn } from './cn'

export interface ProgressProps {
  /** omit for an indeterminate bar */
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

// with no value it runs indeterminate: the bar says work is happening without
// claiming to know how much is left.
export function Progress({ value, max = 100, label, showValue = false, className }: ProgressProps) {
  const indeterminate = value === undefined
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-4">
          {label ? (
            <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</span>
          ) : null}
          {showValue && !indeterminate ? (
            <span className="text-[12px] text-ink-on-night tabular-nums">{Math.round(pct)}%</span>
          ) : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        {...(indeterminate
          ? {}
          : {
              'aria-valuenow': Math.round(pct),
              'aria-valuemin': 0,
              'aria-valuemax': 100,
            })}
        aria-label={label}
        className="h-px w-full overflow-hidden bg-night-frame">
        {indeterminate ? (
          <div className="animate-track h-full w-1/3 bg-brand-green motion-reduce:w-full motion-reduce:animate-none motion-reduce:opacity-60" />
        ) : (
          <div
            className="h-full bg-brand-green transition-[width] duration-(--motion-slow) ease-rl motion-reduce:transition-none"
            style={{
              width: `${pct}%`,
            }}
          />
        )}
      </div>
    </div>
  )
}
