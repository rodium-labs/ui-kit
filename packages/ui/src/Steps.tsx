import type { CSSProperties, ReactNode } from 'react'
import { cn } from './cn.js'
import { Check } from './glyphs.js'

export interface Step {
  label: string
  description?: ReactNode
}

export interface StepsProps {
  steps: readonly Step[]
  /** which one you are on, zero based. everything before it is done. */
  current: number
  className?: string
}

// where you are in a flow that has an order. an ordered list, because the order
// is the content, and each state says which it is in words as well as in
// colour: a screen reader hears "done" and "current", not a green dot.
export function Steps({ steps, current, className }: StepsProps) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {steps.map((step, i) => {
        const done = i < current
        const here = i === current
        return (
          <li
            key={step.label}
            aria-current={here ? 'step' : undefined}
            className="relative flex gap-3 pb-6 last:pb-0">
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn('absolute top-6 bottom-0 start-[11px] w-px', done ? 'bg-brand-green' : 'bg-night-rule')}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                'relative z-10 flex size-6 shrink-0 items-center justify-center overflow-hidden border text-[11px] tabular-nums',
                'transition-colors duration-(--motion-base) ease-through motion-reduce:transition-none',
                done && 'border-brand-green bg-brand-green text-on-accent',
                here && 'border-brand-green bg-night text-ink-on-night',
                !done && !here && 'border-night-edge bg-night text-ink-on-night-dim',
              )}>
              {/* the same roll the stat's digits take: the mark it is moving to
                  slides up into the window rather than swapping in place. one
                  duration and one curve for both, so a page carrying a stat and
                  a stepper does not look like two kits. */}
              <span
                className="flex flex-col transition-transform duration-(--motion-slower) ease-through motion-reduce:transition-none"
                style={
                  {
                    transform: `translateY(-${done ? 50 : 0}%)`,
                  } as CSSProperties
                }>
                <span className="flex h-6 shrink-0 items-center justify-center">{i + 1}</span>
                <span className="flex h-6 shrink-0 items-center justify-center">
                  <Check size={11} />
                </span>
              </span>
            </span>
            <div className="flex min-w-0 flex-col gap-1 pt-0.5">
              <p className={cn('text-[14px]', here ? 'font-medium text-ink-on-night' : 'text-ink-on-night-mid')}>
                {step.label}
                <span className="sr-only">{done ? ' — done' : here ? ' — current step' : ' — not started'}</span>
              </p>
              {step.description ? (
                <p className="text-[13px] leading-[1.6] text-ink-on-night-dim">{step.description}</p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
