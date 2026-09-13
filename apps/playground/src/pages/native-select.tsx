import { NativeSelect } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'native-select',
  nav: 'Native select',
  title: 'Native select',
  summary:
    'The platform’s own list, restyled. Its options are drawn by the operating system, which is what makes it work on a phone and under a screen reader with no script of ours.',
  examples: [
    {
      title: 'Default',
      code: `<NativeSelect label="Environment" defaultValue="staging">
  <option value="staging">Staging</option>
</NativeSelect>`,
      render: () => (
        <div className="grid max-w-lg gap-6">
          <NativeSelect
            label="Environment"
            defaultValue="staging"
            hint="Renders the operating system’s own list.">
            <option value="dev">Development</option>
            <option value="staging">Staging</option>
            <option value="prod">Production</option>
          </NativeSelect>
          <NativeSelect
            label="Locked"
            disabled>
            <option>Frankfurt</option>
          </NativeSelect>
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
    <>
      <p>
        Reach for this over <code className="text-ink-on-night">Select</code> on long lists and mobile-heavy forms: the
        platform sheet beats any rebuild on a phone, and it costs nothing to maintain.
      </p>
      <p>
        The chevron is decoration with <code className="text-ink-on-night">pointer-events: none</code>, so a click that
        lands on it still opens the list underneath.
      </p>
    </>
  ),
}
