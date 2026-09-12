import { Action, CommandPalette, Kbd } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

const ITEMS = [
  {
    id: 'action',
    label: 'Action',
    group: 'Actions',
    hint: 'action',
    keywords: 'button link',
    onSelect: () => undefined,
  },
  {
    id: 'input',
    label: 'Input',
    group: 'Forms',
    hint: 'input',
    keywords: 'field text',
    onSelect: () => undefined,
  },
  {
    id: 'select',
    label: 'Select',
    group: 'Forms',
    hint: 'select',
    keywords: 'combobox listbox',
    onSelect: () => undefined,
  },
  {
    id: 'dialog',
    label: 'Dialog',
    group: 'Feedback',
    hint: 'dialog',
    keywords: 'modal',
    onSelect: () => undefined,
  },
  {
    id: 'toast',
    label: 'Toast',
    group: 'Feedback',
    hint: 'toast',
    keywords: 'notification',
    onSelect: () => undefined,
  },
]

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <Action
        tone="quiet"
        onClick={() => setOpen(true)}>
        Open the palette
      </Action>
      <p className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-on-night-dim">
        Or press <Kbd>⌘</Kbd>
        <Kbd>K</Kbd> anywhere on this site — the real one is already listening.
      </p>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        placeholder="Search components…"
        label="Search components"
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'command-palette',
  nav: 'Command palette',
  title: 'Command palette',
  summary:
    'One field driving a list. It opens on the platform shortcut and on a bare slash, ranks matches by where they hit, and keeps focus in the input the whole time.',
  examples: [
    {
      title: 'The palette',
      note: 'arrows move, enter opens, escape closes',
      code: `const [open, setOpen] = useState(false)

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={pages.map(p => ({
    id: p.slug, label: p.title, group: p.section,
    onSelect: () => go(p.slug),
  }))}
/>`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'open / onOpenChange',
      'boolean / (open: boolean) => void',
      'Controlled, always.',
    ],
    [
      'items',
      'readonly CommandItem[]',
      'id, label, onSelect, and optionally group, hint and keywords.',
    ],
    [
      'placeholder',
      'string',
      'Default "Search…".',
    ],
    [
      'empty',
      'ReactNode',
      'What no match says.',
    ],
  ],
  notes: (
    <>
      <p>
        Ranking is by where the query lands: an exact label first, then a label that starts with it, then one that
        contains it, then the group, keywords and hint. Nothing fuzzy — a docs index is small enough that a predictable
        order beats a clever one.
      </p>
      <p>
        The shortcut listens on the document, so it works wherever the reader is. The bare slash is ignored while they
        are typing in a field, which is the one case where it would be infuriating.
      </p>
      <p>
        It is the native dialog underneath, so the top layer, the focus trap and escape are the browser's. The input
        holds focus and <code className="text-ink-on-night">aria-activedescendant</code> names the highlighted row.
      </p>
    </>
  ),
}
