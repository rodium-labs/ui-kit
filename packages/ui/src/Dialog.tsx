'use client'

import { type ReactNode, type SyntheticEvent, useCallback, useEffect, useRef } from 'react'
import { cn } from './cn'
import { Close } from './glyphs'

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
        'm-auto w-[min(calc(100vw-2rem),34rem)] rounded-[14px] border border-night-frame bg-night-raised p-0 text-ink-on-night',
        'shadow-[0_32px_80px_rgb(0_0_0/0.6)] backdrop:bg-(--veil) backdrop:backdrop-blur-[2px]',
        'open:animate-sheet motion-reduce:open:animate-none',
        className,
      )}>
      <div className="flex items-start justify-between gap-4 p-5 pb-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-[17px] font-medium tracking-[-0.01em]">{title}</h2>
          {description ? <p className="text-[13px] leading-relaxed text-ink-on-night-mid">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mt-1 -mr-1 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] text-ink-on-night-dim transition-[background-color,color] duration-(--motion-fast) ease-rl hover:bg-night-wash hover:text-ink-on-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-green) motion-reduce:transition-none">
          <Close size={14} />
        </button>
      </div>
      {children ? <div className="p-5 text-[14px] leading-relaxed text-ink-on-night-mid">{children}</div> : null}
      {footer ? (
        <div className="flex items-center justify-end gap-2 border-t border-night-rule px-5 py-4">{footer}</div>
      ) : null}
    </dialog>
  )
}
