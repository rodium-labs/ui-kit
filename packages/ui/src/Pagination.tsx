import { cn } from './cn.js'
import { focus } from './focus.js'
import { ChevronLeft, ChevronRight } from './glyphs.js'

export interface PaginationProps {
  page: number
  pages: number
  onPageChange: (page: number) => void
  className?: string
}

const STEP =
  'flex size-9 shrink-0 items-center justify-center border border-night-edge text-ink-on-night transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none'

// a window of at most five, so the row never grows past its column
function pageWindow(page: number, pages: number): number[] {
  const span = Math.min(5, pages)
  const first = Math.min(Math.max(1, page - 2), Math.max(1, pages - span + 1))
  return Array.from(
    {
      length: span,
    },
    (_, i) => first + i,
  )
}

export function Pagination({ page, pages, onPageChange, className }: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      // wraps rather than running off the edge: the row is shrink-0 buttons, and
      // the page clips its overflow, so an unwrapped row puts the next-page
      // control somewhere no pointer and no scroll can reach on a narrow screen.
      className={cn('flex flex-wrap items-center gap-1.5', className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={cn('press', STEP, focus)}>
        <ChevronLeft size={13} />
      </button>
      {pageWindow(page, pages).map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onPageChange(n)}
          {...(n === page
            ? {
                'aria-current': 'page' as const,
              }
            : {})}
          className={cn(
            'press flex size-9 shrink-0 items-center justify-center border text-[13px] tabular-nums transition-colors duration-(--motion-fast) motion-reduce:transition-none',
            // the page you are on is a state, not the primary action, and the
            // solid white fill is what Action's solid tone wears
            n === page
              ? 'border-transparent bg-brand-green font-medium text-on-accent'
              : 'border-night-edge text-ink-on-night-mid hover:border-night-edge-lit hover:bg-night-wash hover:text-ink-on-night',
            focus,
          )}>
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        aria-label="Next page"
        className={cn('press', STEP, focus)}>
        <ChevronRight size={13} />
      </button>
    </nav>
  )
}
