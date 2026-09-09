import { Eyebrow } from '@rodium/ui'
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
      className="reveal scroll-mt-28 border-t border-night-rule pt-10">
      <header className="flex flex-col gap-2">
        <Eyebrow>{id}</Eyebrow>
        <h2 className="text-display-s font-book text-ink-on-night">{title}</h2>
        {blurb ? <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink-on-night-mid">{blurb}</p> : null}
      </header>
      <div className="mt-7 flex flex-col gap-6">{children}</div>
    </section>
  )
}

export interface DemoProps {
  label?: string
  note?: string
  children: ReactNode
  className?: string
}

export function Demo({ label, note, children, className }: DemoProps) {
  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">{label}</span>
          {note ? <span className="text-[12px] text-ink-on-night-dim">{note}</span> : null}
        </div>
      ) : null}
      <div className={`rounded-[14px] border border-night-frame bg-night-raised/60 p-6 ${className ?? ''}`.trimEnd()}>
        {children}
      </div>
    </div>
  )
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ''}`.trimEnd()}>{children}</div>
}

export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-5 sm:grid-cols-2 ${className ?? ''}`.trimEnd()}>{children}</div>
}
