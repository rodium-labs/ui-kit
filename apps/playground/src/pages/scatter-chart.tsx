import { ScatterChart } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'scatter-chart',
  title: 'Scatter chart',
  nav: 'Scatter chart',
  summary: 'Two measures against each other, one dot per thing.',
  examples: [
    {
      title: 'Size against build time',
      note: 'point at a dot',
      code: `<ScatterChart points={projects} xLabel="Files" yLabel="Seconds" />`,
      render: () => (
        <ScatterChart
          title="Bundle size against build time"
          caption="One dot per project."
          xLabel="Files"
          yLabel="Seconds"
          points={[
            {
              label: 'edge-router',
              x: 120,
              y: 18,
            },
            {
              label: 'batch-runner',
              x: 340,
              y: 41,
            },
            {
              label: 'console',
              x: 880,
              y: 96,
            },
            {
              label: 'docs',
              x: 210,
              y: 24,
            },
            {
              label: 'sdk',
              x: 460,
              y: 38,
            },
            {
              label: 'cli',
              x: 150,
              y: 31,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'points',
      'ScatterPoint[]',
      'label, x and y.',
    ],
    [
      'xLabel / yLabel',
      'string',
      'What each axis measures.',
    ],
  ],
  notes: (
    <p>
      The dots carry a two-pixel ring in the ground colour, so they stay countable where they overlap. The ring is part
      of the hit target, not only spacing.
    </p>
  ),
}
