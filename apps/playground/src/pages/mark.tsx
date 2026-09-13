import { Mark } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'mark',
  title: 'Mark',
  summary: 'The Rodium Labs mark. One corner in the brand gradient, an R drawn from rectangles, and nothing else.',
  examples: [
    {
      title: 'Sizes',
      code: `<Mark size={24} title="Rodium Labs" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-6 text-ink-on-night">
          <Mark size={16} />
          <Mark size={24} />
          <Mark size={40} />
          <Mark size={64} />
        </div>
      ),
    },
    {
      title: 'In a wordmark',
      code: `<span className="flex items-center gap-2.5">
  <Mark size={18} />
  <span className="text-[15px] font-semibold">Rodium Labs</span>
</span>`,
      render: () => (
        <span className="flex items-center gap-2.5 text-ink-on-night">
          <Mark size={18} />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Rodium Labs</span>
        </span>
      ),
    },
  ],
  props: [
    [
      'size',
      'number',
      'Edge length in pixels. Default 16.',
    ],
    [
      'title',
      'string',
      'Gives the mark a name and an img role. Without one it is decorative and hidden.',
    ],
  ],
  notes: (
    <p>
      The R takes <code className="text-ink-on-night">currentColor</code>, so it inherits from whatever it sits in. Only
      the corner is painted, and it runs from the accent to the warm hue.
    </p>
  ),
}
