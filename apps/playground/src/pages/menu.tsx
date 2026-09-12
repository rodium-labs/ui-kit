import { Menu } from '@rodium/ui'
import type { DocPage } from '../docs/types'

const ITEMS = [
  {
    label: 'Open in editor',
    href: '#/menu',
  },
  {
    label: 'Copy link',
    href: '#/menu',
  },
  {
    label: 'Duplicate',
    href: '#/menu',
  },
  {
    label: 'Delete',
    href: '#/menu',
    danger: true,
  },
]

export const page: DocPage = {
  slug: 'menu',
  title: 'Menu',
  summary:
    'A dropdown built on the native disclosure. The shared script closes it on a pick, on escape and on a tap outside; everything else is the browser.',
  examples: [
    {
      title: 'Aligned to its trigger',
      note: 'end alignment keeps it inside a right-hand column',
      code: `<Menu label="Actions" items={items} />
<Menu label="Actions" items={items} align="end" />`,
      render: () => (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Menu
            label="Actions"
            items={ITEMS}
          />
          <Menu
            label="Actions"
            items={ITEMS}
            align="end"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'string',
      'The trigger text.',
    ],
    [
      'items',
      'readonly MenuItem[]',
      'Each item takes a label and either an href or an onSelect.',
    ],
    [
      'align',
      "'start' | 'end'",
      'Which edge the sheet hangs from. Default start.',
    ],
  ],
  notes: (
    <>
      <p>
        Because it is a <code className="text-ink-on-night">&lt;details&gt;</code>, the menu opens and closes before any
        JavaScript has run. That is the whole reason to build it this way.
      </p>
      <p>
        A danger item is set in the danger hue and reads as destructive. Reserve it for actions that actually destroy
        something; a semantic colour used against its meaning is worse than no colour at all.
      </p>
    </>
  ),
}
