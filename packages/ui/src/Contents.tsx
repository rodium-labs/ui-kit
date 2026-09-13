import { cn } from './cn.js'
import { focus } from './focus.js'

export interface ContentsItem {
  label: string
  href: string
}

export interface ContentsProps {
  items: readonly ContentsItem[]
  className?: string
}

// the way into a long page, sitting on the cover's baseline. the trailing slash
// is the same convention the eyebrows use.
export function Contents({ items, className }: ContentsProps) {
  return (
    <nav
      aria-label="On this page"
      className={cn('flex flex-wrap items-center gap-1 border-t border-night-rule pt-4', className)}>
      {items.map(item => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            'flex min-h-9 items-center px-3 text-[13px] text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
            focus,
          )}>
          {item.label}/
        </a>
      ))}
    </nav>
  )
}
