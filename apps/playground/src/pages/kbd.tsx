import { Kbd } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'kbd',
  title: 'Kbd',
  summary: 'A key, as printed on the keyboard. The native element, so a screen reader announces it as input.',
  examples: [
    {
      title: 'In a sentence',
      code: `Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to search.`,
      render: () => (
        <p className="flex flex-wrap items-center gap-1.5 text-[15px] leading-[1.8] text-ink-on-night-mid">
          Press <Kbd>⌘</Kbd>
          <Kbd>K</Kbd> to search, <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> to move and <Kbd>esc</Kbd> to close.
        </p>
      ),
    },
  ],
  props: [
    [
      'className',
      'string',
      'Everything else is a native kbd element.',
    ],
  ],
  notes: (
    <p>
      Write the key as it is printed on the keyboard the reader has. A shortcut that says ⌘ on Windows is worse than no
      shortcut hint at all.
    </p>
  ),
}
