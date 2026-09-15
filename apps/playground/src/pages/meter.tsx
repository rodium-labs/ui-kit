import { Meter } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'meter',
  title: 'Meter',
  summary: 'One ratio against a limit, with the numbers written out rather than estimated from a wedge.',
  examples: [
    {
      title: 'A quota',
      code: `<Meter title="Requests" value={18400} limit={25000} unit="this month" />`,
      render: () => (
        <div className="grid gap-8 sm:grid-cols-2">
          <Meter
            title="Requests"
            caption="Resets on the first of the month."
            value={18400}
            limit={25000}
          />
          <Meter
            title="Storage"
            caption="Across every project."
            value={41}
            limit={100}
            unit="GB"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'value',
      'number',
      'Where it stands.',
    ],
    [
      'limit',
      'number',
      'What it is measured against.',
    ],
    [
      'unit',
      'string',
      'What the numbers count.',
    ],
  ],
  notes: (
    <>
      <p>
        It announces itself as a meter, with its value and both bounds. The element of that name would have been the
        better answer and is not usable here: Chrome ignores its parts and paints a lime green that belongs to no part
        of this surface, with or without <code className="text-ink-on-night">appearance: none</code>.
      </p>
      <p>
        This is the answer to a ratio, not a pie of two slices. Reach for{' '}
        <code className="text-ink-on-night">Progress</code> where something is running and will finish.
      </p>
    </>
  ),
}
