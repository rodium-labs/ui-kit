import { BarList } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'bar-list',
  title: 'Bar list',
  nav: 'Bar list',
  summary: 'The same comparison turned on its side, for when the category names are longer than a column is wide.',
  examples: [
    {
      title: 'Endpoints by traffic',
      code: `<BarList title="Endpoints" name="Requests" points={rows} emphasis="/api/session" />`,
      render: () => (
        <BarList
          title="Endpoints by traffic"
          caption="Requests per minute, median over the last hour."
          name="Requests"
          emphasis="/api/session/refresh"
          points={[
            {
              label: '/api/session/refresh',
              value: 4820,
            },
            {
              label: '/api/projects/:id/runs',
              value: 3140,
            },
            {
              label: '/api/search',
              value: 1960,
            },
            {
              label: '/api/projects/:id/logs',
              value: 1240,
            },
            {
              label: '/api/webhooks/github',
              value: 680,
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
      'label and value.',
    ],
    [
      'emphasis',
      'string',
      'The one row the story is about.',
    ],
  ],
  notes: (
    <p>
      The value rides the end of each row, so no axis is needed at all. Turning a long label on its side under a column
      is the thing this form exists to avoid.
    </p>
  ),
}
