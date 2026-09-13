import { Switch } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [on, setOn] = useState(true)
  return (
    <div className="flex flex-col gap-5">
      <Switch
        label="Notify the channel"
        hint="Posts once the deploy is green."
        checked={on}
        onChange={event => setOn(event.target.checked)}
      />
      <Switch
        label="Collect anonymous usage"
        defaultChecked={false}
      />
      <Switch
        label="Locked by policy"
        disabled
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'switch',
  title: 'Switch',
  summary:
    'An immediate setting. It applies the moment it moves, which is what separates it from a checkbox in a form.',
  examples: [
    {
      title: 'Controlled and uncontrolled',
      code: `<Switch label="Notify the channel" checked={on} onChange={e => setOn(e.target.checked)} />`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'Sits beside the track and shares its target.',
    ],
    [
      'hint',
      'ReactNode',
      'Sits under the label.',
    ],
    [
      'checked / defaultChecked',
      'boolean',
      'Controlled or uncontrolled.',
    ],
  ],
  notes: (
    <>
      <p>
        Label a switch for what happens when it is on. "Send read receipts" lets a reader infer the off state; "Don't
        send read receipts" turns the control into a double negative.
      </p>
      <p>
        The role is <code className="text-ink-on-night">switch</code>, which has to carry its own{' '}
        <code className="text-ink-on-night">aria-checked</code>, so the on state is mirrored in React while the native
        checked attribute still drives the paint and the keyboard.
      </p>
    </>
  ),
}
