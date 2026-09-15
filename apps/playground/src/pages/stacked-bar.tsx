import { StackedBar } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'stacked-bar',
  title: 'Stacked bar',
  nav: 'Stacked bar',
  summary: 'Part to whole in one bar, with the shares written out rather than estimated from a wedge.',
  examples: [
    {
      title: 'Where the build time goes',
      code: `<StackedBar title="Build time" parts={[
  { name: 'Compile', value: 128 },
  { name: 'Test', value: 74 },
]} />`,
      render: () => (
        <StackedBar
          title="Build time"
          caption="Seconds, median of the last fifty runs."
          parts={[
            {
              name: 'Compile',
              value: 128,
            },
            {
              name: 'Test',
              value: 74,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'parts',
      'StackedPart[]',
      'name and value. Two is the ceiling the palette was validated for.',
    ],
  ],
  notes: (
    <>
      <p>
        The segments are separated by a gap in the ground rather than by a stroke. A border around each one adds ink
        that is not data, and on black it reads as a seam.
      </p>
      <p>
        There is no pie chart in the kit. A pie of two slices is a worse version of this, and a pie of eight is a table
        nobody can read.
      </p>
    </>
  ),
}
