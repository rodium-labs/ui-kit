'use client'

import { type RefObject, useEffect, useState } from 'react'

/**
 * The rendered width of the box a chart sits in.
 *
 * An svg with a fixed viewBox scales everything inside it, text included, so a
 * chart that stretches to fill a column ends up with axis labels the size of a
 * heading. Measuring the box and using that as the viewBox width keeps one user
 * unit equal to one css pixel, which is the only way the type stays where it
 * was set and the gridlines stay hairlines.
 */
export function useChartWidth(ref: RefObject<HTMLElement | null>, fallback = 320): number {
  const [width, setWidth] = useState(fallback)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setWidth(Math.max(160, Math.round(el.getBoundingClientRect().width)))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [
    ref,
  ])

  return width
}
