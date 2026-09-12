import { Slider } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [value, setValue] = useState(64)
  return (
    <div className="flex max-w-md flex-col gap-8">
      <Slider
        label="Brightness"
        min={0}
        max={100}
        showValue
        value={value}
        onChange={event => setValue(Number(event.target.value))}
        hint="Applies to the panel, not the page."
      />
      <Slider
        label="Locked"
        defaultValue={30}
        disabled
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'slider',
  title: 'Slider',
  summary:
    'The native range input. It already has the keyboard, the value and the announcement; only the track and the thumb are drawn here.',
  examples: [
    {
      title: 'With a value',
      note: 'arrow keys step, Home and End jump to the ends',
      code: `<Slider label="Brightness" min={0} max={100} showValue
  value={value} onChange={e => setValue(Number(e.target.value))} />`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'The visible label.',
    ],
    [
      'showValue',
      'boolean',
      'Prints the current value beside the label.',
    ],
    [
      'hint',
      'ReactNode',
      'Sits under the track.',
    ],
    [
      'min / max / step',
      'number',
      'Passed through to the native input.',
    ],
  ],
  notes: (
    <p>
      Because it is a real <code className="text-ink-on-night">input[type=range]</code>, the value is announced as a
      percentage without any ARIA of ours, and it works with a screen reader's own slider gestures.
    </p>
  ),
}
