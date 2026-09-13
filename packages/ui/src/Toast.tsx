'use client'

import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { Arrow } from './Arrow.js'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { Close } from './glyphs.js'

export interface ToastProps {
  title: ReactNode
  children?: ReactNode
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  /** ms before it leaves on its own. Ignored when it carries an action. */
  duration?: number
  className?: string
}

const DEFAULT_DURATION = 5000
const LEAVE_MS = 180

export function Toast({
  title,
  children,
  actionLabel,
  onAction,
  onDismiss,
  duration = DEFAULT_DURATION,
  className,
}: ToastProps) {
  const [leaving, setLeaving] = useState(false)
  const [held, setHeld] = useState(false)

  const leave = useCallback(() => {
    if (!onDismiss) return
    setLeaving(true)
    window.setTimeout(onDismiss, LEAVE_MS)
  }, [
    onDismiss,
  ])

  // a toast carrying an action has to wait for the reader to take it, and one
  // with no way to dismiss it has nothing to time out to.
  const times = onDismiss !== undefined && actionLabel === undefined && duration > 0

  // the pointer resting on it, or focus landing inside it, holds it open
  useEffect(() => {
    if (!times || held || leaving) return
    const timer = window.setTimeout(leave, duration)
    return () => window.clearTimeout(timer)
  }, [
    times,
    held,
    leaving,
    duration,
    leave,
  ])

  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
      }}
      className={cn(
        'flex items-start gap-4 border border-night-edge bg-night p-4 shadow-[0_18px_40px_rgb(0_0_0/0.6)]',
        leaving ? 'toast-out' : 'toast-in',
        className,
      )}>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-[14px] font-medium text-ink-on-night">{title}</p>
        {children ? <div className="text-[13px] leading-[1.6] text-ink-on-night-mid">{children}</div> : null}
      </div>
      <div className="ms-auto flex shrink-0 items-center gap-1">
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'press nudge flex min-h-9 items-center gap-1.5 px-2 text-[13px] font-medium text-ink-on-night transition-colors duration-(--motion-fast) hover:bg-night-wash motion-reduce:transition-none',
              focus,
            )}>
            {actionLabel}
            <Arrow size={12} />
          </button>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={leave}
            aria-label="Dismiss"
            className={cn(
              'press flex size-9 shrink-0 items-center justify-center text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
              focus,
            )}>
            <Close size={13} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export interface ToastRegionProps {
  children?: ReactNode
  label?: string
  className?: string
}

// the region is rendered whether or not it holds anything, because a live
// region inserted at the same moment as its text is announced unreliably.
export function ToastRegion({ children, label = 'Notifications', className }: ToastRegionProps) {
  return (
    <output
      aria-live="polite"
      aria-label={label}
      className={cn(
        'pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:inset-x-auto sm:end-6 sm:bottom-6 sm:w-[22rem]',
        className,
      )}>
      <div className="pointer-events-auto flex flex-col gap-2">{children}</div>
    </output>
  )
}
