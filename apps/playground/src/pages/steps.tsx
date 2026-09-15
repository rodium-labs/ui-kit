import { Steps } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'steps',
  title: 'Steps',
  summary: 'Where you are in a flow that has an order, and how much of it is behind you.',
  examples: [
    {
      title: 'Halfway through',
      code: `<Steps current={2} steps={[
  { label: 'Connect the repository' },
  { label: 'Pick a branch' },
]} />`,
      render: () => (
        <Steps
          current={2}
          steps={[
            {
              label: 'Connect the repository',
              description: 'Read access is enough.',
            },
            {
              label: 'Pick a branch',
              description: 'Every push to it triggers a build.',
            },
            {
              label: 'Set the build command',
              description: 'Defaults to what the framework expects.',
            },
            {
              label: 'Add a domain',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'steps',
      'Step[]',
      'label, and optionally a description.',
    ],
    [
      'current',
      'number',
      'Which one you are on, zero based. Everything before it is done.',
    ],
  ],
  notes: (
    <p>
      Each state says which it is in words as well as in colour, so a screen reader hears “done” and “current step”
      rather than being told about a green circle it cannot see.
    </p>
  ),
}
