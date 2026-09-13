import { Select } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

const REGIONS = [
  {
    value: 'fra',
    label: 'Frankfurt',
    hint: 'eu-central-1',
  },
  {
    value: 'ist',
    label: 'Istanbul',
    hint: 'eu-south-3',
  },
  {
    value: 'iad',
    label: 'Virginia',
    hint: 'us-east-1',
  },
  {
    value: 'sfo',
    label: 'San Francisco',
    hint: 'us-west-2',
  },
  {
    value: 'syd',
    label: 'Sydney',
    hint: 'ap-southeast-2 · at capacity',
    disabled: true,
  },
]

function Demo() {
  const [region, setRegion] = useState('fra')
  return (
    <div className="grid max-w-lg gap-6">
      <Select
        label="Region"
        options={REGIONS}
        value={region}
        onValueChange={setRegion}
        hint="Where the next deploy lands."
      />
      <Select
        label="Fallback"
        options={REGIONS}
        placeholder="None"
      />
      <Select
        label="Locked"
        options={REGIONS}
        defaultValue="fra"
        disabled
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'select',
  title: 'Select',
  summary:
    'A select built to the ARIA select-only combobox pattern: one tab stop on the trigger, and aria-activedescendant naming the active row while focus stays put.',
  examples: [
    {
      title: 'Options with hints',
      note: 'arrows move, letters jump, enter picks, escape closes',
      code: `<Select
  label="Region"
  options={[{ value: 'fra', label: 'Frankfurt', hint: 'eu-central-1' }]}
  value={region}
  onValueChange={setRegion}
/>`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'options',
      'readonly SelectOption[]',
      'Each takes a value, a label and an optional hint.',
    ],
    [
      'value / defaultValue',
      'string',
      'Controlled or uncontrolled selection.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with the value picked.',
    ],
    [
      'placeholder',
      'string',
      'Shown until something is picked. Default "Select…".',
    ],
    [
      'name',
      'string',
      'Writes a hidden input, so the value posts with a plain form.',
    ],
  ],
  notes: (
    <>
      <p>
        A custom select is a real cost: the native one already carries the keyboard, the touch sheet and the screen
        reader, and none of that comes free in a rebuild. This one follows the ARIA pattern closely, and{' '}
        <code className="text-ink-on-night">NativeSelect</code> has a page of its own for anywhere the platform list is
        the better answer.
      </p>
      <p>
        Typeahead resets after half a second, so "fr" jumps to Frankfurt while two slow presses of f and r are two
        separate jumps.
      </p>
    </>
  ),
}
