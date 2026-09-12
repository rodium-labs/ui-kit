import { DataTable, Status, Tag } from '@rodium/ui'
import type { DocPage } from '../docs/types'

interface Deploy {
  id: string
  build: string
  branch: string
  region: string
  state: 'live' | 'queued' | 'failed' | 'rolled back'
  duration: number
  size: number
  at: string
}

const DEPLOYS: readonly Deploy[] = [
  {
    id: 'd-128',
    build: '128',
    branch: 'main',
    region: 'fra',
    state: 'live',
    duration: 41,
    size: 344.6,
    at: '2026-09-13 09:12',
  },
  {
    id: 'd-127',
    build: '127',
    branch: 'main',
    region: 'fra',
    state: 'rolled back',
    duration: 39,
    size: 341.2,
    at: '2026-09-13 08:40',
  },
  {
    id: 'd-126',
    build: '126',
    branch: 'feat/docs',
    region: 'ist',
    state: 'failed',
    duration: 12,
    size: 0,
    at: '2026-09-12 22:05',
  },
  {
    id: 'd-125',
    build: '125',
    branch: 'feat/docs',
    region: 'ist',
    state: 'queued',
    duration: 0,
    size: 0,
    at: '2026-09-12 21:58',
  },
  {
    id: 'd-124',
    build: '124',
    branch: 'main',
    region: 'iad',
    state: 'live',
    duration: 44,
    size: 338.9,
    at: '2026-09-12 17:31',
  },
  {
    id: 'd-123',
    build: '123',
    branch: 'fix/slider',
    region: 'fra',
    state: 'rolled back',
    duration: 47,
    size: 337.4,
    at: '2026-09-12 14:02',
  },
  {
    id: 'd-122',
    build: '122',
    branch: 'main',
    region: 'sfo',
    state: 'live',
    duration: 38,
    size: 336.1,
    at: '2026-09-11 11:20',
  },
  {
    id: 'd-121',
    build: '121',
    branch: 'main',
    region: 'fra',
    state: 'failed',
    duration: 9,
    size: 0,
    at: '2026-09-11 10:44',
  },
]

const STATE = {
  live: 'accent',
  queued: 'neutral',
  failed: 'danger',
  'rolled back': 'warm',
} as const

const COLUMNS = [
  {
    key: 'build',
    header: 'Build',
    sortable: true,
    width: '5.5rem',
    render: (row: Deploy) => `#${row.build}`,
  },
  {
    key: 'branch',
    header: 'Branch',
    sortable: true,
    render: (row: Deploy) => <Tag muted>{row.branch}</Tag>,
  },
  {
    key: 'region',
    header: 'Region',
    sortable: true,
  },
  {
    key: 'state',
    header: 'State',
    sortable: true,
    render: (row: Deploy) => <Status tone={STATE[row.state]}>{row.state}</Status>,
  },
  {
    key: 'duration',
    header: 'Build',
    align: 'end' as const,
    sortable: true,
    render: (row: Deploy) => (row.duration === 0 ? '—' : `${row.duration}s`),
  },
  {
    key: 'size',
    header: 'Bundle',
    align: 'end' as const,
    sortable: true,
    render: (row: Deploy) => (row.size === 0 ? '—' : `${row.size.toFixed(1)} kB`),
  },
  {
    key: 'at',
    header: 'Finished',
    align: 'end' as const,
    sortable: true,
  },
]

export const page: DocPage = {
  slug: 'data-table',
  nav: 'Data table',
  title: 'Data table',
  summary:
    'Rows out of a database rather than a hand-written list: sortable columns, numbers aligned to their trailing edge in tabular figures, and a header that holds while the body scrolls.',
  examples: [
    {
      title: 'Sortable',
      note: 'click a header once for ascending, twice for descending, three times for none',
      code: `<DataTable
  columns={columns}
  rows={deploys}
  rowKey={row => row.id}
  caption="deploys"
  stickyHeader
  maxHeight="20rem"
/>`,
      render: () => (
        <DataTable
          columns={COLUMNS}
          rows={DEPLOYS}
          rowKey={row => row.id}
          caption="deploys · last 8"
          stickyHeader
          maxHeight="21rem"
        />
      ),
    },
    {
      title: 'Empty',
      code: `<DataTable columns={columns} rows={[]} rowKey={r => r.id}
  empty="No deploys in this window." />`,
      render: () => (
        <DataTable
          columns={COLUMNS.slice(0, 4)}
          rows={[]}
          rowKey={(row: Deploy) => row.id}
          empty="No deploys in this window."
        />
      ),
    },
  ],
  props: [
    [
      'columns',
      'readonly Column<Row>[]',
      'key, header and optionally align, width, sortable, render, sortValue.',
    ],
    [
      'rows',
      'readonly Row[]',
      'The data. Never sorted in place — the table copies before it sorts.',
    ],
    [
      'rowKey',
      '(row: Row) => string',
      'A stable identity per row. Required.',
    ],
    [
      'stickyHeader',
      'boolean',
      'Holds the header while the body scrolls.',
    ],
    [
      'maxHeight',
      'string',
      'Any CSS length. Turns the body into the scroller.',
    ],
    [
      'empty',
      'ReactNode',
      'What no rows says.',
    ],
  ],
  notes: (
    <>
      <p>
        The sorted column carries <code className="text-ink-on-night">aria-sort</code>, so the order is announced rather
        than only drawn. The arrow is a second cue beside the colour.
      </p>
      <p>
        Numbers sit at the trailing edge in tabular figures, which is what lets the eye compare magnitudes down a column
        instead of reading every value.
      </p>
      <p>
        For a short specification rather than a dataset, <code className="text-ink-on-night">Table</code> is the simpler
        one: hairline rows, no sorting, no header chrome.
      </p>
    </>
  ),
}
