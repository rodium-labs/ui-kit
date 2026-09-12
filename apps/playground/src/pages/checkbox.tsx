import { Checkbox } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'checkbox',
  title: 'Checkbox',
  summary:
    'A native checkbox with a drawn box over it. The whole row is the label, so there is no dead strip between the box and its text.',
  examples: [
    {
      title: 'With hints',
      code: `<Checkbox label="Run the visual diff" hint="Adds about forty seconds to the build." defaultChecked />`,
      render: () => (
        <div className="flex flex-col gap-5">
          <Checkbox
            label="Run the visual diff"
            hint="Adds about forty seconds to the build."
            defaultChecked
          />
          <Checkbox
            label="Publish to the registry"
            hint="Needs a maintainer token."
          />
          <Checkbox
            label="Unavailable on this plan"
            disabled
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'Sits beside the box and shares its target.',
    ],
    [
      'hint',
      'ReactNode',
      'Sits under the label, referenced by aria-describedby.',
    ],
  ],
  notes: (
    <>
      <p>
        The visible box is 18px and the target it carries is 24px, which is the WCAG 2.5.8 baseline. Wrapping the row in
        the label is what removes the gap that used to belong to neither.
      </p>
      <p>
        Checked state is a filled box <em>and</em> a tick. Colour alone would leave nothing behind for a reader who
        cannot tell the green from the grey.
      </p>
    </>
  ),
}
