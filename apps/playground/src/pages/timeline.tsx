import { Timeline } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'timeline',
  title: 'Timeline',
  summary: 'An ordered list where the order is the content: a deploy history, an audit trail, a changelog.',
  examples: [
    {
      title: 'A deploy history',
      code: `<Timeline
  events={[
    { title: 'Promoted to production', meta: '14:02', tone: 'accent' },
    { title: 'Smoke tests passed', meta: '13:58' },
  ]}
/>`,
      render: () => (
        <Timeline
          events={[
            {
              title: 'Promoted to production',
              meta: '14:02',
              tone: 'accent',
              description: 'Traffic moved over in four steps with a two minute hold between each.',
            },
            {
              title: 'Smoke tests passed',
              meta: '13:58',
              description: '112 checks against the staging origin.',
            },
            {
              title: 'Rolled back once',
              meta: '13:31',
              tone: 'danger',
              description: 'The first attempt took the connection pool down with it.',
            },
            {
              title: 'Build published',
              meta: '13:12',
              tone: 'neutral',
            },
          ]}
        />
      ),
    },
    {
      title: 'Without descriptions',
      code: `<Timeline events={[{ title: 'v0.1.2', meta: '13 Sept' }]} />`,
      render: () => (
        <Timeline
          events={[
            {
              title: 'v0.1.2',
              meta: '13 Sept',
              tone: 'accent',
            },
            {
              title: 'v0.1.1',
              meta: '13 Sept',
            },
            {
              title: 'v0.1.0',
              meta: '13 Sept',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'events',
      'TimelineEvent[]',
      'title, and optionally meta, description and tone.',
    ],
    [
      'tone',
      "'accent' | 'neutral' | 'warm' | 'danger'",
      'Colours one marker. Never the only thing carrying the meaning.',
    ],
  ],
  notes: (
    <p>
      The rail is a border on the list itself rather than a line drawn per item, so it stays continuous instead of
      leaving a seam wherever two entries meet.
    </p>
  ),
}
