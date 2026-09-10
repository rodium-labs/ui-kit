import { Eyebrow, Title } from '@rodium/ui'
import type { ReactNode } from 'react'

export interface SectionProps {
  id: string
  title: string
  blurb?: string
  children: ReactNode
}

export function Section({ id, title, blurb, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)+1.5rem)]">
      <div className="reveal">
        <Eyebrow>{id}/</Eyebrow>
        <Title className="mt-4 max-w-[20ch]">{title}</Title>
        {blurb ? <p className="mt-5 max-w-[52ch] text-body text-ink-on-night-mid">{blurb}</p> : null}
      </div>
      <div className="mt-10 flex flex-col gap-10">{children}</div>
    </section>
  )
}

export interface DemoProps {
  label: string
  note?: string
  children: ReactNode
  className?: string
}

// a demo is framed the way the site frames a device shot: one hairline, square
// corners, and the label set in the surface's own uppercase above it.
export function Demo({ label, note, children, className }: DemoProps) {
  return (
    <div className="reveal flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">{label}</span>
        {note ? <span className="text-[12px] text-ink-on-night-dim">{note}</span> : null}
      </div>
      <div className={`border border-night-frame p-6 ${className ?? ''}`.trimEnd()}>{children}</div>
    </div>
  )
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ''}`.trimEnd()}>{children}</div>
}

export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-6 sm:grid-cols-2 ${className ?? ''}`.trimEnd()}>{children}</div>
}
