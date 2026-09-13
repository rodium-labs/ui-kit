import { Facts } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'facts',
  title: 'Facts',
  summary: 'Label left, value right, one hairline between. The numbers are the argument.',
  examples: [
    {
      title: 'A specification',
      code: `<Facts rows={[['Panel', '284x76'], ['MCU', 'STM32F401']]} />`,
      render: () => (
        <Facts
          rows={[
            [
              'Panel',
              '284x76',
            ],
            [
              'MCU',
              'STM32F401',
            ],
            [
              'Framebuffer',
              'none',
            ],
            [
              'Themes',
              '16',
            ],
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'rows',
      'readonly [string, ReactNode][]',
      'Label and value per row.',
    ],
  ],
  notes: (
    <p>
      Values are set in tabular figures, so a column of numbers lines up on its digits and the eye can compare
      magnitudes down it.
    </p>
  ),
}
