import { Progress } from '@rodium-labs/ui'
import { useEffect, useState } from 'react'
import type { DocPage } from '../docs/types'

function LiveProgress() {
  const [pct, setPct] = useState(12)

  useEffect(() => {
    const tick = window.setInterval(() => {
      setPct(current => (current >= 100 ? 0 : Math.min(100, current + Math.round(4 + Math.random() * 9))))
    }, 700)
    return () => window.clearInterval(tick)
  }, [])

  return (
    <div className="flex max-w-md flex-col gap-8">
      <Progress
        value={pct}
        label="Upload"
        showValue
      />
      <Progress
        value={Math.max(0, pct - 18)}
        label="Verify"
        showValue
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'progress',
  title: 'Progress',
  summary: 'How far along something is. A hairline track with the accent filling it.',
  examples: [
    {
      title: 'Live',
      note: 'a real upload, not a still',
      code: `<Progress value={percent} label="Upload" showValue />`,
      render: () => <LiveProgress />,
    },
    {
      title: 'Indeterminate',
      note: 'no value: work with no known end',
      code: `<Progress label="Reading the manifest" />`,
      render: () => (
        <div className="flex max-w-md flex-col gap-8">
          <Progress label="Reading the manifest" />
          <Progress />
        </div>
      ),
    },
    {
      title: 'Fixed',
      code: `<Progress value={28} label="Bundle" showValue />`,
      render: () => (
        <div className="flex max-w-md flex-col gap-8">
          <Progress
            value={28}
            label="Bundle"
            showValue
          />
          <Progress
            value={100}
            label="Done"
            showValue
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'value',
      'number | undefined',
      'Leave it out for an indeterminate bar.',
    ],
    [
      'max',
      'number',
      'Default 100.',
    ],
    [
      'label',
      'string',
      'Names the bar, for sighted readers and for aria-label.',
    ],
    [
      'showValue',
      'boolean',
      'Prints the percentage beside the label.',
    ],
  ],
  notes: (
    <p>
      The track is set a step dimmer than a control edge on purpose: what has to stay distinguishable is the fill
      against the track, and a control-weight track drops that pair to 2:1.
    </p>
  ),
}
