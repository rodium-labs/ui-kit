import { Rating } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Live() {
  const [score, setScore] = useState(4)
  return (
    <div className="flex flex-col gap-2">
      <Rating
        label="Rate this run"
        value={score}
        onValueChange={setScore}
      />
      <p className="text-[13px] text-ink-on-night-dim tabular-nums">{score} out of 5</p>
    </div>
  )
}

export const page: DocPage = {
  slug: 'rating',
  title: 'Rating',
  summary: 'A score out of a few, as a control or as a reading.',
  examples: [
    {
      title: 'Something to set',
      note: 'arrow keys work',
      code: `<Rating label="Rate this run" value={score} onValueChange={setScore} />`,
      render: () => <Live />,
    },
    {
      title: 'Something to read',
      code: `<Rating label="Average" value={4} />`,
      render: () => (
        <div className="flex flex-col gap-3">
          <Rating
            label="Average score"
            value={4}
          />
          <Rating
            label="Last month"
            value={2}
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'value',
      'number',
      'The score.',
    ],
    [
      'onValueChange',
      '(value: number) => void',
      'Leave it out and the rating is a reading, not a control.',
    ],
    [
      'max',
      'number',
      'How many marks. Defaults to 5.',
    ],
    [
      'label',
      'string',
      'Names it. Required either way.',
    ],
  ],
  notes: (
    <p>
      With a handler it is a radio group, so the arrow keys move within it and the position is announced. Without one it
      is an image with the score written into its name. The number is never left to be counted off the shapes.
    </p>
  ),
}
