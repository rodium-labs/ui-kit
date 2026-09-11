import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'
import { Check, Info, Warning } from './glyphs'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
}

// each tone carries an icon as well as a colour, so the meaning survives a
// monochrome print, a forced-colours mode and a reader who cannot tell the
// green from the red.
const TONE: Record<
  AlertTone,
  {
    edge: string
    ink: string
    icon: typeof Info
  }
> = {
  info: {
    edge: 'border-night-edge',
    ink: 'text-ink-on-night',
    icon: Info,
  },
  success: {
    edge: 'border-brand-green',
    ink: 'text-ink-green-on-night',
    icon: Check,
  },
  warning: {
    edge: 'border-brand-pink',
    ink: 'text-brand-pink',
    icon: Warning,
  },
  danger: {
    edge: 'border-danger',
    ink: 'text-danger',
    icon: Warning,
  },
}

export function Alert({ tone = 'info', title, className, children, ...rest }: AlertProps) {
  const { edge, ink, icon: Glyph } = TONE[tone]

  return (
    <div
      {...rest}
      // a danger alert is the only one urgent enough to interrupt
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex gap-3 border p-4', edge, className)}>
      <Glyph
        size={16}
        className={cn('mt-px shrink-0', ink)}
      />
      <div className="flex min-w-0 flex-col gap-1">
        {title ? <p className={cn('text-[14px] font-medium', ink)}>{title}</p> : null}
        {children ? <div className="text-[14px] leading-[1.6] text-ink-on-night-mid">{children}</div> : null}
      </div>
    </div>
  )
}
