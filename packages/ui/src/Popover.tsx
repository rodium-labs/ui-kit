'use client'

import { type ReactNode, useRef } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { useEdgeShift } from './useEdgeShift.js'
import { useMenuDismiss } from './useMenuDismiss.js'

export type PopoverAlign = 'start' | 'end'

export interface PopoverProps {
  /** what opens it: text, or a whole element when you want your own trigger */
  label: ReactNode
  align?: PopoverAlign
  /** width of the panel. it is clamped to the viewport on top of this, but an
   *  anchored panel wider than the space beside its trigger still runs past the
   *  edge on a narrow screen: 15rem is what fits at 320px from anywhere. */
  width?: string
  children: ReactNode
  className?: string
  panelClassName?: string
}

const ALIGN: Record<PopoverAlign, string> = {
  start: 'start-0',
  end: 'end-0',
}

// the disclosure the browser already has. Menu carries a list of commands;
// this carries whatever you put in it, which is the only difference between
// them. the dismiss hook closes it on escape and on a pointer landing outside.
export function Popover({
  label,
  align = 'start',
  width = '15rem',
  children,
  className,
  panelClassName,
}: PopoverProps) {
  const ref = useRef<HTMLDetailsElement>(null)
  useMenuDismiss(ref)
  useEdgeShift(ref)

  return (
    <details
      ref={ref}
      className={cn('menu group relative inline-block', className)}>
      <summary
        className={cn(
          'flex min-h-9 cursor-pointer list-none items-center gap-2 border border-night-edge px-3 text-[13px] font-medium text-ink-on-night',
          'transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash',
          'group-open:border-night-edge-lit group-open:bg-night-wash',
          '[&::-webkit-details-marker]:hidden motion-reduce:transition-none',
          focus,
        )}>
        {label}
      </summary>
      <div
        style={{
          width,
        }}
        className={cn(
          'sheet absolute top-[calc(100%+6px)] z-40 max-w-[calc(100vw-2rem)] border border-night-edge bg-night p-4',
          'text-[13px] leading-[1.65] text-ink-on-night-mid shadow-[0_18px_44px_rgb(0_0_0/0.7)]',
          ALIGN[align],
          panelClassName,
        )}>
        {children}
      </div>
    </details>
  )
}
