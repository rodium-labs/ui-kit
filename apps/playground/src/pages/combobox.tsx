import { Combobox } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

const REGIONS = [
  {
    value: 'eu-central-1',
    label: 'Frankfurt',
    hint: 'eu-central-1',
  },
  {
    value: 'eu-west-2',
    label: 'London',
    hint: 'eu-west-2',
  },
  {
    value: 'us-east-1',
    label: 'Virginia',
    hint: 'us-east-1',
  },
  {
    value: 'us-west-2',
    label: 'Oregon',
    hint: 'us-west-2',
  },
  {
    value: 'ap-south-1',
    label: 'Mumbai',
    hint: 'ap-south-1',
  },
  {
    value: 'ap-northeast-1',
    label: 'Tokyo',
    hint: 'ap-northeast-1',
  },
  {
    value: 'sa-east-1',
    label: 'Sao Paulo',
    hint: 'sa-east-1',
  },
]

function Live() {
  const [value, setValue] = useState<string | null>('eu-central-1')
  return (
    <div className="max-w-[22rem]">
      <Combobox
        label="Region"
        hint="Type to narrow the list."
        options={REGIONS}
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'combobox',
  title: 'Combobox',
  summary: 'Select with a filter, for a list longer than a screen.',
  examples: [
    {
      title: 'Filtering',
      note: 'type, then arrow keys',
      code: `<Combobox label="Region" options={regions} value={value} onValueChange={setValue} />`,
      render: () => <Live />,
    },
  ],
  props: [
    [
      'options',
      'ComboboxOption[]',
      'value, label and an optional hint.',
    ],
    [
      'value',
      'string | null',
      'The chosen value.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with what was picked.',
    ],
    [
      'empty',
      'string',
      'What the list says when nothing matches.',
    ],
  ],
  notes: (
    <>
      <p>
        The difference from <code className="text-ink-on-night">Select</code> is the text field. A select-only combobox
        is a button; once the list is longer than a screen, typing is the only reasonable way in.
      </p>
      <p>
        Focus never leaves the input. The active option is named through{' '}
        <code className="text-ink-on-night">aria-activedescendant</code> rather than focused, which is what keeps typing
        and arrowing working at the same time.
      </p>
    </>
  ),
}
