import { cn } from './cn'
import { focus } from './focus'

export interface SideNavItem {
  label: string
  href: string
}

export interface SideNavSection {
  title: string
  items: readonly SideNavItem[]
}

export interface SideNavProps {
  sections: readonly SideNavSection[]
  /** the href of the page being read */
  current?: string
  label?: string
  className?: string
}

// the rail is one line drawn by the group, not a border per link. a border on
// each row leaves a hole wherever the rows are spaced, which reads as a column
// of dashes rather than a rail; the rows sit flush and take their own padding.
export function SideNav({ sections, current, label = 'Sections', className }: SideNavProps) {
  return (
    <nav
      aria-label={label}
      className={cn('flex flex-col gap-7', className)}>
      {sections.map(section => (
        <div
          key={section.title}
          className="flex flex-col">
          <h2 className="mb-2 text-[11px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">
            {section.title}
          </h2>
          <div className="flex flex-col border-s border-night-rule">
            {section.items.map(item => {
              const here = item.href === current
              return (
                <a
                  key={item.href}
                  href={item.href}
                  {...(here
                    ? {
                        'aria-current': 'page' as const,
                      }
                    : {})}
                  className={cn(
                    'relative flex min-h-8 items-center ps-4 text-[13px]',
                    'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
                    here ? 'font-medium text-ink-on-night' : 'text-ink-on-night-dim hover:text-ink-on-night',
                    focus,
                  )}>
                  {/* the marker sits on the rail rather than replacing it, so the
                      line never breaks as the reader moves between pages */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-y-0 -start-px w-px transition-colors duration-(--motion-fast) motion-reduce:transition-none',
                      here ? 'bg-brand-green' : 'bg-transparent',
                    )}
                  />
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
