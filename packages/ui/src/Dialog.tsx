'use client'

import { type ReactNode, type SyntheticEvent, useCallback, useEffect, useRef } from 'react'
import { cn } from './cn'
import { focus } from './focus'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

// the browser's own dialog: it takes the top layer, the focus trap, the inert
// page behind it and the escape key, none of which are worth rebuilding.
export function Dialog({ open, onClose, title, description, footer, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [
    open,
  ])

  // a click that lands on the dialog itself landed on the backdrop, because
  // every visible part of the sheet is a child of it. bound here rather than as
  // a prop: the backdrop is not a control, and escape already closes it.
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
      className={cn(
        'm-auto w-[min(calc(100vw-2rem),34rem)] border border-night-edge bg-night p-0 text-ink-on-night',
        'overscroll-contain backdrop:bg-black/70 backdrop:backdrop-blur-[2px]',
        'sheet-in',
        className,
      )}>
      <div className="flex items-start justify-between gap-4 border-b border-night-rule px-6 py-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-[20px] font-semibold tracking-[-0.01em]">{title}</h2>
          {description ? <p className="text-[14px] leading-[1.6] text-ink-on-night-mid">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={cn(
            'press -me-2 -mt-2 flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
            focus,
          )}>
          <svg
            width={14}
            height={14}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="square"
            aria-hidden="true"
            focusable="false">
            <path d="M4 4 L12 12" />
            <path d="M12 4 L4 12" />
          </svg>
        </button>
      </div>
      {children ? <div className="px-6 py-5 text-[15px] leading-[1.65] text-ink-on-night-mid">{children}</div> : null}
      {footer ? (
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-night-rule px-6 py-4">
          {footer}
        </div>
      ) : null}
    </dialog>
  )
}
