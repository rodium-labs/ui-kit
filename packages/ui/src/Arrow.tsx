export interface ArrowProps {
  size?: number
  className?: string
}

export function Arrow({ size = 14, className = '' }: ArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`.trim()}>
      <path d="M4 12 L12 4" />
      <path d="M5 4 H12 V11" />
    </svg>
  )
}
