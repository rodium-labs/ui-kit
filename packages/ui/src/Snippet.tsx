'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { Check } from './glyphs.js'

export interface SnippetProps {
  /** the thing to copy, which is also the thing shown */
  value: string
  /** what it is, for the copy button's name */
  label?: string
  className?: string
}

// one line you are meant to take away with you. the button says what happened
// in words as well as by swapping its glyph, and it says it in a live region,
// because a tick that only appears is a state change carried by nothing but a
// picture.
export function Snippet({ value, label = 'value', className }: SnippetProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // a denied clipboard is not worth an error state: the text is on screen
      // and selectable, which is the fallback the user already has
    }
  }

  return (
    <div className={cn('flex items-stretch border border-night-frame', className)}>
      <code className="min-w-0 flex-1 overflow-x-auto px-3 py-2.5 font-mono text-[13px] whitespace-pre text-ink-on-night">
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={cn(
          'press flex w-11 shrink-0 cursor-pointer items-center justify-center border-s border-night-frame text-ink-on-night-dim',
          'transition-colors duration-(--motion-fast) hover:bg-night-wash hover:text-ink-on-night motion-reduce:transition-none',
          focus,
        )}>
        {copied ? (
          <Check
            size={13}
            className="text-brand-green"
          />
        ) : (
          <svg
            width={13}
            height={13}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
            focusable="false">
            <path d="M5.5 5.5 H13 V13 H5.5 Z" />
            <path d="M10.5 5.5 V3 H3 V10.5 H5.5" />
          </svg>
        )}
      </button>
      <output className="sr-only">{copied ? 'Copied' : ''}</output>
    </div>
  )
}
