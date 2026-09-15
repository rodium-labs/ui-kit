'use client'

import { type RefObject, useEffect } from 'react'

const MARGIN = 16

/**
 * Pulls an anchored panel back inside the viewport.
 *
 * A panel positioned against its trigger has no way to know how much room is
 * left beside it, and css cannot express "as wide as the space on that side".
 * On a narrow screen that leaves a panel hanging past an edge, where the page
 * clips it rather than scrolling to it. This measures once per open, and
 * clears itself on close.
 */
export function useEdgeShift(ref: RefObject<HTMLDetailsElement | null>): void {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const place = () => {
      const panel = el.querySelector<HTMLElement>(':scope > .sheet')
      if (!panel) return
      if (!el.open) {
        panel.style.transform = ''
        return
      }
      panel.style.transform = ''
      const box = panel.getBoundingClientRect()
      const room = document.documentElement.clientWidth
      const past = box.right - (room - MARGIN)
      const before = MARGIN - box.left
      // only one of these can be positive on a panel narrower than the viewport
      const shift = past > 0 ? -past : before > 0 ? before : 0
      // transform rather than translate: the open animation in the token
      // package owns translate on this element and would overwrite it
      if (shift !== 0) panel.style.transform = `translateX(${Math.round(shift)}px)`
    }

    el.addEventListener('toggle', place)
    window.addEventListener('resize', place)
    return () => {
      el.removeEventListener('toggle', place)
      window.removeEventListener('resize', place)
    }
  }, [
    ref,
  ])
}
