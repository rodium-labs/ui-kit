import type { CSSProperties, ReactNode } from 'react'
import { cn } from './cn.js'

export interface AspectRatioProps {
  /** width over height: 16 / 9, or the number 1.777 */
  ratio?: number
  children: ReactNode
  className?: string
}

// holds the box before the media arrives, so nothing below it moves when the
// image decodes. the css property does the work; this only names the shape.
export function AspectRatio({ ratio = 16 / 9, children, className }: AspectRatioProps) {
  return (
    <div
      style={
        {
          aspectRatio: String(ratio),
        } as CSSProperties
      }
      className={cn('w-full overflow-hidden [&>img]:size-full [&>img]:object-cover [&>video]:size-full', className)}>
      {children}
    </div>
  )
}
