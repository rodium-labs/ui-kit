import { Dumbbell } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'dumbbell',
  title: 'Dumbbell',
  summary: 'Before and after per item, with the distance between them as the mark.',
  examples: [
    {
      title: 'Latency after the move',
      code: `<Dumbbell rows={regions} fromLabel="Before" toLabel="After" />`,
      render: () => (
        <Dumbbell
          title="p95 latency"
          caption="Milliseconds, before and after moving the origin."
          fromLabel="Before"
          toLabel="After"
          rows={[
            {
              label: 'eu-central',
              from: 112,
              to: 41,
            },
            {
              label: 'eu-west',
              from: 128,
              to: 58,
            },
            {
              label: 'us-east',
              from: 86,
              to: 79,
            },
            {
              label: 'ap-south',
              from: 204,
              to: 119,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'rows',
      'DumbbellRow[]',
      'label, from and to.',
    ],
    [
      'fromLabel / toLabel',
      'string',
      'What the two ends are. Default to Before and After.',
    ],
  ],
  notes: (
    <p>
      One hue in two shades rather than two hues. The pair is the same measure at two times, not two different things,
      and colouring them as two categories is the wrong idea about the data.
    </p>
  ),
}
