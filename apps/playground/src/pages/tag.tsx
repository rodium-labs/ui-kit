import { Tag } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'tag',
  title: 'Tag',
  summary: 'A bordered chip for a version, a part number, a dimension. Square, like everything else the surface draws.',
  examples: [
    {
      title: 'Default and muted',
      code: `<Tag>v0.0.0</Tag>
<Tag muted>284x76</Tag>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Tag>v0.0.0</Tag>
          <Tag>STM32F401</Tag>
          <Tag muted>284x76</Tag>
          <Tag muted>eu-central-1</Tag>
        </div>
      ),
    },
  ],
  props: [
    [
      'muted',
      'boolean',
      'Steps the ink down one level, for a value that is context rather than content.',
    ],
  ],
  notes: (
    <p>
      A tag is a noun, not a state. Where the label says what something <em>is doing</em> — shipping, failing, queued —{' '}
      <code className="text-ink-on-night">Status</code> is the one that carries it.
    </p>
  ),
}
