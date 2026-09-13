import { Facts, Tabs } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const ITEMS = [
  {
    value: 'log',
    label: 'Log',
    panel: (
      <p className="max-w-[52ch] border border-night-frame p-5 text-[14px] leading-[1.65] text-ink-on-night-mid">
        The strip scrolls where it has to, and a disabled tab is skipped rather than focused.
      </p>
    ),
  },
  {
    value: 'env',
    label: 'Environment',
    panel: (
      <div className="border border-night-frame p-5">
        <Facts
          rows={[
            [
              'Region',
              'Frankfurt',
            ],
            [
              'Node',
              '26.5.0',
            ],
            [
              'Bundler',
              'Vite 7',
            ],
          ]}
        />
      </div>
    ),
  },
  {
    value: 'keyboard',
    label: 'Keyboard',
    panel: (
      <p className="max-w-[52ch] border border-night-frame p-5 text-[14px] leading-[1.65] text-ink-on-night-mid">
        Arrow left and right move between tabs and wrap at the ends.
      </p>
    ),
  },
  {
    value: 'off',
    label: 'Disabled',
    disabled: true,
  },
] as const

export const page: DocPage = {
  slug: 'tabs',
  title: 'Tabs',
  summary:
    'One panel at a time. The selected tab draws the same underline the bar’s links draw on hover, so the two read as one idea.',
  examples: [
    {
      title: 'With panels',
      note: 'arrow keys move between them and wrap at the ends',
      code: `<Tabs label="Build" items={[
  { value: 'log', label: 'Log', panel: <Log /> },
]} />`,
      render: () => (
        <Tabs
          label="Build detail"
          items={ITEMS}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly TabItem[]',
      'Each takes a value, a label and an optional panel.',
    ],
    [
      'label',
      'string',
      'Names the tablist. Default "Sections".',
    ],
    [
      'value / defaultValue',
      'string',
      'Controlled or uncontrolled selection.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with the tab picked.',
    ],
  ],
  notes: (
    <p>
      Roving tabindex: the selected tab is the only one in the tab order, and the arrow keys move within the strip. That
      is the ARIA pattern, and it is what keeps Tab moving <em>past</em> the tabs to the panel.
    </p>
  ),
}
