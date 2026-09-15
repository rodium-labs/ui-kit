import { TagInput } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Live() {
  const [values, setValues] = useState([
    'eu-central-1',
    'us-east-1',
  ])
  return (
    <div className="max-w-[26rem]">
      <TagInput
        label="Regions"
        hint="Enter or comma to add. Backspace on an empty field takes the last one back."
        placeholder="Add a region"
        values={values}
        onValuesChange={setValues}
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'tag-input',
  title: 'Tag input',
  nav: 'Tag input',
  summary: 'Several values in one field, each one removable on its own.',
  examples: [
    {
      title: 'Regions',
      note: 'type and press enter',
      code: `<TagInput label="Regions" values={values} onValuesChange={setValues} />`,
      render: () => <Live />,
    },
  ],
  props: [
    [
      'values',
      'string[]',
      'What is in it. Duplicates are refused.',
    ],
    [
      'onValuesChange',
      '(values) => void',
      'Called with the whole list.',
    ],
    [
      'placeholder',
      'string',
      'Shown only while the field is empty.',
    ],
  ],
  notes: (
    <p>
      Every chip carries its own named remove button, so the pointer and the keyboard each have a way out. Backspace on
      an empty field takes the last one back, which is what anyone who has used one of these already expects.
    </p>
  ),
}
