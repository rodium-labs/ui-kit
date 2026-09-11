import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
  title?: string
}

const DEFAULT_SIZE = 16

interface GlyphProps extends IconProps {
  children: ReactNode
}

export function Glyph({ size = DEFAULT_SIZE, title, children, ...rest }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}
