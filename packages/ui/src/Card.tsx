import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'
import { Glass } from './Glass'

export type CardTone = 'flat' | 'raised' | 'glass'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone
  children?: ReactNode
}

const CARD_RADIUS = 14

const TONE: Record<CardTone, string> = {
  flat: 'border border-night-frame bg-night',
  raised: 'border border-night-frame bg-night-raised shadow-[0_18px_40px_rgb(0_0_0/0.45)]',
  glass: 'text-ink-on-night',
}

export function Card({ tone = 'flat', className, children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn('relative isolate rounded-[14px]', TONE[tone], className)}>
      {tone === 'glass' ? (
        <Glass
          radius={CARD_RADIUS}
          fill="var(--chip)"
        />
      ) : null}
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn('flex flex-col gap-1 p-5 pb-0', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...rest}
      className={cn('text-[15px] font-medium tracking-[-0.01em] text-ink-on-night', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn('text-[13px] leading-relaxed text-ink-on-night-mid', className)}>
      {children}
    </p>
  )
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn('p-5', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn('flex items-center gap-2 border-t border-night-rule px-5 py-4', className)}>
      {children}
    </div>
  )
}
