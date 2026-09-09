import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

export function Wrap({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn('mx-auto w-full max-w-[1120px] px-(--gutter)', className)}>
      {children}
    </div>
  )
}

export function Eyebrow({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn('text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase', className)}>
      {children}
    </p>
  )
}

export function Rule({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      {...rest}
      className={cn('border-0 border-t border-night-rule', className)}
    />
  )
}

export interface FactsProps {
  rows: readonly (readonly [
    string,
    ReactNode,
  ])[]
  className?: string
}

// label left, value right, one hairline between. the numbers are the argument.
export function Facts({ rows, className }: FactsProps) {
  return (
    <dl className={cn('grid', className)}>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-night-rule py-3">
          <dt className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</dt>
          <dd className="text-[14px] text-ink-on-night tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

// the one two-column split the kit uses. 568 is a device panel at 2x, so the
// second column lands on the same edge on every page and nothing drifts.
export const split =
  'grid gap-10 min-[900px]:grid-cols-[minmax(0,568px)_1fr] min-[900px]:items-start min-[900px]:gap-14'
