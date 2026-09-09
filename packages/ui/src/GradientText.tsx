import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

export type GradientDirection = 'horizontal' | 'vertical' | 'diagonal'

export interface GradientTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  colors?: readonly string[]
  speed?: number
  direction?: GradientDirection
  animate?: boolean
  children: ReactNode
}

const ANGLE: Record<GradientDirection, string> = {
  horizontal: 'to right',
  vertical: 'to bottom',
  diagonal: 'to bottom right',
}

const SIZE: Record<GradientDirection, string> = {
  horizontal: '300% 100%',
  vertical: '100% 300%',
  diagonal: '300% 300%',
}

const DEFAULT_COLORS = [
  '#12a776',
  '#ff95f8',
  '#12a776',
] as const

// the sweep runs as a background-position animation, so the whole effect costs
// one paint and never touches layout.
export function GradientText({
  colors = DEFAULT_COLORS,
  speed = 8,
  direction = 'horizontal',
  animate = true,
  className,
  children,
  style,
  ...rest
}: GradientTextProps) {
  const stops = [
    ...colors,
    colors.at(0) ?? '#ffffff',
  ].join(', ')

  const paint = {
    backgroundImage: `linear-gradient(${ANGLE[direction]}, ${stops})`,
    backgroundSize: SIZE[direction],
    '--rl-pan-duration': `${speed}s`,
    ...style,
  } as CSSProperties

  return (
    <span
      {...rest}
      className={cn('bg-clip-text text-transparent', animate && 'animate-pan motion-reduce:animate-none', className)}
      style={paint}>
      {children}
    </span>
  )
}
