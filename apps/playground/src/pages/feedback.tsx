import { Action, EmptyState, Progress, Skeleton, Spinner } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const progressPage: DocPage = {
  slug: 'progress',
  title: 'Progress',
  summary: 'How far along something is. A hairline track with the accent filling it.',
  examples: [
    {
      title: 'With a label',
      code: `<Progress value={28} label="Bundle" showValue />`,
      render: () => (
        <div className="flex max-w-md flex-col gap-8">
          <Progress
            value={28}
            label="Bundle"
            showValue
          />
          <Progress
            value={76}
            label="Upload"
            showValue
          />
          <Progress value={100} />
        </div>
      ),
    },
  ],
  props: [
    [
      'value',
      'number',
      'The current amount.',
    ],
    [
      'max',
      'number',
      'Default 100.',
    ],
    [
      'label',
      'string',
      'Names the bar, for sighted readers and for aria-label.',
    ],
    [
      'showValue',
      'boolean',
      'Prints the percentage beside the label.',
    ],
  ],
  notes: (
    <p>
      The track is set a step dimmer than a control edge on purpose: what has to stay distinguishable is the fill
      against the track, and a control-weight track drops that pair to 2:1.
    </p>
  ),
}

export const spinnerPage: DocPage = {
  slug: 'spinner',
  title: 'Spinner',
  summary: 'Work with no known end. Under a reduced-motion preference the rotation gives way to an opacity pulse.',
  examples: [
    {
      title: 'Sizes',
      code: `<Spinner size={18} />
<Spinner size={22} className="text-ink-green-on-night" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-5">
          <Spinner size={14} />
          <Spinner size={18} />
          <Spinner
            size={22}
            className="text-ink-green-on-night"
          />
          <span className="text-[13px] text-ink-on-night-dim">Reading the manifest…</span>
        </div>
      ),
    },
  ],
  props: [
    [
      'size',
      'number',
      'Edge length in pixels. Default 16.',
    ],
    [
      'label',
      'string',
      'Gives the spinner a title and a role. Omit it where the surrounding text already says.',
    ],
  ],
}

export const skeletonPage: DocPage = {
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
}

export const emptyStatePage: DocPage = {
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
