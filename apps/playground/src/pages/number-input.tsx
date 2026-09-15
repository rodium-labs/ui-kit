import { NumberInput } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Live() {
  const [replicas, setReplicas] = useState(3)
  const [timeout, setTimeoutValue] = useState(30)
  return (
    <div className="grid max-w-[30rem] gap-6 sm:grid-cols-2">
      <NumberInput
        label="Replicas"
        hint="Between one and ten."
        value={replicas}
        onValueChange={setReplicas}
        min={1}
        max={10}
      />
      <NumberInput
        label="Timeout"
        value={timeout}
        onValueChange={setTimeoutValue}
        min={0}
        step={5}
        unit="s"
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'number-input',
  title: 'Number input',
  nav: 'Number input',
  summary: 'A number with two buttons big enough to press.',
  examples: [
    {
      title: 'Bounded and stepped',
      code: `<NumberInput label="Replicas" value={n} onValueChange={setN} min={1} max={10} />`,
      render: () => <Live />,
    },
  ],
  props: [
    [
      'value / onValueChange',
      'number',
      'Controlled, always.',
    ],
    [
      'min / max',
      'number',
      'The buttons disable at the ends.',
    ],
    [
      'step',
      'number',
      'How far one press moves it. Defaults to 1.',
    ],
    [
      'unit',
      'string',
      'What the number counts, shown after the field.',
    ],
  ],
  notes: (
    <>
      <p>
        It sits on the native number input rather than replacing it, so the arrow keys and the phone keypad come from
        the platform. The browser’s own spinner is hidden: it is a four pixel target nobody can hit.
      </p>
      <p>
        The value rolls to its new reading the way <code className="text-ink-on-night">Stat</code> rolls a digit. Text
        inside a native input cannot be animated, so the roll sits over the field and steps aside the moment it takes
        focus — the real text and the caret come back for as long as you are typing.
      </p>
      <p>
        One press gets the whole roll. While they come faster than a roll can finish — a held arrow key repeats about
        thirty times a second — the digits stop rolling and simply follow the value, and the roll returns the moment you
        let go. Running it faster instead would read as something going wrong, and holding the number back until you
        stop would hide the one thing you are watching to know when to stop.
      </p>
    </>
  ),
}
