import { Status } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'status',
  title: 'Status',
  summary:
    'A label that carries a state. It is set rather than boxed, because a filled pill would be the only rounded thing on the surface.',
  examples: [
    {
      title: 'Tones',
      code: `<Status>Shipping</Status>
<Status tone="danger">Failing</Status>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-6">
          <Status>Shipping</Status>
          <Status tone="neutral">Archived</Status>
          <Status tone="warm">Preview</Status>
          <Status tone="danger">Failing</Status>
        </div>
      ),
    },
    {
      title: 'In a heading row',
      note: 'where it usually lives',
      render: () => (
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-ink-on-night">Waltz</h3>
          <span className="text-[13px] text-ink-on-night-dim tabular-nums">2025</span>
          <Status className="ms-auto">Shipping</Status>
        </div>
      ),
    },
  ],
  props: [
    [
      'tone',
      "'accent' | 'neutral' | 'warm' | 'danger'",
      'Default accent.',
    ],
  ],
  notes: (
    <p>
      The word is the meaning; the hue only reinforces it. "Failing" in red and "Failing" in grey say the same thing to
      a reader who cannot tell them apart.
    </p>
  ),
}
