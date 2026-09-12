import { Menu } from '@rodium/ui'
import type { DocPage } from '../docs/types'

const GROUPS = [
  {
    items: [
      {
        label: 'Open in editor',
        href: '#/menu',
        shortcut: '⌘O',
      },
      {
        label: 'Copy link',
        href: '#/menu',
        shortcut: '⌘L',
      },
      {
        label: 'Duplicate',
        href: '#/menu',
      },
    ],
  },
  {
    label: 'Deploy',
    items: [
      {
        label: 'Promote to production',
        href: '#/menu',
      },
      {
        label: 'Roll back',
        href: '#/menu',
      },
      {
        label: 'Pause builds',
        disabled: true,
      },
    ],
  },
  {
    items: [
      {
        label: 'Delete project',
        href: '#/menu',
        danger: true,
        shortcut: '⌫',
      },
    ],
  },
]

export const page: DocPage = {
  slug: 'menu',
  title: 'Menu',
  summary:
    'A dropdown on the native disclosure. It arrives from just above its trigger, closes on a pick, on escape and on a pointer outside, and groups its rows with hairlines rather than headings where none are needed.',
  examples: [
    {
      title: 'Grouped',
      note: 'shortcuts sit at the trailing edge',
      code: `<Menu
  label="Actions"
  groups={[
    { items: [{ label: 'Copy link', href: '/l', shortcut: '⌘L' }] },
    { label: 'Deploy', items: [{ label: 'Roll back', href: '/r' }] },
    { items: [{ label: 'Delete project', danger: true }] },
  ]}
/>`,
      render: () => (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Menu
            label="Actions"
            groups={GROUPS}
          />
          <Menu
            label="Actions"
            groups={GROUPS}
            align="end"
          />
        </div>
      ),
    },
    {
      title: 'Flat',
      code: `<Menu label="Sort" items={[{ label: 'Newest', href: '/n' }]} />`,
      render: () => (
        <Menu
          label="Sort"
          items={[
            {
              label: 'Newest first',
              href: '#/menu',
            },
            {
              label: 'Oldest first',
              href: '#/menu',
            },
            {
              label: 'Largest bundle',
              href: '#/menu',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'label',
      'string',
      'The trigger text.',
    ],
    [
      'items',
      'readonly MenuItem[]',
      'A flat menu. Each item takes a label and either an href or an onSelect.',
    ],
    [
      'groups',
      'readonly MenuGroup[]',
      'Sections, each with optional label. Takes precedence over items.',
    ],
    [
      'align',
      "'start' | 'end'",
      'Which edge the sheet hangs from. Default start.',
    ],
    [
      'MenuItem · shortcut',
      'string',
      'Printed at the trailing edge. Display only — bind the key yourself.',
    ],
    [
      'MenuItem · danger / disabled',
      'boolean',
      'Destructive tone, or out of reach.',
    ],
  ],
  notes: (
    <>
      <p>
        Because it is a <code className="text-ink-on-night">&lt;details&gt;</code>, the menu opens and closes without
        any state of ours, and the trigger announces its own expanded state.
      </p>
      <p>
        Dismissal comes from <code className="text-ink-on-night">useMenuDismiss</code>. That behaviour used to ship as a
        string injected through <code className="text-ink-on-night">dangerouslySetInnerHTML</code>, which React never
        executes on the client — so outside clicks did nothing until it became a hook.
      </p>
      <p>
        A danger row is set in the danger hue and reads as destructive. Reserve it for actions that actually destroy
        something.
      </p>
    </>
  ),
}
