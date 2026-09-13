import { Skeleton } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'skeleton',
  title: 'Skeleton',
  summary: 'The shape of content that has not arrived. Hidden from the accessibility tree, because it says nothing.',
  examples: [
    {
      title: 'A loading card',
      code: `<Skeleton className="h-4 w-2/3" />`,
      render: () => (
        <div className="flex max-w-sm flex-col gap-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-1 h-20 w-full" />
        </div>
      ),
    },
  ],
  props: [
    [
      'className',
      'string',
      'Set the size and any placement here.',
    ],
  ],
  notes: (
    <p>
      Shape it like the content it stands in for. A skeleton that does not match what arrives is a layout shift the
      reader watches happen.
    </p>
  ),
}
