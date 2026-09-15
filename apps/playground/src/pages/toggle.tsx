import { Toggle } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Pair() {
  const [wrap, setWrap] = useState(true)
  const [numbers, setNumbers] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle
        pressed={wrap}
        onPressedChange={setWrap}>
        Wrap lines
      </Toggle>
      <Toggle
        pressed={numbers}
        onPressedChange={setNumbers}>
        Line numbers
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => {}}
        disabled>
        Minimap
      </Toggle>
    </div>
  )
}

export const page: DocPage = {
  slug: 'toggle',
  title: 'Toggle',
  summary: 'A button that stays down. For a setting you flip and see the result of immediately.',
  examples: [
    {
      title: 'Pressed and not',
      code: `<Toggle pressed={wrap} onPressedChange={setWrap}>Wrap lines</Toggle>`,
      render: () => <Pair />,
    },
    {
      title: 'Small',
      code: `<Toggle size="sm" pressed onPressedChange={fn}>Bold</Toggle>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Toggle
            size="sm"
            pressed
            onPressedChange={() => {}}>
            Bold
          </Toggle>
          <Toggle
            size="sm"
            pressed={false}
            onPressedChange={() => {}}>
            Italic
          </Toggle>
        </div>
      ),
    },
  ],
  props: [
    [
      'pressed',
      'boolean',
      'Whether it is down. Announced through aria-pressed.',
    ],
    [
      'onPressedChange',
      '(pressed: boolean) => void',
      'Called with the value it is moving to.',
    ],
    [
      'size',
      "'sm' | 'md'",
      'Defaults to md, which clears the 44px touch target.',
    ],
    [
      'icon',
      'ReactNode',
      'Sits before the label, hidden from the accessibility tree.',
    ],
  ],
  notes: (
    <p>
      Reach for <code className="text-ink-on-night">Switch</code> where the change is a preference that is saved, and
      this where it is a view setting you are adjusting while looking at the thing it affects.
    </p>
  ),
}
