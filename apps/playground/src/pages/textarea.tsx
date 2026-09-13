import { Textarea } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'textarea',
  title: 'Textarea',
  summary: 'The same skin as the input, over several lines, resizable on the block axis only.',
  examples: [
    {
      title: 'Default',
      code: `<Textarea label="Release note" rows={4} hint="Markdown is fine here." />`,
      render: () => (
        <div className="max-w-lg">
          <Textarea
            label="Release note"
            placeholder="What changed, and why it matters."
            hint="Markdown is fine here."
          />
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
    [
      'rows',
      'number',
      'Starting height in lines. Default 4.',
    ],
  ],
}
