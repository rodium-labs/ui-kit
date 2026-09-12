'use client'

import { type RefObject, useEffect } from 'react'

/**
 * What a native <details> does not do on its own: close when the pointer lands
 * outside it, close on escape and hand focus back, and close when a link inside
 * it is picked.
 *
 * This used to ship as a string of JavaScript in a <script> tag. React does not
 * execute a script inserted through dangerouslySetInnerHTML on the client, so
 * that version never ran anywhere but a server-rendered page.
 */
export function useMenuDismiss(ref: RefObject<HTMLDetailsElement | null>): void {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const close = () => {
      if (el.open) el.open = false
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!el.open) return
      const target = event.target
      if (target instanceof Node && el.contains(target)) return
      close()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !el.open) return
      close()
      el.querySelector('summary')?.focus()
    }

    // a pick inside the sheet is the one inside click that still closes it
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a, button:not(summary)')) close()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    el.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      el.removeEventListener('click', onClick)
    }
  }, [
    ref,
  ])
}
