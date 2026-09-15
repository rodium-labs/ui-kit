'use client'

import { type DragEvent, type ReactNode, useId, useState } from 'react'
import { cn } from './cn.js'

export interface FileDropProps {
  label: ReactNode
  hint?: ReactNode
  /** what the input accepts, in the same form the attribute takes */
  accept?: string
  multiple?: boolean
  onFiles: (files: readonly File[]) => void
  disabled?: boolean
  className?: string
}

// a real file input wearing a drop target. dragging is the shortcut and the
// input is the path: click, tab and enter all reach it, which dropping alone
// never does. the label wraps it, so the whole area is the control rather than
// a box with a hidden input somewhere inside.
export function FileDrop({
  label,
  hint,
  accept,
  multiple = false,
  onFiles,
  disabled = false,
  className,
}: FileDropProps) {
  const id = useId()
  const [over, setOver] = useState(false)

  const drop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setOver(false)
    if (disabled) return
    const files = [
      ...event.dataTransfer.files,
    ]
    if (files.length > 0) onFiles(multiple ? files : files.slice(0, 1))
  }

  return (
    <label
      htmlFor={id}
      onDragOver={event => {
        event.preventDefault()
        if (!disabled) setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
      className={cn(
        'flex cursor-pointer flex-col items-center gap-1.5 border border-dashed px-6 py-8 text-center',
        'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-(--color-brand-green)',
        over ? 'border-brand-green bg-night-wash' : 'border-night-edge hover:border-night-edge-lit hover:bg-night-wash',
        disabled && 'pointer-events-none opacity-45',
        className,
      )}>
      <svg
        width={20}
        height={20}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        aria-hidden="true"
        focusable="false"
        className="text-ink-on-night-dim">
        <path d="M8 11 V3" />
        <path d="M5 6 L8 3 L11 6" />
        <path d="M2.5 10.5 V13 H13.5 V10.5" />
      </svg>
      <span className="text-[14px] font-medium text-ink-on-night">{label}</span>
      {hint ? <span className="text-[12px] text-ink-on-night-dim">{hint}</span> : null}
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={event => {
          const files = [
            ...(event.currentTarget.files ?? []),
          ]
          if (files.length > 0) onFiles(files)
        }}
        className="sr-only"
      />
    </label>
  )
}
