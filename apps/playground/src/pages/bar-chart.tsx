import { BarChart } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const REGIONS = [
  {
    label: 'eu-c',
    value: 2840,
  },
  {
    label: 'eu-w',
    value: 1920,
  },
  {
    label: 'us-e',
    value: 3610,
  },
  {
    label: 'us-w',
    value: 1140,
  },
  {
    label: 'ap-s',
    value: 880,
  },
  {
    label: 'sa-e',
    value: 420,
  },
]

export const page: DocPage = {
  slug: 'bar-chart',
  title: 'Bar chart',
  nav: 'Bar chart',
  summary: 'Magnitude from a zero baseline. Columns where the labels are short.',
  examples: [
    {
      title: 'Every bar the same',
      code: `<BarChart title="Deploys" name="Deploys" points={regions} />`,
      render: () => (
        <BarChart
          title="Deploys by region"
          caption="Last thirty days."
          name="Deploys"
          points={REGIONS}
        />
      ),
    },
    {
      title: 'One bar the point',
      note: 'emphasis',
      code: `<BarChart points={regions} emphasis="us-e" />`,
      render: () => (
        <BarChart
          title="Deploys by region"
          caption="us-east takes more than a third of them."
          name="Deploys"
          points={REGIONS}
          emphasis="us-e"
        />
      ),
    },
  ],
  props: [
    [
      'points',
      'Point[]',
      'label and value.',
    ],
    [
      'emphasis',
      'string',
      'The one label the story is about. The rest go quiet behind it.',
    ],
    [
      'name',
      'string',
      'Names the measure in the table view.',
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
        Always from zero. A cut baseline turns a two percent difference into a doubling, and a reader has no way to see
        that it happened.
      </p>
      <p>
        <code className="text-ink-on-night">emphasis</code> is the form this kit reaches for most. One bar in the accent
        and the rest in a quiet step of the same hue says which one the sentence above is about, without spending a
        second colour on it.
      </p>
    </>
  ),
}
