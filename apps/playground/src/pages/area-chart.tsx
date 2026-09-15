import { AreaChart } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const DAYS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]

export const page: DocPage = {
  slug: 'area-chart',
  title: 'Area chart',
  nav: 'Area chart',
  summary: 'One series under a wash, for a volume that accumulates rather than a rate that fluctuates.',
  examples: [
    {
      title: 'A week of traffic',
      code: `<AreaChart title="Bandwidth" name="TB" points={days} />`,
      render: () => (
        <AreaChart
          title="Bandwidth"
          caption="Terabytes served per day."
          name="Terabytes"
          points={[
            2.1,
            2.4,
            2.2,
            3.1,
            3.6,
            1.4,
            1.1,
          ].map((value, i) => ({
            label: DAYS[i] ?? '',
            value,
          }))}
        />
      ),
    },
  ],
  props: [
    [
      'name',
      'string',
      'The one series. The title names it, so there is no legend.',
    ],
    [
      'points',
      'Point[]',
      'label and value.',
    ],
    [
      'height',
      'number',
      'Defaults to 180.',
    ],
  ],
  notes: (
    <p>
      It takes a single series on purpose. The fill is the whole point of the form, and two washes on one plot hide each
      other — that is a line chart with two series, not an area chart.
    </p>
  ),
}
