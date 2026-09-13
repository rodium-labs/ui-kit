import type { ReactNode } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'

export interface AccordionItem {
  value: string
  title: ReactNode
  content: ReactNode
}

export interface AccordionProps {
  items: readonly AccordionItem[]
  single?: boolean
  name?: string
  className?: string
}

// the browser's own disclosure. a shared name makes the group exclusive without
// a line of script, and the marker is replaced rather than re-implemented.
export function Accordion({ items, single = false, name, className }: AccordionProps) {
  return (
    <div className={cn('border-t border-night-rule', className)}>
      {items.map(item => (
        <details
          key={item.value}
          {...(single
            ? {
                name: name ?? 'accordion',
              }
            : {})}
          className="fold group border-b border-night-rule">
          <summary
            className={cn(
              'flex cursor-pointer list-none items-center gap-4 py-4 text-[15px] font-medium text-ink-on-night [&::-webkit-details-marker]:hidden',
              focus,
            )}>
            {item.title}
            <svg
              width={14}
              height={14}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="square"
              aria-hidden="true"
              focusable="false"
              className="ms-auto shrink-0 text-ink-on-night-dim transition-transform duration-(--motion-base) ease-rl group-open:-rotate-180 motion-reduce:transition-none">
              <path d="M4 6.5 L8 10.5 L12 6.5" />
            </svg>
          </summary>
          <div className="pb-5 text-[14px] leading-[1.65] text-ink-on-night-mid">{item.content}</div>
        </details>
      ))}
    </div>
  )
}
