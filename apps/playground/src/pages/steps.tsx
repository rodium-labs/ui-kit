import { Action, Steps } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

const FLOW = [
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
]

function Live() {
  const [current, setCurrent] = useState(1)
  return (
    <div className="flex flex-col gap-5">
      <Steps
        steps={FLOW}
        current={current}
      />
      <div className="flex flex-wrap gap-3">
        <Action
          size="sm"
          tone="quiet"
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}>
          Back
        </Action>
        <Action
          size="sm"
          onClick={() => setCurrent(c => Math.min(FLOW.length, c + 1))}
          disabled={current === FLOW.length}>
          Next
        </Action>
      </div>
    </div>
  )
}

export const page: DocPage = {
  slug: 'steps',
  title: 'Steps',
  summary: 'Where you are in a flow that has an order, and how much of it is behind you.',
  examples: [
    {
      title: 'Moving through it',
      note: 'press next',
      code: `<Steps current={current} steps={[
  { label: 'Connect the repository' },
  { label: 'Pick a branch' },
]} />`,
      render: () => <Live />,
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
    <>
      <p>
        Each state says which it is in words as well as in colour, so a screen reader hears “done” and “current step”
        rather than being told about a green circle it cannot see.
      </p>
      <p>
        A step that finishes rolls its number away and the tick up into its place — the same motion, duration and curve{' '}
        <code className="text-ink-on-night">Stat</code> uses on a digit that changes.
      </p>
    </>
  ),
}
