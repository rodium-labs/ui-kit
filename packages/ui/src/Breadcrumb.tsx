import { cn } from './cn.js'
import { focus } from './focus.js'

export interface Crumb {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: readonly Crumb[]
  className?: string
}

// the last crumb is where you are, so it is text with aria-current rather than
// a link back to the page already open.
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li
              key={item.label}
              className="flex items-center gap-x-2">
              {item.href && !last ? (
                <a
                  href={item.href}
                  className={cn(
                    'text-ink-on-night-dim transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
                    focus,
                  )}>
                  {item.label}
                </a>
              ) : (
                <span
                  {...(last
                    ? {
                        'aria-current': 'page' as const,
                      }
                    : {})}
                  className={last ? 'text-ink-on-night' : 'text-ink-on-night-dim'}>
                  {item.label}
                </span>
              )}
              {last ? null : (
                <span
                  aria-hidden="true"
                  className="text-ink-on-night-faint">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
