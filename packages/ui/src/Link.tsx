import type { AnchorHTMLAttributes } from 'react'
import { Arrow } from './Arrow'
import { cn } from './cn'
import { focus } from './focus'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
}

// a link in running text stays underlined: inside a paragraph, colour alone is
// not enough to tell one apart. the metrics come from the font rather than from
// wherever the browser would have put the line.
export function Link({ external = false, className, children, ...rest }: LinkProps) {
  return (
    <a
      {...rest}
      {...(external
        ? {
            target: '_blank',
            rel: 'noreferrer',
          }
        : {})}
      className={cn(
        'nudge inline-flex items-center gap-1 text-ink-on-night underline decoration-from-font underline-offset-[0.18em]',
        'decoration-night-underline transition-colors duration-(--motion-fast) hover:decoration-current',
        'motion-reduce:transition-none',
        focus,
        className,
      )}>
      {children}
      {external ? <Arrow size={12} /> : null}
    </a>
  )
}
