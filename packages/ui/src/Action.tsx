import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Arrow } from './Arrow.js'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { Spinner } from './Spinner.js'

export type ActionTone = 'solid' | 'quiet' | 'ghost' | 'danger'
export type ActionSize = 'sm' | 'md'

interface ActionOwnProps {
  tone?: ActionTone
  size?: ActionSize
  arrow?: boolean
  loading?: boolean
  icon?: ReactNode
  full?: boolean
  children?: ReactNode
  className?: string
}

type ButtonActionProps = ActionOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ActionOwnProps> & {
    href?: undefined
  }

type LinkActionProps = ActionOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ActionOwnProps> & {
    href: string
    external?: boolean
  }

export type ActionProps = ButtonActionProps | LinkActionProps

const SIZE: Record<ActionSize, string> = {
  sm: 'min-h-9 gap-1.5 px-3.5 text-[13px]',
  md: 'min-h-11 gap-2 px-5 text-[14px]',
}

// the solid one carries a border it never paints: forced colours throw the
// fill away, and without an edge the primary action stops looking like one.
const TONE: Record<ActionTone, string> = {
  solid: 'border border-transparent bg-ink-on-night text-night hover:bg-ink-on-night/85',
  quiet: 'border border-night-edge text-ink-on-night hover:border-night-edge-lit hover:bg-night-wash',
  ghost: 'border border-transparent text-ink-on-night-mid hover:text-ink-on-night hover:bg-night-wash',
  danger: 'border border-transparent bg-danger text-night hover:bg-danger/85',
}

export function Action(props: ActionProps) {
  const { tone = 'solid', size = 'md', loading = false, icon, full = false, className, children } = props
  const arrow = props.arrow ?? props.href !== undefined

  const shell = cn(
    'nudge press inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap',
    'transition-colors duration-(--motion-fast)',
    'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
    'motion-reduce:transition-none',
    SIZE[size],
    TONE[tone],
    full && 'w-full',
    focus,
    className,
  )

  const body = (
    <>
      {loading ? <Spinner size={size === 'sm' ? 13 : 14} /> : icon}
      {children}
      {arrow ? <Arrow size={size === 'sm' ? 12 : 14} /> : null}
    </>
  )

  if (props.href !== undefined) {
    const { external = false, tone: _t, size: _s, arrow: _a, loading: _l, icon: _i, full: _f, ...rest } = props
    return (
      <a
        {...rest}
        {...(external
          ? {
              target: '_blank',
              rel: 'noreferrer',
            }
          : {})}
        aria-busy={loading || undefined}
        className={shell}>
        {body}
      </a>
    )
  }

  const { type = 'button', disabled, tone: _t, size: _s, arrow: _a, loading: _l, icon: _i, full: _f, ...rest } = props
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={shell}>
      {body}
    </button>
  )
}
