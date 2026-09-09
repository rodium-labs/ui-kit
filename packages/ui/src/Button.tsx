import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'
import { Glass } from './Glass'
import { Spinner } from './Spinner'

export type ButtonTone = 'solid' | 'accent' | 'quiet' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonOwnProps {
  tone?: ButtonTone
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  trailing?: ReactNode
  full?: boolean
  children?: ReactNode
  className?: string
}

type NativeButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined
  }

type LinkButtonProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string
    external?: boolean
  }

export type ButtonProps = NativeButtonProps | LinkButtonProps

const RADIUS: Record<ButtonSize, number> = {
  sm: 8,
  md: 10,
  lg: 12,
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 rounded-[8px] px-3 text-[13px]',
  md: 'h-11 gap-2 rounded-[10px] px-4 text-[14px]',
  lg: 'h-12 gap-2 rounded-[12px] px-5 text-[15px]',
}

// solid carries a border it never paints: forced colours throw the fill away,
// and without an edge the primary action stops looking like one.
const TONE: Record<ButtonTone, string> = {
  solid: 'border border-transparent bg-ink-on-night text-night hover:bg-ink-on-night/85',
  accent:
    'font-semibold text-ink-on-night [--glass-specular:var(--accent-neon)] hover:[--glass-specular:var(--accent-neon-hover)] hover:[--accent-fill:var(--accent-fill-hover)]',
  quiet: 'border border-night-edge text-ink-on-night hover:border-night-edge-lit hover:bg-night-wash',
  ghost: 'text-ink-on-night hover:[--chip:var(--chip-hover)]',
  danger: 'border border-transparent bg-danger text-ink-on-night hover:bg-danger-lit',
}

const GLASS_FILL: Partial<Record<ButtonTone, string>> = {
  accent: 'var(--accent-fill)',
  ghost: 'var(--chip)',
}

export function Button(props: ButtonProps) {
  const { tone = 'solid', size = 'md', loading = false, icon, trailing, full = false, className, children } = props

  const fill = GLASS_FILL[tone]

  const shell = cn(
    'group relative isolate inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap',
    'transition-[translate,scale,background-color,border-color,color] duration-(--motion-base) ease-rl',
    'hover:[--glass-specular:var(--glass-specular-hover)] hover:-translate-y-px',
    'active:translate-y-0 active:scale-[0.97]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-green)',
    'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
    'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
    SIZE[size],
    TONE[tone],
    full && 'w-full',
    className,
  )

  const body = (
    <>
      {fill ? (
        <Glass
          radius={RADIUS[size]}
          fill={fill}
          sweep
          nested
        />
      ) : null}
      {loading ? (
        <Spinner
          size={size === 'lg' ? 18 : 16}
          className="shrink-0"
        />
      ) : (
        icon
      )}
      {children}
      {trailing}
    </>
  )

  if (props.href !== undefined) {
    const { external = false, tone: _t, size: _s, loading: _l, icon: _i, trailing: _tr, full: _f, ...rest } = props
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

  const {
    type = 'button',
    disabled,
    tone: _t,
    size: _s,
    loading: _l,
    icon: _i,
    trailing: _tr,
    full: _f,
    ...rest
  } = props
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
