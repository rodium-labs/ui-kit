import { RadioGroup } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [value, setValue] = useState('staging')
  return (
    <RadioGroup
      name="docs-region"
      legend="Deploy target"
      value={value}
      onValueChange={setValue}
      options={[
        {
          value: 'dev',
          label: 'Development',
          hint: 'Rebuilt on every push.',
        },
        {
          value: 'staging',
          label: 'Staging',
          hint: 'Mirrors production, with test data.',
        },
        {
          value: 'prod',
          label: 'Production',
          hint: 'Needs a maintainer to approve.',
        },
        {
          value: 'edge',
          label: 'Edge preview',
          disabled: true,
        },
      ]}
    />
  )
}

export const page: DocPage = {
  slug: 'radio',
  title: 'Radio',
  summary:
    'A choice of one. The group is a fieldset, because the legend is what names the whole choice rather than each option in it.',
  examples: [
    {
      title: 'Group',
      note: 'arrow keys move the selection, as the platform intends',
      code: `<RadioGroup
  name="region"
  legend="Deploy target"
  value={value}
  onValueChange={setValue}
  options={options}
/>`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'name',
      'string',
      'Shared by every radio in the group. Required.',
    ],
    [
      'legend',
      'ReactNode',
      'Names the choice for a screen reader.',
    ],
    [
      'options',
      'readonly RadioOption[]',
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
  ],
  notes: (
    <p>
      This is the one round thing on a square surface. The shape is what tells a reader they are choosing one of
      several, and a square radio reads as a checkbox that has forgotten how to be unticked.
    </p>
  ),
}
