import { CodeBlock, type CodeLanguage, Eyebrow, Rule, Table, Title } from '@rodium/ui'
import type { ReactNode } from 'react'
import type { DocPage } from './types'

function Example({
  title,
  note,
  code,
  language,
  children,
}: {
  title: string
  note?: string
  code?: string
  language?: CodeLanguage
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">{title}</h3>
        {note ? <p className="text-[12px] text-ink-on-night-dim">{note}</p> : null}
      </div>
      <div className="border border-night-frame p-6">{children}</div>
      {code ? <CodeBlock language={language ?? 'tsx'}>{code}</CodeBlock> : null}
    </section>
  )
}

export function DocsPage({ page }: { page: DocPage }) {
  const Body = page.body

  return (
    <article className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <Eyebrow>{page.slug}/</Eyebrow>
        <Title className="max-w-[22ch]">{page.title}</Title>
        <p className="max-w-[58ch] text-body text-ink-on-night-mid">{page.summary}</p>
      </header>

      {Body ? <Body /> : null}

      {page.examples && page.examples.length > 0 ? (
        <div className="flex flex-col gap-10">
          {page.examples.map(example => (
            <Example
              key={example.title}
              title={example.title}
              note={example.note}
              code={example.code}
              language={example.language}>
              {example.render()}
            </Example>
          ))}
        </div>
      ) : null}

      {page.props && page.props.length > 0 ? (
        <section className="flex flex-col gap-5">
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
        <section className="flex flex-col gap-5">
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
