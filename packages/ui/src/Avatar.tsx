import { cn } from './cn'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  className?: string
}

const SIZE: Record<AvatarSize, string> = {
  sm: 'size-7 text-[11px]',
  md: 'size-9 text-[13px]',
  lg: 'size-12 text-[16px]',
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts.at(0)?.at(0) ?? ''
  const last = parts.length > 1 ? (parts.at(-1)?.at(0) ?? '') : ''
  return (first + last).toUpperCase()
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-night-frame bg-night-wash font-medium text-ink-on-night-mid select-none',
        SIZE[size],
        className,
      )}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  )
}
