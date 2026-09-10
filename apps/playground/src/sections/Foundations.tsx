import { Facts, Table } from '@rodium/ui'
import { Demo, Section } from '../ui/Showcase'

interface Swatch {
  name: string
  value: string
  note?: string
}

const BRAND: readonly Swatch[] = [
  {
    name: 'brand-green',
    value: 'var(--color-brand-green)',
    note: '#12a776',
  },
  {
    name: 'brand-pink',
    value: 'var(--color-brand-pink)',
    note: '#ff95f8',
  },
  {
    name: 'ink-green-on-night',
    value: 'var(--color-ink-green-on-night)',
    note: '#41b991',
  },
  {
    name: 'danger',
    value: 'var(--color-danger)',
    note: '#ff6369',
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
    note: 'decoration',
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
    note: 'around a control',
  },
  {
    name: 'night-edge-lit',
    value: 'var(--color-night-edge-lit)',
    note: 'that control, hovered',
  },
]

function Swatches({ items, tall = false }: { items: readonly Swatch[]; tall?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(swatch => (
        <div
          key={swatch.name}
          className="flex flex-col gap-2.5">
          <div
            className={`border border-night-frame ${tall ? 'h-14' : 'h-10'}`}
            style={{
              background: swatch.value,
            }}
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[12px] text-ink-on-night">{swatch.name}</span>
            {swatch.note ? <span className="text-[11px] text-ink-on-night-dim">{swatch.note}</span> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Foundations() {
  return (
    <Section
      id="foundations"
      title="One white, four strengths."
      blurb="The ground is pure black and every colour on it is a custom property in one @theme block, so a component never holds a hex value. Ink is a single white at four fixed strengths — headings, body, labels, decoration — which keeps four levels apart without ever introducing a second grey.">
      <Demo label="Brand">
        <Swatches
          items={BRAND}
          tall
        />
      </Demo>

      <Demo
        label="Ink"
        note="one white, four strengths">
        <Swatches items={INK} />
      </Demo>

      <Demo
        label="Lines"
        note="named for what they separate">
        <Swatches items={LINES} />
      </Demo>

      <Demo
        label="Type"
        note="headings are fluid and set once">
        <div className="flex flex-col gap-6">
          <p className="text-display font-semibold tracking-[-0.035em] text-ink-on-night">Display</p>
          <p className="text-title font-semibold text-ink-on-night">Title</p>
          <p className="text-lede text-ink-on-night-mid">
            A lede sits under a heading and carries the one sentence that explains it.
          </p>
          <p className="max-w-[46ch] text-body text-ink-on-night-mid">
            Body copy runs at sixteen pixels over a 1.65 leading, with a measure that stops around forty-six characters,
            because a line longer than that is harder to come back to.
          </p>
          <p className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Label</p>
        </div>
      </Demo>

      <Demo
        label="Scale"
        note="every step, as it is declared">
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
      </Demo>

      <Demo label="Geometry">
        <Facts
          rows={[
            [
              'Corners',
              'square, everywhere',
            ],
            [
              'Rounding',
              'the focus ring only, 4px',
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
          ]}
        />
      </Demo>
    </Section>
  )
}
