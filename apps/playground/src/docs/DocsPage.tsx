import { CodeBlock, type CodeLanguage, cn, Eyebrow, Rule, Table, Title } from '@rodium-labs/ui'
import type { ReactNode } from 'react'
import type { DocPage } from './types'

function Example({
  title,
  note,
  code,
  language,
  className,
  children,
}: {
  title: string
  note?: string
  code?: string
  language?: CodeLanguage
  className?: string
  children: ReactNode
}) {
  return (
    <section className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">{title}</h2>
        {note ? <p className="text-[12px] text-ink-on-night-dim">{note}</p> : null}
      </div>
      <div className="border border-night-frame p-6">{children}</div>
      {code ? <CodeBlock language={language ?? 'tsx'}>{code}</CodeBlock> : null}
    </section>
  )
}

// the first blocks arrive with the route on a fixed stagger; everything below
// them arrives on the scroll that reaches it. both come from the token package,
// and both carry their own reduced-motion escape.
const LANDING = [
  'rise rise-2',
  'rise rise-3',
  'rise rise-4',
] as const

export function DocsPage({ page }: { page: DocPage }) {
  const Body = page.body

  return (
    <article className="flex flex-col gap-12">
      <header className="rise rise-lead flex flex-col gap-4">
        <Eyebrow>{page.slug}/</Eyebrow>
        <Title
          as="h1"
          className="max-w-[22ch]">
          {page.title}
        </Title>
        <p className="max-w-[58ch] text-body text-ink-on-night-mid">{page.summary}</p>
      </header>

      {Body ? (
        <div className="rise rise-1">
          <Body />
        </div>
      ) : null}

      {page.examples && page.examples.length > 0 ? (
        <div className="flex flex-col gap-10">
          {page.examples.map((example, index) => (
            <Example
              key={example.title}
              title={example.title}
              note={example.note}
              code={example.code}
              language={example.language}
              className={LANDING.at(index) ?? 'reveal'}>
              {example.render()}
            </Example>
          ))}
        </div>
      ) : null}

      {page.props && page.props.length > 0 ? (
        <section className="reveal flex flex-col gap-5">
          <Rule />
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Props</h2>
          <Table
            head={[
              'prop',
              'type',
              'what it does',
            ]}
            rows={page.props}
          />
        </section>
      ) : null}

      {page.notes ? (
        <section className="reveal flex flex-col gap-5">
          <Rule />
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Notes</h2>
          <div className="flex max-w-[58ch] flex-col gap-3 text-[14px] leading-[1.65] text-ink-on-night-mid">
            {page.notes}
          </div>
        </section>
      ) : null}
    </article>
  )
}
