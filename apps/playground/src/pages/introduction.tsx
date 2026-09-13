import { Action, CodeBlock, Facts, Rule } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'introduction',
  nav: 'Introduction',
  title: 'The surface, taken apart.',
  summary:
    'Every control rodiumlabs.org already wears, pulled into one kit: a black ground, one white at four strengths, square corners, and a single green kept for whatever has focus.',
  body: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">What it is</h2>
        <p className="max-w-[58ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
          Two packages and a docs app. <code className="text-ink-on-night">@rodium-labs/tokens</code> holds the theme
          block, the ground and the entrance; <code className="text-ink-on-night">@rodium-labs/ui</code> holds the
          components. The kit carries two runtime dependencies and no component library underneath it.
        </p>
        <Facts
          rows={[
            [
              'Components',
              '39',
            ],
            [
              'Glyphs',
              '13',
            ],
            [
              'Runtime dependencies',
              'clsx, tailwind-merge',
            ],
            [
              'Styling',
              'Tailwind v4',
            ],
            [
              'Linting',
              'Biome 2.3.2',
            ],
          ]}
        />
      </div>

      <Rule />

      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">
          The rules it keeps
        </h2>
        <ul className="flex max-w-[58ch] list-none flex-col gap-3 text-[15px] leading-[1.65] text-ink-on-night-mid">
          <li>
            <strong className="font-medium text-ink-on-night">Square, everywhere.</strong> The only rounding is 4px on
            the focus ring, and it belongs to the outline rather than the control under it.
          </li>
          <li>
            <strong className="font-medium text-ink-on-night">Colour never sits in a component.</strong> Every value is
            a custom property, so a tone changes in one file and the kit follows.
          </li>
          <li>
            <strong className="font-medium text-ink-on-night">The browser does the hard parts.</strong> Dialogs,
            disclosures and menus are native elements, so the top layer, the focus trap and the escape key are not ours
            to rebuild.
          </li>
          <li>
            <strong className="font-medium text-ink-on-night">Motion is opt-out.</strong> Every transition carries a
            reduced-motion escape, and no state is ever carried by motion or colour alone.
          </li>
        </ul>
      </div>

      <Rule />

      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">A first component</h2>
        <CodeBlock
          caption="app.tsx"
          language="tsx">{`import { Action, Eyebrow, Title, Wrap } from '@rodium-labs/ui'

export function Work() {
  return (
    <Wrap className="py-20">
      <Eyebrow>work/</Eyebrow>
      <Title className="mt-4">One project at a time.</Title>
      <Action href="/waltz">Read the build</Action>
    </Wrap>
  )
}`}</CodeBlock>
        <div className="flex flex-wrap gap-3">
          <Action href="#/installation">Install the kit</Action>
          <Action
            href="#/action"
            tone="quiet">
            Browse the components
          </Action>
        </div>
      </div>
    </div>
  ),
}
