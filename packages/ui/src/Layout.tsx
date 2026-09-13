import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn.js'

export function Wrap({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn('mx-auto w-full max-w-[1120px] px-6', className)}>
      {children}
    </div>
  )
}

// every page opens on the same box - one screen, less the bar. the grid layer
// behind it is a screen tall too, so this is also what keeps the grid from
// running on into whatever section comes next.
export function Cover({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <section {...rest}>
      <Wrap className={cn('flex min-h-[calc(100svh_-_var(--nav-h))] flex-col py-12', className)}>{children}</Wrap>
    </section>
  )
}

// the one two-column split the whole surface uses. 568 is the panel at 2x, so
// the second column lands on the same edge on every page and nothing drifts.
export const split =
  'grid gap-10 min-[900px]:grid-cols-[minmax(0,568px)_1fr] min-[900px]:items-start min-[900px]:gap-14'

// the slug above a heading. the trailing slash is the surface's own convention.
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

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** the level this heading occupies in the outline; the size does not follow it */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function Display({ as: Tag = 'h1', className, children, ...rest }: HeadingProps) {
  return (
    <Tag
      {...rest}
      className={cn('text-display font-semibold text-pretty text-ink-on-night', className)}>
      {children}
    </Tag>
  )
}

export function Title({ as: Tag = 'h2', className, children, ...rest }: HeadingProps) {
  return (
    <Tag
      {...rest}
      className={cn('text-title font-semibold text-balance text-ink-on-night', className)}>
      {children}
    </Tag>
  )
}

export function Lede({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn('max-w-[46ch] text-lede text-ink-on-night-mid', className)}>
      {children}
    </p>
  )
}

export function Body({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn('max-w-[46ch] text-body text-ink-on-night-mid', className)}>
      {children}
    </p>
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
