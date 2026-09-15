import { DivergingBar } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'diverging-bar',
  title: 'Diverging bar',
  nav: 'Diverging bar',
  summary: 'Change against a baseline, where the sign is the story.',
  examples: [
    {
      title: 'Week over week',
      code: `<DivergingBar title="Change" name="Change" points={rows} />`,
      render: () => (
        <DivergingBar
          title="Change week over week"
          caption="Requests per second, against the week before."
          name="Change"
          points={[
            {
              label: 'eu-central',
              value: 184,
            },
            {
              label: 'us-east',
              value: 312,
            },
            {
              label: 'eu-west',
              value: -96,
            },
            {
              label: 'ap-south',
              value: 41,
            },
            {
              label: 'sa-east',
              value: -158,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'points',
      'Point[]',
      'Signed. Above the baseline is a gain, below it a loss.',
    ],
  ],
  notes: (
    <p>
      This is the one case where a second colour is about polarity rather than identity. The midpoint carries no hue at
      all — it has to read as nothing happened.
    </p>
  ),
}
