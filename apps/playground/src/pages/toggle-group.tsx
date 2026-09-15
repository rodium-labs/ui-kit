import { ToggleGroup } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Segmented() {
  const [range, setRange] = useState('7d')
  const [view, setView] = useState('grid')
  return (
    <div className="flex flex-col gap-5">
      <ToggleGroup
        label="Range"
        value={range}
        onValueChange={setRange}
        className="max-w-[22rem]"
        options={[
          {
            value: '24h',
            label: '24 hours',
          },
          {
            value: '7d',
            label: '7 days',
          },
          {
            value: '30d',
            label: '30 days',
          },
        ]}
      />
      <ToggleGroup
        label="View"
        value={view}
        onValueChange={setView}
        className="max-w-[18rem]"
        options={[
          {
            value: 'grid',
            label: 'Grid',
          },
          {
            value: 'list',
            label: 'List',
          },
          {
            value: 'raw',
            label: 'Raw',
            disabled: true,
          },
        ]}
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'toggle-group',
  title: 'Toggle group',
  nav: 'Toggle group',
  summary: 'One choice out of a few, all of them visible. A segmented control built out of radios.',
  examples: [
    {
      title: 'Range and view',
      note: 'arrow keys move within it',
      code: `<ToggleGroup
  label="Range"
  value={range}
  onValueChange={setRange}
  options={[
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
  ]}
/>`,
      render: () => <Segmented />,
    },
  ],
  props: [
    [
      'label',
      'string',
      'Names the group. Visually hidden, read before the options.',
    ],
    [
      'options',
      'ToggleOption[]',
      'value and label, and optionally icon and disabled.',
    ],
    [
      'value',
      'string',
      'The selected value.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with the value that was picked.',
    ],
  ],
  notes: (
    <>
      <p>
        Underneath it is a fieldset of radios, so the arrow keys move within the group, the whole thing is one tab stop,
        and a screen reader announces the position — three of three — without any of it being written here.
      </p>
      <p>
        Past about five options this stops fitting on a phone. Use <code className="text-ink-on-night">Select</code>{' '}
        there.
      </p>
    </>
  ),
}
