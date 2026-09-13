import { Action, EmptyState } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'empty-state',
  nav: 'Empty state',
  title: 'Empty state',
  summary: 'What this place is, how it fills and one clear next action.',
  examples: [
    {
      title: 'Nothing here yet',
      code: `<EmptyState title="No deploys yet" action={<Action>Create a deploy</Action>}>
  Deploys keep a build, its logs and the traffic it served together.
</EmptyState>`,
      render: () => (
        <EmptyState
          title="No deploys yet"
          action={<Action href="#/empty-state">Create a deploy</Action>}>
          Deploys keep a build, its logs and the traffic it served together.
        </EmptyState>
      ),
    },
    {
      title: 'Nothing matched',
      note: 'name the query and offer the way out',
      render: () => (
        <EmptyState
          title="No results for “quarterly”"
          action={
            <Action
              tone="quiet"
              href="#/empty-state">
              Clear filters
            </Action>
          }>
          Try a shorter term, or clear the filters to see everything again.
        </EmptyState>
      ),
    },
  ],
  props: [
    [
      'title',
      'ReactNode',
      'What is missing.',
    ],
    [
      'children',
      'ReactNode',
      'What this place is for.',
    ],
    [
      'action',
      'ReactNode',
      'The one next step.',
    ],
    [
      'icon',
      'ReactNode',
      'Optional, and decorative.',
    ],
  ],
  notes: (
    <p>
      Never park standing information in an empty state. It disappears the moment content exists, taking whatever you
      wrote there with it.
    </p>
  ),
}
