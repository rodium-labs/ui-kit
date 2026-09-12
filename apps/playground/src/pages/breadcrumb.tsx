import { Breadcrumb } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'breadcrumb',
  title: 'Breadcrumb',
  summary: 'Where this page sits. The last crumb is where you are, so it is text rather than a link back to itself.',
  examples: [
    {
      title: 'A trail',
      code: `<Breadcrumb
  items={[
    { label: 'Rodium Labs', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Waltz' },
  ]}
/>`,
      render: () => (
        <Breadcrumb
          items={[
            {
              label: 'Rodium Labs',
              href: '#/introduction',
            },
            {
              label: 'Work',
              href: '#/introduction',
            },
            {
              label: 'Waltz',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly Crumb[]',
      'Each crumb takes a label and an optional href.',
    ],
  ],
  notes: (
    <p>
      The trail is a <code className="text-ink-on-night">&lt;nav&gt;</code> holding an ordered list, and the final crumb
      carries <code className="text-ink-on-night">aria-current="page"</code>. The separators are decoration and are
      hidden from the accessibility tree.
    </p>
  ),
}
