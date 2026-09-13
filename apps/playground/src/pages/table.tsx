import { Table } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'table',
  title: 'Table',
  summary:
    'A row of hairlines rather than a boxed grid. The first cell names the row, and each column after it steps one level down the ink scale.',
  examples: [
    {
      title: 'With a caption',
      code: `<Table caption="in use" rows={[['PA5', 'SPI1_SCK', 'panel clock']]} />`,
      render: () => (
        <Table
          caption="in use"
          rows={[
            [
              'PA5',
              'SPI1_SCK',
              'panel clock',
            ],
            [
              'PA7',
              'SPI1_MOSI',
              'panel data',
            ],
            [
              'PB0',
              'GPIO',
              'panel reset',
            ],
            [
              'PB1',
              'GPIO',
              'panel chip select',
            ],
          ]}
        />
      ),
    },
    {
      title: 'With a head',
      render: () => (
        <Table
          head={[
            'token',
            'value',
            'role',
          ]}
          rows={[
            [
              'night-edge',
              '0.38',
              'around a control',
            ],
            [
              'night-frame',
              '0.10',
              'around a panel',
            ],
            [
              'night-rule',
              '0.08',
              'between sections',
            ],
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'rows',
      'readonly ReactNode[][]',
      'The first cell of each row becomes its row header.',
    ],
    [
      'head',
      'readonly string[]',
      'Optional column headers.',
    ],
    [
      'caption',
      'string',
      'Sits above the table, set in the surface’s uppercase.',
    ],
  ],
  notes: (
    <p>
      For rows out of a database rather than a short specification, <code className="text-ink-on-night">DataTable</code>{' '}
      is the one with sorting, a sticky header and numeric alignment.
    </p>
  ),
}
