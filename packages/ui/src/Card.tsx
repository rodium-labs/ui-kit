import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { ArrowUpRight } from './glyphs.js'

export interface CardProps {
  title?: ReactNode
  description?: ReactNode
  /** sits opposite the title: a tag, a status, a menu */
  action?: ReactNode
  /** fills the width above the text, edge to edge inside the border */
  media?: ReactNode
  footer?: ReactNode
  /** turns the whole card into one link rather than a box with a link in it */
  href?: string
  external?: boolean
  children?: ReactNode
  className?: string
}

// a bordered surface, not a raised one: this ground has no elevation to sit on,
// so depth comes from the hairline and from what the edge does on hover. the
// linked form is a single anchor rather than a box wrapping one, because a card
// with a link inside it gives the pointer a target smaller than the thing it
// looks like it should hit.
export function Card({
  title,
  description,
  action,
  media,
  footer,
  href,
  external = false,
  children,
  className,
}: CardProps) {
  const body = (
    <>
      {media ? <div className="-mx-px -mt-px overflow-hidden border-b border-night-rule">{media}</div> : null}
      {title || description || action ? (
        <div className="flex items-start justify-between gap-4 px-5 pt-5">
          <div className="flex min-w-0 flex-col gap-1.5">
            {title ? (
              <h3 className="flex items-center gap-1.5 text-[15px] font-semibold tracking-[-0.01em] text-ink-on-night">
                {title}
                {href ? (
                  <ArrowUpRight
                    size={13}
                    className="shrink-0 text-ink-on-night-dim"
                  />
                ) : null}
              </h3>
            ) : null}
            {description ? <p className="text-[14px] leading-[1.6] text-ink-on-night-mid">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children ? (
        <div className={cn('px-5 text-[14px] leading-[1.65] text-ink-on-night-mid', title ? 'pt-4' : 'pt-5')}>
          {children}
        </div>
      ) : null}
      <div className="h-5" />
      {footer ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-night-rule px-5 py-3.5">{footer}</div>
      ) : null}
    </>
  )

  const shell = cn(
    'flex flex-col border border-night-frame bg-transparent',
    'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
    className,
  )

  if (href === undefined) return <div className={shell}>{body}</div>

  const link: AnchorHTMLAttributes<HTMLAnchorElement> = external
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {}

  return (
    <a
      {...link}
      href={href}
      className={cn('nudge press group', shell, 'hover:border-night-edge hover:bg-night-wash', focus)}>
      {body}
    </a>
  )
}
