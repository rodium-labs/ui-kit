import { Heatmap } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const DAYS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
]
const HOURS = [
  '00',
  '04',
  '08',
  '12',
  '16',
  '20',
]
const LOAD = [
  [
    4,
    3,
    28,
    46,
    39,
    12,
  ],
  [
    5,
    3,
    31,
    52,
    44,
    14,
  ],
  [
    6,
    4,
    33,
    49,
    41,
    15,
  ],
  [
    5,
    4,
    35,
    58,
    47,
    18,
  ],
  [
    7,
    5,
    30,
    44,
    36,
    22,
  ],
]

export const page: DocPage = {
  slug: 'heatmap',
  title: 'Heatmap',
  summary: 'Magnitude across a grid, on one hue. Brighter is more.',
  examples: [
    {
      title: 'Load by hour',
      note: 'point at a cell',
      code: `<Heatmap title="Load" cells={cells} />`,
      render: () => (
        <Heatmap
          title="Load by hour"
          caption="Requests per second, averaged over four weeks."
          cells={DAYS.flatMap((row, r) =>
            HOURS.map((column, c) => ({
              row,
              column,
              value: LOAD[r]?.[c] ?? 0,
            })),
          )}
        />
      ),
    },
  ],
  props: [
    [
      'cells',
      'HeatCell[]',
      'row, column and value. The rows and columns are taken from the cells.',
    ],
  ],
  notes: (
    <>
      <p>
        One hue, dim to bright. It runs the other way from a ramp on paper: on a black ground more has to mean brighter,
        or the busiest cell disappears into the background.
      </p>
      <p>
        The scale legend is not optional here. A shade has no meaning without the two numbers at its ends, which is why
        it sits under every one of these.
      </p>
    </>
  ),
}
