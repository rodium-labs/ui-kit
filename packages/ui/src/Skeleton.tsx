import type { HTMLAttributes } from 'react'
import { cn } from './cn'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      className={cn(
        'animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--color-night-wash)_0%,rgb(255_255_255/0.12)_50%,var(--color-night-wash)_100%)] motion-reduce:animate-none',
        className,
      )}
    />
  )
}
