import { Spinner } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'spinner',
  title: 'Spinner',
  summary: 'Work with no known end. Under a reduced-motion preference the rotation gives way to an opacity pulse.',
  examples: [
    {
      title: 'Sizes',
      code: `<Spinner size={18} />
<Spinner size={22} className="text-ink-green-on-night" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-5">
          <Spinner size={14} />
          <Spinner size={18} />
          <Spinner
            size={22}
            className="text-ink-green-on-night"
          />
          <span className="text-[13px] text-ink-on-night-dim">Reading the manifest…</span>
        </div>
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
      'label',
      'string',
      'Gives the spinner a title and a role. Omit it where the surrounding text already says.',
    ],
  ],
  notes: (
    <p>
      A spinner on its own says nothing about what is happening. Put it beside text, or inside an{' '}
      <code className="text-ink-on-night">Action</code>, which keeps its label and sets aria-busy.
    </p>
  ),
}
