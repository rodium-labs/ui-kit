import { Select } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'select',
  title: 'Select',
  summary:
    'The native select, restyled. Its options are drawn by the platform, which is what makes the list work on a phone and under a screen reader without a line of script.',
  examples: [
    {
      title: 'Default',
      code: `<Select label="Environment" defaultValue="staging">
  <option value="dev">Development</option>
  <option value="staging">Staging</option>
</Select>`,
      render: () => (
        <div className="grid max-w-lg gap-6">
          <Select
            label="Environment"
            defaultValue="staging"
            hint="Where the next deploy lands.">
            <option value="dev">Development</option>
            <option value="staging">Staging</option>
            <option value="prod">Production</option>
          </Select>
          <Select
            label="Region"
            disabled>
            <option>Frankfurt</option>
          </Select>
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'The visible label.',
    ],
    [
      'hint',
      'ReactNode',
      'Sits under the field.',
    ],
    [
      'error',
      'ReactNode',
      'Replaces the hint and sets aria-invalid.',
    ],
  ],
  notes: (
    <p>
      The chevron is decoration with <code className="text-ink-on-night">pointer-events: none</code>, so a click that
      lands on it still opens the list underneath.
    </p>
  ),
}
