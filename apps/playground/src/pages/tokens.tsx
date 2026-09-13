import { Facts, Rule, Table } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

interface Swatch {
  name: string
  value: string
  note: string
}

const BRAND: readonly Swatch[] = [
  {
    name: 'brand-green',
    value: 'var(--color-brand-green)',
    note: '#12a776 · the accent',
  },
  {
    name: 'brand-pink',
    value: 'var(--color-brand-pink)',
    note: '#ff95f8 · the warm one',
  },
  {
    name: 'ink-green-on-night',
    value: 'var(--color-ink-green-on-night)',
    note: '#41b991 · green as text',
  },
  {
    name: 'danger',
    value: 'var(--color-danger)',
    note: '#ff6369 · destructive',
  },
]

const INK: readonly Swatch[] = [
  {
    name: 'ink-on-night',
    value: 'var(--color-ink-on-night)',
    note: 'headings, links, values',
  },
  {
    name: 'ink-on-night-mid',
    value: 'var(--color-ink-on-night-mid)',
    note: 'body copy',
  },
  {
    name: 'ink-on-night-dim',
    value: 'var(--color-ink-on-night-dim)',
    note: 'labels, dates, captions',
  },
  {
    name: 'ink-on-night-faint',
    value: 'var(--color-ink-on-night-faint)',
    note: 'decoration only',
  },
]

const LINES: readonly Swatch[] = [
  {
    name: 'night-rule',
    value: 'var(--color-night-rule)',
    note: 'between sections',
  },
  {
    name: 'night-frame',
    value: 'var(--color-night-frame)',
    note: 'around a panel',
  },
  {
    name: 'night-edge',
    value: 'var(--color-night-edge)',
    note: 'around a control · 3.39:1',
  },
  {
    name: 'night-edge-lit',
    value: 'var(--color-night-edge-lit)',
    note: 'that control, hovered · 6.25:1',
  },
]

function Swatches({ items }: { items: readonly Swatch[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(swatch => (
        <div
          key={swatch.name}
          className="flex flex-col gap-2.5">
          <div
            className="h-12 border border-night-frame"
            style={{
              background: swatch.value,
            }}
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[12px] text-ink-on-night">{swatch.name}</span>
            <span className="text-[11px] text-ink-on-night-dim">{swatch.note}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Group({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">{title}</h2>
        {note ? <p className="text-[12px] text-ink-on-night-dim">{note}</p> : null}
      </div>
      {children}
    </section>
  )
}

export const page: DocPage = {
  slug: 'tokens',
  nav: 'Tokens',
  title: 'One white, four strengths.',
  summary:
    'Every colour is a custom property in a single @theme block. Ink on the ground is one white at four fixed strengths, which keeps four levels apart without ever introducing a second grey.',
  body: () => (
    <div className="flex flex-col gap-12">
      <Group title="Brand">
        <Swatches items={BRAND} />
      </Group>

      <Group
        title="Ink"
        note="measured against the ground">
        <Swatches items={INK} />
      </Group>

      <Group
        title="Lines"
        note="named for what they separate">
        <Swatches items={LINES} />
      </Group>

      <Rule />

      <Group
        title="Type"
        note="headings are fluid and set once">
        <div className="flex flex-col gap-6">
          <p className="text-display font-semibold tracking-[-0.035em] text-ink-on-night">Display</p>
          <p className="text-title font-semibold text-ink-on-night">Title</p>
          <p className="text-lede text-ink-on-night-mid">A lede carries the one sentence that explains the heading.</p>
          <p className="max-w-[46ch] text-body text-ink-on-night-mid">
            Body copy runs at sixteen pixels over a 1.65 leading, with a measure that stops around forty-six characters.
          </p>
          <p className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Label</p>
        </div>
      </Group>

      <Group title="Scale">
        <Table
          head={[
            'token',
            'size',
            'tracking',
          ]}
          rows={[
            [
              'text-display',
              'clamp(2.4rem, 5.6vw, 4.25rem)',
              '-0.035em',
            ],
            [
              'text-display-sm',
              'clamp(2.4rem, 5.6vw, 3.75rem)',
              '-0.035em',
            ],
            [
              'text-title',
              'clamp(1.7rem, 3.4vw, 2.5rem)',
              '-0.02em',
            ],
            [
              'text-title-sm',
              'clamp(1.6rem, 3.2vw, 2.3rem)',
              '-0.02em',
            ],
            [
              'text-lede',
              '17px',
              '—',
            ],
            [
              'text-body',
              '16px',
              '—',
            ],
          ]}
        />
      </Group>

      <Group title="Geometry and motion">
        <Facts
          rows={[
            [
              'Corners',
              'square, everywhere',
            ],
            [
              'Rounding',
              'none — the radio only, and that is a circle',
            ],
            [
              'Hairline',
              '1px',
            ],
            [
              'Column',
              '1120px',
            ],
            [
              'Split',
              '568px + the rest',
            ],
            [
              'motion-fast',
              '120ms · hover, colour',
            ],
            [
              'motion-base',
              '240ms · a drawn underline',
            ],
            [
              'motion-slow',
              '480ms · a bar filling',
            ],
          ]}
        />
      </Group>
    </div>
  ),
}
