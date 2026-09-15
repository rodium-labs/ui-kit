import type { ReactNode } from 'react'
import { cn } from './cn.js'

export type TimelineTone = 'accent' | 'neutral' | 'warm' | 'danger'

export interface TimelineEvent {
  title: ReactNode
  /** when it happened: a date, a time, a version */
  meta?: ReactNode
  description?: ReactNode
  tone?: TimelineTone
}

export interface TimelineProps {
  events: readonly TimelineEvent[]
  className?: string
}

const TONE: Record<TimelineTone, string> = {
  accent: 'bg-brand-green',
  neutral: 'bg-night-edge-lit',
  warm: 'bg-brand-pink',
  danger: 'bg-danger',
}

// an ordered list, because the order is the content. the rail is a border on
// the list rather than a line drawn per item: one continuous edge instead of a
// stack of segments that leave seams where the items meet.
export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={cn('relative ms-[3px] flex flex-col border-s border-night-rule', className)}>
      {events.map((event, index) => (
        <li
          key={`${String(event.title)}-${index}`}
          className="relative ps-6 pb-7 last:pb-0">
          <span
            aria-hidden="true"
            className={cn('absolute -start-[3.5px] top-[6px] size-[7px]', TONE[event.tone ?? 'neutral'])}
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-[14px] font-medium text-ink-on-night">{event.title}</p>
            {event.meta ? <p className="text-[12px] text-ink-on-night-dim tabular-nums">{event.meta}</p> : null}
          </div>
          {event.description ? (
            <p className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.65] text-ink-on-night-mid">{event.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
