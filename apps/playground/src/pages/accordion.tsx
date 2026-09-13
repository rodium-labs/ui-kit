import { Accordion } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const ITEMS = [
  {
    value: 'why',
    title: 'Why the native element?',
    content:
      'It opens and closes before any JavaScript has run, it is in the tab order for free, and it announces its own expanded state.',
  },
  {
    value: 'motion',
    title: 'How does it animate?',
    content:
      'interpolate-size makes auto a transition endpoint, and ::details-content is the box that grows. A CSS animation bound to [open] would only ever run once, because a closed subtree skips style recalculation.',
  },
  {
    value: 'exclusive',
    title: 'Can several be open at once?',
    content: 'Leave single off. Without a shared name each disclosure is independent.',
  },
]

export const page: DocPage = {
  slug: 'accordion',
  title: 'Accordion',
  summary:
    'Stacked disclosures, built on the native element. A shared name makes the group exclusive without a line of script.',
  examples: [
    {
      title: 'One at a time',
      note: 'single passes a shared name to every details',
      code: `<Accordion single items={items} />`,
      render: () => (
        <Accordion
          single
          name="docs-accordion"
          items={ITEMS}
        />
      ),
    },
    {
      title: 'Independent',
      code: `<Accordion items={items} />`,
      render: () => <Accordion items={ITEMS} />,
    },
  ],
  props: [
    [
      'items',
      'readonly AccordionItem[]',
      'Each takes a value, a title and its content.',
    ],
    [
      'single',
      'boolean',
      'Gives every panel one name, so opening one closes the rest.',
    ],
    [
      'name',
      'string',
      'The shared name to use. Default "accordion".',
    ],
  ],
}
