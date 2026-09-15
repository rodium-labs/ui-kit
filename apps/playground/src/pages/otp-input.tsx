import { OtpInput } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Code() {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <OtpInput
        label="Verification code"
        hint="Six digits, from the message we just sent."
        value={value}
        onValueChange={setValue}
      />
      <p className="text-[13px] text-ink-on-night-dim tabular-nums">
        value: <span className="text-ink-on-night">{value || '—'}</span>
      </p>
    </div>
  )
}

export const page: DocPage = {
  slug: 'otp-input',
  title: 'Code input',
  nav: 'Code input',
  summary: 'One box per character, one value underneath. For a code that arrives by message.',
  examples: [
    {
      title: 'Six digits',
      note: 'try pasting one in',
      code: `<OtpInput
  label="Verification code"
  value={value}
  onValueChange={setValue}
/>`,
      render: () => <Code />,
    },
    {
      title: 'Four',
      code: `<OtpInput length={4} label="PIN" value={value} onValueChange={setValue} />`,
      render: () => <FourUp />,
    },
  ],
  props: [
    [
      'length',
      'number',
      'How many characters the code has. Defaults to 6.',
    ],
    [
      'value',
      'string',
      'The whole code, not one box.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with the whole code.',
    ],
    [
      'label',
      'string',
      'Names the group of boxes.',
    ],
    [
      'hint',
      'string',
      'A line under them, tied to the group for screen readers.',
    ],
  ],
  notes: (
    <>
      <p>
        The boxes are a picture of the code, not separate fields. The first one carries{' '}
        <code className="text-ink-on-night">autocomplete="one-time-code"</code>, so the message the phone just received
        fills all of them.
      </p>
      <p>
        Paste is handled by hand: pasting into the third box still fills from the start, which is what someone who
        copied the whole code expects.
      </p>
    </>
  ),
}

function FourUp() {
  const [pin, setPin] = useState('')
  return (
    <OtpInput
      length={4}
      label="PIN"
      value={pin}
      onValueChange={setPin}
    />
  )
}
