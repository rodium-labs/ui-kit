import { LineChart } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const MONTHS = [
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
]
const build = (values: number[]) =>
  values.map((value, i) => ({
    label: MONTHS[i] ?? '',
    value,
  }))

export const page: DocPage = {
  slug: 'line-chart',
  title: 'Line chart',
  nav: 'Line chart',
  summary: 'A trend over time, with a crosshair that reads every series at the same point.',
  examples: [
    {
      title: 'One series',
      note: 'move across it',
      code: `<LineChart
  title="Requests"
  series={[{ name: 'Requests', points: months }]}
/>`,
      render: () => (
        <LineChart
          title="Requests"
          caption="Millions per month, from a zero baseline."
          series={[
            {
              name: 'Requests',
              points: build([
                12.4,
                14.1,
                13.8,
                17.2,
                19.6,
                22.3,
              ]),
            },
          ]}
        />
      ),
    },
    {
      title: 'Two series',
      code: `<LineChart series={[{ name: 'eu', points }, { name: 'us', points }]} />`,
      render: () => (
        <LineChart
          title="Requests by region"
          caption="Millions per month."
          series={[
            {
              name: 'eu-central',
              points: build([
                12.4,
                14.1,
                13.8,
                17.2,
                19.6,
                22.3,
              ]),
            },
            {
              name: 'us-east',
              points: build([
                8.1,
                8.9,
                10.4,
                10.1,
                12.8,
                14.6,
              ]),
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'series',
      'Series[]',
      'Each has a name and its points. Two is the ceiling the palette was validated for.',
    ],
    [
      'zero',
      'boolean',
      'Off where the movement is small and zero would flatten it. Say so in the caption.',
    ],
    [
      'caption',
      'string',
      'One line saying what is plotted and over what.',
    ],
    [
      'height',
      'number',
      'Defaults to 180.',
    ],
  ],
  notes: (
    <>
      <p>
        Past two series the honest form is small multiples, not a third colour. The palette was validated for two on
        this ground; a generated third would be indistinguishable from one of them for a colourblind reader.
      </p>
      <p>
        Every chart in the kit carries the same figures as a table underneath it, so nothing is gated behind seeing it.
      </p>
    </>
  ),
}
