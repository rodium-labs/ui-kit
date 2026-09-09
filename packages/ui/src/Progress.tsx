import { cn } from './cn'

export interface ProgressProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

export function Progress({ value, max = 100, label, showValue = false, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-4">
          {label ? (
            <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</span>
          ) : null}
          {showValue ? <span className="text-[12px] text-ink-on-night tabular-nums">{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 w-full overflow-hidden rounded-[999px] bg-night-wash">
        <div
          className="h-full rounded-[999px] bg-brand-green transition-[width] duration-(--motion-slow) ease-rl motion-reduce:transition-none"
          style={{
            width: `${pct}%`,
          }}
        />
      </div>
    </div>
  )
}
