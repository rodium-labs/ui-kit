import { Avatar, type AvatarSize } from './Avatar.js'
import { cn } from './cn.js'

export interface AvatarGroupPerson {
  name: string
  src?: string
}

export interface AvatarGroupProps {
  people: readonly AvatarGroupPerson[]
  /** how many to draw before the rest become a count */
  max?: number
  size?: AvatarSize
  className?: string
}

// a row, with the overflow written as a number rather than dropped. not a
// stack: overlapping is a round-avatar idiom, where the curve of the one in
// front tells you which is in front. these are square, like everything else
// here, so overlap read as boxes wedged into each other with a seam between
// them. the kit separates with space everywhere else, and so does this.
//
// the whole group is one list with one accessible name, so a screen reader
// hears who is on it instead of five separate images in a row.
export function AvatarGroup({ people, max = 4, size = 'md', className }: AvatarGroupProps) {
  const shown = people.slice(0, max)
  const rest = people.length - shown.length
  const everyone = people.map(p => p.name).join(', ')

  return (
    <ul
      aria-label={`${people.length} people: ${everyone}`}
      className={cn('flex items-center gap-1.5', className)}>
      {shown.map(person => (
        <li key={person.name}>
          <Avatar
            name={person.name}
            src={person.src}
            size={size}
          />
        </li>
      ))}
      {rest > 0 ? (
        <li aria-hidden="true">
          <span
            className={cn(
              'inline-flex items-center justify-center border border-night-frame bg-night font-medium text-ink-on-night-dim tabular-nums',
              size === 'sm' && 'size-7 text-[11px]',
              size === 'md' && 'size-9 text-[12px]',
              size === 'lg' && 'size-12 text-[14px]',
            )}>
            +{rest}
          </span>
        </li>
      ) : null}
    </ul>
  )
}
