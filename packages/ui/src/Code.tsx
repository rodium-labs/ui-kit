import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

export type CodeProps = HTMLAttributes<HTMLElement>

export function Code({ className, children, ...rest }: CodeProps) {
  return (
    <code
      {...rest}
      className={cn('border border-night-frame px-1.5 py-0.5 font-mono text-[13px] text-ink-on-night', className)}>
      {children}
    </code>
  )
}

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  caption?: string
  children: ReactNode
}

// the block wraps rather than scrolls. a scrolling block hides the end of a
// long line and has to become a focusable region to give it back; wrapping
// costs a little beauty and hides nothing at any width.
export function CodeBlock({ caption, className, children, ...rest }: CodeBlockProps) {
  return (
    <figure className="flex flex-col">
      {caption ? (
        <figcaption className="border border-b-0 border-night-frame px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-ink-on-night-dim uppercase">
          {caption}
        </figcaption>
      ) : null}
      <pre
        {...rest}
        className={cn(
          'border border-night-frame p-4 font-mono text-[13px] leading-[1.7] whitespace-pre-wrap text-ink-on-night-mid',
          '[overflow-wrap:anywhere]',
          className,
        )}>
        {children}
      </pre>
    </figure>
  )
}
