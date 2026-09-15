'use client'

import { type ReactNode, useState } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { Close, Info, Warning } from './glyphs.js'

export type BannerTone = 'info' | 'warm' | 'danger'

export interface BannerProps {
  tone?: BannerTone
  children: ReactNode
  /** sits at the trailing end: a link, an action */
  action?: ReactNode
  /** adds a dismiss button; the banner removes itself */
  dismissible?: boolean
  className?: string
}

const TONE: Record<
  BannerTone,
  {
    edge: string
    ink: string
    word: string
  }
> = {
  info: {
    edge: 'border-night-edge',
    ink: 'text-ink-on-night-mid',
    word: 'Notice',
  },
  warm: {
    edge: 'border-brand-pink/40',
    ink: 'text-ink-on-night-mid',
    word: 'Warning',
  },
  danger: {
    edge: 'border-danger/50',
    ink: 'text-ink-on-night-mid',
    word: 'Error',
  },
}

// the page-wide version of Alert: full width, at the top, about the whole
// screen rather than one field. the tone is named in a visually hidden word as
// well as drawn, because a colour on an edge is not something everyone reads.
export function Banner({ tone = 'info', children, action, dismissible = false, className }: BannerProps) {
  const [gone, setGone] = useState(false)
  if (gone) return null
  const skin = TONE[tone]

  return (
    <output
      className={cn(
        'block',
        'flex w-full flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-3',
        skin.edge,
        className,
      )}>
      <span
        aria-hidden="true"
        className={cn('flex shrink-0', tone === 'info' ? 'text-ink-on-night-dim' : 'text-ink-on-night-mid')}>
        {tone === 'info' ? <Info size={14} /> : <Warning size={14} />}
      </span>
      <p className={cn('min-w-0 flex-1 text-[13px] leading-[1.6]', skin.ink)}>
        <span className="sr-only">{skin.word}: </span>
        {children}
      </p>
      {action ? <span className="shrink-0">{action}</span> : null}
      {dismissible ? (
        <button
          type="button"
          onClick={() => setGone(true)}
          aria-label="Dismiss"
          className={cn(
            'press -me-1 flex size-8 shrink-0 cursor-pointer items-center justify-center text-ink-on-night-dim',
            'transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
            focus,
          )}>
          <Close size={12} />
        </button>
      ) : null}
    </output>
  )
}
