import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface ChartFrameProps {
  title: string
  /** the one line that says what is plotted and over what */
  caption?: ReactNode
  /** rendered under the plot; omit for a single series, which the title names */
  legend?: ReactNode
  /** the same numbers as a table, so nothing is gated behind seeing the chart */
  table?: ReactNode
  children: ReactNode
  className?: string
}

// every chart wears this: a heading, the plot, and the same figures written out.
// the table is not a fallback, it is the other half of the chart - a reader
// using a screen reader, or printing it, or checking a number against a total,
// all end up there.
export function ChartFrame({ title, caption, legend, table, children, className }: ChartFrameProps) {
  return (
    <figure className={cn('m-0 flex flex-col gap-3', className)}>
      <figcaption className="flex flex-col gap-1">
        <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{title}</span>
        {caption ? <span className="text-[13px] leading-[1.5] text-ink-on-night-mid">{caption}</span> : null}
      </figcaption>
      {children}
      {legend}
      {table ? (
        <details className="fold group">
          <summary className="flex min-h-8 cursor-pointer list-none items-center gap-1.5 text-[12px] text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night [&::-webkit-details-marker]:hidden motion-reduce:transition-none">
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-(--motion-base) ease-through group-open:rotate-90 motion-reduce:transition-none">
              ›
            </span>
            The figures
          </summary>
          <div className="pt-2">{table}</div>
        </details>
      ) : null}
    </figure>
  )
}
