import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface EmptyStateProps {
  title: ReactNode
  children?: ReactNode
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

// an empty state says what this place is, how it fills and what to do next.
// never park standing information here: it leaves the moment content arrives.
export function EmptyState({ title, children, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-start gap-3 border border-dashed border-night-edge p-8', className)}>
      {icon ? (
        <span
          aria-hidden="true"
          className="text-ink-on-night-dim">
          {icon}
        </span>
      ) : null}
      <p className="text-[15px] font-medium text-ink-on-night">{title}</p>
      {children ? <div className="max-w-[46ch] text-[14px] leading-[1.6] text-ink-on-night-mid">{children}</div> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
