import { Pagination } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [page, setPage] = useState(3)
  return (
    <div className="flex flex-col gap-4">
      <Pagination
        page={page}
        pages={12}
        onPageChange={setPage}
      />
      <p className="text-[13px] text-ink-on-night-dim">
        Page <span className="text-ink-on-night tabular-nums">{page}</span> of 12
      </p>
    </div>
  )
}

export const page: DocPage = {
  slug: 'pagination',
  title: 'Pagination',
  summary:
    'A window of at most five pages, so the row never grows past its column however many pages there turn out to be.',
  examples: [
    {
      title: 'Controlled',
      note: 'the window follows the current page',
      code: `const [page, setPage] = useState(1)

<Pagination page={page} pages={12} onPageChange={setPage} />`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'page',
      'number',
      'The current page, 1-based.',
    ],
    [
      'pages',
      'number',
      'How many there are in total.',
    ],
    [
      'onPageChange',
      '(page: number) => void',
      'Called with the page picked.',
    ],
  ],
  notes: (
    <p>
      The current page carries <code className="text-ink-on-night">aria-current="page"</code> as well as the filled
      treatment, so the position is not held by colour alone. The steps are icon-only and named for screen readers.
    </p>
  ),
}
