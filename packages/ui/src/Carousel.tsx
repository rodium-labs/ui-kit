'use client'

import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { ChevronLeft, ChevronRight } from './glyphs.js'

export interface CarouselProps {
  label: string
  /** each child is one slide */
  children: ReactNode
  /** how wide a slide is; the last one still scrolls fully into view */
  slideWidth?: string
  className?: string
}

// the scroller is the browser's. snapping, momentum, the trackpad, the swipe
// and the keyboard all come from making it a real overflow box, so the script
// here only reports which end it has reached and nudges it one page along.
export function Carousel({ label, children, slideWidth = '17rem', className }: CarouselProps) {
  const rail = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState<{
    start: boolean
    end: boolean
  }>({
    start: true,
    end: false,
  })

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAt({
      start: el.scrollLeft <= 1,
      // rtl scrolls negative, so the distance is what matters, not the sign
      end: Math.abs(el.scrollLeft) >= max - 1,
    })
  }, [])

  useEffect(() => {
    const el = rail.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, {
      passive: true,
    })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [
    measure,
  ])

  const page = (direction: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.8, 160),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const arrow = cn(
    'press flex size-9 shrink-0 cursor-pointer items-center justify-center border border-night-edge text-ink-on-night-mid',
    'transition-colors duration-(--motion-fast) motion-reduce:transition-none',
    'hover:border-night-edge-lit hover:bg-night-wash hover:text-ink-on-night',
    'disabled:pointer-events-none disabled:opacity-35',
    focus,
  )

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('flex flex-col gap-3', className)}>
      {/* the rail takes no tab stop of its own: the two buttons below are the
          keyboard path through the slides, and anything focusable inside a
          slide scrolls itself into view when it is tabbed to */}
      <div
        ref={rail}
        className={cn(
          'flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}>
        {Children.map(children, slide => (
          <div
            style={{
              width: slideWidth,
            }}
            className="shrink-0 snap-start">
            {slide}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 self-end">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={at.start}
          aria-label="Previous slides"
          className={arrow}>
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={at.end}
          aria-label="Next slides"
          className={arrow}>
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  )
}
