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
    name: 'brand-ink',
    value: 'var(--color-brand-ink)',
    note: '#3d2631',
  },
  {
    name: 'danger',
    value: 'var(--color-danger)',
    note: '#e5484d',
  },
]

const GROUND: readonly Swatch[] = [
  {
    name: 'night',
    value: 'var(--color-night)',
  },
  {
    name: 'night-raised',
    value: 'var(--color-night-raised)',
  },
  {
    name: 'night-wash',
    value: 'var(--color-night-wash)',
  },
  {
    name: 'night-edge',
    value: 'var(--color-night-edge)',
  },
]

const INK: readonly Swatch[] = [
  {
    name: 'ink-on-night',
    value: 'var(--color-ink-on-night)',
  },
  {
    name: 'ink-on-night-mid',
    value: 'var(--color-ink-on-night-mid)',
  },
  {
    name: 'ink-on-night-dim',
    value: 'var(--color-ink-on-night-dim)',
  },
  {
    name: 'ink-on-night-faint',
    value: 'var(--color-ink-on-night-faint)',
  },
]

function Swatches({ items }: { items: readonly Swatch[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(swatch => (
        <div
          key={swatch.name}
          className="flex flex-col gap-2">
          <div
            className="h-16 rounded-[10px] border border-night-frame"
            style={{
              background: swatch.value,
            }}
          />
          <div className="flex flex-col">
            <span className="font-mono text-[12px] text-ink-on-night">{swatch.name}</span>
            {swatch.note ? <span className="font-mono text-[11px] text-ink-on-night-dim">{swatch.note}</span> : null}
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
      title="Foundations"
      blurb="Every colour in the kit is a CSS custom property in one @theme block, so a component never holds a hex value. Ink on the black ground is one white at four fixed strengths, which is what keeps a heading, a paragraph and a caption apart without introducing a second grey.">
      <Demo label="Brand">
        <Swatches items={BRAND} />
      </Demo>
      <Demo label="Ground">
        <Swatches items={GROUND} />
      </Demo>
      <Demo
        label="Ink"
        note="headings, body, labels, decoration">
        <Swatches items={INK} />
      </Demo>
    </Section>
  )
}
