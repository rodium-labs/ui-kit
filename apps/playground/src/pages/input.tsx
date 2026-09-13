import { Input, Search } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'input',
  title: 'Input',
  summary:
    'A single-line field. The label, hint and error come from one Field wrapper that owns the ids and the aria-describedby wiring, so the three never drift apart.',
  examples: [
    {
      title: 'Label and hint',
      code: `<Input label="Name" placeholder="Ada Lovelace" hint="As it should appear on the invoice." />`,
      render: () => (
        <div className="grid max-w-lg gap-6">
          <Input
            label="Name"
            placeholder="Ada Lovelace"
            hint="As it should appear on the invoice."
          />
          <Input
            label="Search"
            type="search"
            placeholder="Find a component"
            icon={<Search size={14} />}
          />
        </div>
      ),
    },
    {
      title: 'Error',
      note: 'the message says how to fix it, not what is wrong',
      code: `<Input
  label="Email"
  type="email"
  error="Enter an address that includes an @, like name@example.com."
  required
/>`,
      render: () => (
        <div className="max-w-lg">
          <Input
            label="Email"
            type="email"
            defaultValue="not-an-email"
            error="Enter an address that includes an @, like name@example.com."
            required
          />
        </div>
      ),
    },
    {
      title: 'Disabled',
      code: `<Input label="Workspace" defaultValue="rodium-labs" disabled />`,
      render: () => (
        <div className="max-w-lg">
          <Input
            label="Workspace"
            defaultValue="rodium-labs"
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
      'The visible label, bound to the input.',
    ],
    [
      'hint',
      'ReactNode',
      'Sits under the field and is referenced by aria-describedby.',
    ],
    [
      'error',
      'ReactNode',
      'Replaces the hint, sets aria-invalid and reddens the edge.',
    ],
    [
      'icon',
      'ReactNode',
      'Sits inside the leading edge of the field.',
    ],
    [
      'fieldClassName',
      'string',
      'Classes for the wrapper rather than the input.',
    ],
  ],
  notes: (
    <>
      <p>
        The field renders at 16px below 640px and 14px above it. iOS Safari zooms the whole page when a focused input is
        under 16px, and that zoom does not come back on its own.
      </p>
      <p>A placeholder is an example of the format, never the label. Every field keeps a visible one.</p>
    </>
  ),
}
