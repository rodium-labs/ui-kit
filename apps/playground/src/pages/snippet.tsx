import { Snippet } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'snippet',
  title: 'Snippet',
  summary: 'One line you are meant to take away with you, and a button that takes it.',
  examples: [
    {
      title: 'A command and a key',
      note: 'press copy',
      code: `<Snippet value="bun add @rodium-labs/ui" label="install command" />`,
      render: () => (
        <div className="flex flex-col gap-3">
          <Snippet
            value="bun add @rodium-labs/ui @rodium-labs/tokens"
            label="install command"
          />
          <Snippet
            value="rl_live_8f2c94a1d7e34b6f"
            label="API key"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'value',
      'string',
      'The thing to copy, which is also the thing shown.',
    ],
    [
      'label',
      'string',
      'What it is, for the copy button’s name.',
    ],
  ],
  notes: (
    <p>
      The button announces what happened in a live region rather than only swapping its glyph. A tick that appears and
      says nothing is a state change carried by a picture alone.
    </p>
  ),
}
