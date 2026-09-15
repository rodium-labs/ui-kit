import { Action, Card, Status, Tag } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'card',
  title: 'Card',
  summary:
    'A bordered surface for one thing: a repository, a run, a device. It has no elevation, because this ground has nothing to be raised off.',
  examples: [
    {
      title: 'With a footer',
      code: `<Card
  title="edge-router"
  description="Ingress for the eu-central cluster."
  action={<Status>live</Status>}
  footer={<Tag muted>v2.4.1</Tag>}
/>`,
      render: () => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            title="edge-router"
            description="Ingress for the eu-central cluster. Terminates TLS and fans out to the pool."
            action={<Status>live</Status>}
            footer={<Tag muted>v2.4.1</Tag>}
          />
          <Card
            title="batch-runner"
            description="Picks jobs off the queue and reports back on the same channel."
            action={<Status tone="warm">draining</Status>}
            footer={<Tag muted>v1.9.0</Tag>}
          />
        </div>
      ),
    },
    {
      title: 'The whole card as a link',
      note: 'hover it',
      code: `<Card href="/docs/tokens" title="Tokens" description="Colour, type and motion." />`,
      render: () => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            href="#/tokens"
            title="Tokens"
            description="Every colour, type step and motion value the kit draws from."
          />
          <Card
            href="#/installation"
            title="Installation"
            description="Two packages, one stylesheet import and the Tailwind source line."
          />
        </div>
      ),
    },
    {
      title: 'Free content',
      code: `<Card title="Quota">
  <p>18,400 of 25,000 requests this month.</p>
</Card>`,
      render: () => (
        <Card
          title="Quota"
          action={
            <Action
              size="sm"
              tone="ghost">
              Manage
            </Action>
          }
          footer={<span className="text-[12px] text-ink-on-night-dim">Resets on the first of the month</span>}>
          18,400 of 25,000 requests this month. The overage rate applies from the next call after the limit.
        </Card>
      ),
    },
  ],
  props: [
    [
      'title',
      'ReactNode',
      'The name of the thing. Rendered as a heading.',
    ],
    [
      'description',
      'ReactNode',
      'One or two lines under the title.',
    ],
    [
      'action',
      'ReactNode',
      'Sits opposite the title: a status, a tag, a menu.',
    ],
    [
      'media',
      'ReactNode',
      'Fills the width above the text, inside the border.',
    ],
    [
      'footer',
      'ReactNode',
      'A bordered strip at the bottom.',
    ],
    [
      'href',
      'string',
      'Makes the whole card one link rather than a box with a link in it.',
    ],
    [
      'external',
      'boolean',
      'Opens the link in a new tab, with the rel that belongs to it.',
    ],
  ],
  notes: (
    <p>
      The linked form is a single anchor. A card with a link inside it gives the pointer a target smaller than the thing
      that looks clickable, and on a phone that gap is most of the card.
    </p>
  ),
}
