'use client'

import { type CSSProperties, type ReactNode, type SyntheticEvent, useCallback, useEffect, useRef } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { Close } from './glyphs.js'

export type SheetSide = 'start' | 'end' | 'bottom'

export interface SheetProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  side?: SheetSide
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

// start and end rather than left and right: the panel belongs to the reading
// edge, so it swaps with the writing direction instead of staying put.
const SIDE: Record<SheetSide, string> = {
  start: 'me-auto ms-0 h-dvh max-h-dvh w-[min(calc(100vw-3rem),22rem)] border-e',
  end: 'ms-auto me-0 h-dvh max-h-dvh w-[min(calc(100vw-3rem),22rem)] border-s',
  bottom: 'mt-auto mb-0 h-auto max-h-[85dvh] w-full max-w-none border-t',
}

const FROM: Record<SheetSide, string> = {
  start: '-100%',
  end: '100%',
  bottom: '0',
}

// the same browser dialog the modal uses, parked against an edge: top layer,
// focus trap, inert page and the escape key all come with it. the bottom one is
// the phone shape, which is why every side is reachable from one prop.
export function Sheet({ open, onClose, title, description, side = 'end', footer, children, className }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [
    open,
  ])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onClick = (event: MouseEvent) => {
      if (event.target === el) onClose()
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [
    onClose,
  ])

  const onCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault()
      onClose()
    },
    [
      onClose,
    ],
  )

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      onClose={onClose}
      style={
        {
          '--sheet-from': FROM[side],
        } as CSSProperties
      }
      className={cn(
        // open:flex, never a bare flex. a closed dialog is display:none from the
        // user agent sheet, and any display utility here overrides that: the
        // panel then lays out in the flow, translated a full width off the side,
        // and every page carrying one grows a clipped region nobody can reach.
        'sheet-side max-w-none flex-col border-night-edge bg-night p-0 text-ink-on-night open:flex',
        'overscroll-contain backdrop:bg-black/70 backdrop:backdrop-blur-[2px]',
        side === 'bottom' ? 'translate-y-[8%]' : '',
        SIDE[side],
        className,
      )}>
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-night-rule px-5 py-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{title}</h2>
          {description ? <p className="text-[13px] leading-[1.6] text-ink-on-night-mid">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={cn(
            'press -me-2 -mt-1.5 flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
            focus,
          )}>
          <Close size={14} />
        </button>
      </div>
      {children ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 text-[14px] leading-[1.65] text-ink-on-night-mid">
          {children}
        </div>
      ) : null}
      {footer ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-night-rule px-5 py-4">
          {footer}
        </div>
      ) : null}
    </dialog>
  )
}
