import { Contents } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'contents',
  title: 'Contents',
  summary: 'The way into a long page, sitting on the cover’s baseline.',
  examples: [
    {
      title: 'On this page',
      code: `<Contents items={[{ label: 'specs', href: '#specs' }]} />`,
      render: () => (
        <Contents
          items={[
            {
              label: 'rivers',
              href: '#/contents',
            },
            {
              label: 'screens',
              href: '#/contents',
            },
            {
              label: 'specs',
              href: '#/contents',
            },
            {
              label: 'source',
              href: '#/contents',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly ContentsItem[]',
      'Each takes a label and an href.',
    ],
  ],
  notes: (
    <p>
      The trailing slash is the surface’s own convention and it runs all the way through — section slugs, eyebrows,
      contents links.
    </p>
  ),
}
