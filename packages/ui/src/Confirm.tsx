'use client'

import { type ReactNode, type SyntheticEvent, useCallback, useEffect, useRef } from 'react'
import { Action } from './Action.js'
import { cn } from './cn.js'

export interface ConfirmProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  title: ReactNode
  description?: ReactNode
  /** repeat the consequence here rather than writing "OK" */
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  busy?: boolean
  className?: string
}

// alertdialog rather than dialog: the question is the whole content, so a
// screen reader reads it on open instead of waiting to be walked there.
// the safe answer takes focus, and the backdrop does not dismiss: a stray click
// should not be able to answer a question about deleting something.
export function Confirm({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  busy = false,
  className,
}: ConfirmProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [
    open,
  ])

  const onDismiss = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault()
      onCancel()
    },
    [
      onCancel,
    ],
  )

  return (
    <dialog
      ref={ref}
      role="alertdialog"
      onCancel={onDismiss}
      onClose={onCancel}
      className={cn(
        'sheet-in m-auto w-[min(calc(100vw-2rem),26rem)] border border-night-edge bg-night p-0 text-ink-on-night',
        'overscroll-contain backdrop:bg-black/70 backdrop:backdrop-blur-[2px]',
        className,
      )}>
      <div className="flex flex-col gap-2 px-6 pt-6">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{title}</h2>
        {description ? <p className="text-[14px] leading-[1.65] text-ink-on-night-mid">{description}</p> : null}
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-night-rule px-6 py-4 sm:flex-row sm:justify-end sm:gap-3">
        <Action
          // the safe answer is the one the keyboard lands on
          autoFocus
          tone="quiet"
          onClick={onCancel}
          disabled={busy}>
          {cancelLabel}
        </Action>
        <Action
          tone={danger ? 'danger' : 'solid'}
          loading={busy}
          onClick={onConfirm}>
          {confirmLabel}
        </Action>
      </div>
    </dialog>
  )
}
