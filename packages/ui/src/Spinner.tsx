import { cn } from './cn'

export interface SpinnerProps {
  size?: number
  className?: string
  label?: string
}

export function Spinner({ size = 16, className, label }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn('animate-spin-rl', className)}>
      {label ? <title>{label}</title> : null}
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.25"
      />
      <path
        d="M8 1.75a6.25 6.25 0 0 1 6.25 6.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}
