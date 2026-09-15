import { Prose } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'prose',
  title: 'Prose',
  summary: 'Long-form text that arrives as markup rather than as components.',
  examples: [
    {
      title: 'A changelog entry',
      code: `<Prose dangerouslySetInnerHTML={{ __html: rendered }} />`,
      render: () => (
        <Prose>
          <h2>What changed in 0.2.0</h2>
          <p>
            Ten components the kit did not have, and a palette for charts that was measured rather than picked. The
            accent now means one thing everywhere: <strong>this is the chosen one</strong>.
          </p>
          <h3>Worth knowing</h3>
          <ul>
            <li>
              Every dismissible surface leaves the way it arrived — see <code>Sheet</code> and <code>Dialog</code>.
            </li>
            <li>Selected states no longer share a drawing with hover.</li>
          </ul>
          <blockquote>The measure is capped here, because raw markup never brings one with it.</blockquote>
        </Prose>
      ),
    },
  ],
  props: [
    [
      'children',
      'ReactNode',
      'The markup. Nothing is required of its shape.',
    ],
  ],
  notes: (
    <p>
      The one thing it insists on is the measure. A line that runs the width of a page is the fastest way to make prose
      unreadable, and a string of HTML from a CMS has no opinion about where to stop.
    </p>
  ),
}
