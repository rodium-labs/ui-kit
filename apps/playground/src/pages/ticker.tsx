import { Ticker } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'ticker',
  title: 'Ticker',
  summary:
    'A short list of words. Where the column holds them it is a plain list; where it does not, a copy of it slides past a box its own width.',
  examples: [
    {
      title: 'Five words',
      note: 'narrow the window and it starts moving',
      code: `<Ticker words={['Design', 'Firmware', 'Web', 'Hardware', 'Tooling']} />`,
      render: () => (
        <div className="border-t border-night-rule pt-6">
          <Ticker
            words={[
              'Design',
              'Firmware',
              'Web',
              'Hardware',
              'Tooling',
            ]}
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'words',
      'readonly string[]',
      'The list, in the order it reads.',
    ],
  ],
  notes: (
    <>
      <p>
        The decision is a container query, not a media query: it reads the column the ticker actually sits in, which a
        media query cannot do without guessing at the scrollbar.
      </p>
      <p>
        It stops on hover and on focus, and under a reduced-motion preference it never moves at all — it simply wraps to
        a list.
      </p>
    </>
  ),
}
