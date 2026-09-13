import { Panel } from '@rodium/ui'
import type { DocPage } from '../docs/types'

const SHOT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='284' height='76'%3E%3Crect width='284' height='76' fill='%23000'/%3E%3Crect x='8' y='8' width='60' height='60' fill='%2312a776'/%3E%3Crect x='78' y='20' width='120' height='8' fill='%23fff'/%3E%3Crect x='78' y='36' width='80' height='6' fill='%23666'/%3E%3Crect x='78' y='54' width='198' height='4' fill='%23ff95f8'/%3E%3C/svg%3E"

export const page: DocPage = {
  slug: 'panel',
  title: 'Panel',
  summary:
    '284×76 of real device output. It steps 1x to 2x and nothing between, so the pixels stay square and the panel is never resampled.',
  examples: [
    {
      title: 'At 1x',
      code: `<Panel src="/screens/player.png" alt="The player screen" />`,
      render: () => (
        <div className="flex flex-col gap-3">
          <Panel
            src={SHOT}
            alt="A mock of the Waltz player screen"
          />
          <p className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">the player</p>
        </div>
      ),
    },
    {
      title: 'Opting into 2x',
      note: 'only where the column is actually 568 wide',
      code: `<Panel src="/screens/player.png" alt="The player screen" wide />`,
      render: () => (
        <Panel
          src={SHOT}
          alt="A mock of the Waltz player screen at 2x"
          wide
        />
      ),
    },
  ],
  props: [
    [
      'src, alt',
      'string',
      'Required. The image renders pixelated.',
    ],
    [
      'wide',
      'boolean',
      'Steps to 568px where the column can hold it.',
    ],
    [
      'eager',
      'boolean',
      'Drops the lazy loading, for a panel above the fold.',
    ],
  ],
  notes: (
    <p>
      The image is hidden below 380px rather than scaled down: a 284px panel in a 320px column leaves no room for
      anything else, and a resampled one stops being real device output.
    </p>
  ),
}
