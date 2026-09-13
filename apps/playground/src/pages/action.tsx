import { Action, Search } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'action',
  title: 'Action',
  summary:
    'One control for every way forward. The solid one is the way forward and there is one per screen; the arrow leans out of a link on hover and focus, and the whole control takes the press.',
  examples: [
    {
      title: 'Tones',
      note: 'a link carries the arrow, a button does not',
      code: `<Action href="/work">See the work</Action>
<Action href={REPO} tone="quiet" external>Read the source</Action>
<Action tone="ghost">Skip</Action>
<Action tone="danger">Delete</Action>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Action href="#/action">See the work</Action>
          <Action
            href="#/action"
            tone="quiet">
            Read the source
          </Action>
          <Action tone="ghost">Skip</Action>
          <Action tone="danger">Delete</Action>
        </div>
      ),
    },
    {
      title: 'Sizes',
      code: `<Action size="sm">Small</Action>
<Action size="md">Medium</Action>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Action
            href="#/action"
            size="sm">
            Small
          </Action>
          <Action href="#/action">Medium</Action>
        </div>
      ),
    },
    {
      title: 'With an icon',
      code: `<Action tone="quiet" icon={<Search size={14} />}>Search</Action>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Action>Submit</Action>
          <Action
            tone="quiet"
            icon={<Search size={14} />}>
            Search
          </Action>
          <Action
            tone="quiet"
            arrow>
            With an arrow
          </Action>
        </div>
      ),
    },
    {
      title: 'States',
      note: 'loading disables the control and marks it busy',
      code: `<Action loading>Saving</Action>
<Action disabled>Disabled</Action>
<Action full>Full width</Action>`,
      render: () => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Action loading>Saving</Action>
            <Action
              tone="quiet"
              loading>
              Building
            </Action>
            <Action disabled>Disabled</Action>
            <Action
              tone="quiet"
              disabled>
              Disabled
            </Action>
          </div>
          <div className="max-w-sm">
            <Action full>Full width</Action>
          </div>
        </div>
      ),
    },
  ],
  props: [
    [
      'tone',
      "'solid' | 'quiet' | 'ghost' | 'danger'",
      'How much weight the action carries. Default solid.',
    ],
    [
      'size',
      "'sm' | 'md'",
      'Default md, which is 44px tall.',
    ],
    [
      'href',
      'string',
      'Renders an anchor instead of a button, and turns the arrow on.',
    ],
    [
      'external',
      'boolean',
      'On a link, opens in a new tab with rel="noreferrer".',
    ],
    [
      'arrow',
      'boolean',
      'Overrides the default: on for a link, off for a button.',
    ],
    [
      'loading',
      'boolean',
      'Swaps the icon for a spinner, disables the control and sets aria-busy.',
    ],
    [
      'icon',
      'ReactNode',
      'Sits before the label.',
    ],
    [
      'full',
      'boolean',
      'Fills the inline axis.',
    ],
  ],
  notes: (
    <>
      <p>
        The solid tone carries a border it never paints. Forced-colours mode throws the fill away, and without an edge
        the primary action stops looking like one.
      </p>
      <p>
        A disabled action is natively <code className="text-ink-on-night">disabled</code>, so it leaves the tab order.
        Where it should stay focusable to explain itself, pass <code className="text-ink-on-night">aria-disabled</code>{' '}
        instead and block the behaviour yourself.
      </p>
    </>
  ),
}
