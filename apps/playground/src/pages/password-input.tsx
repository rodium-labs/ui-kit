import { PasswordInput } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'password-input',
  title: 'Password input',
  nav: 'Password input',
  summary: 'A password with a way to read it back before you commit to it.',
  examples: [
    {
      title: 'With the toggle',
      note: 'press the eye',
      code: `<PasswordInput label="Password" autoComplete="new-password" />`,
      render: () => (
        <div className="flex max-w-[22rem] flex-col gap-6">
          <PasswordInput
            label="Password"
            hint="At least twelve characters."
            autoComplete="new-password"
            defaultValue="correct-horse-battery"
          />
          <PasswordInput
            label="Current password"
            error="That password does not match."
            autoComplete="current-password"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'label / hint / error',
      'ReactNode',
      'The same field parts every control here takes.',
    ],
    [
      '…',
      'InputHTMLAttributes',
      'Everything else lands on the input.',
    ],
  ],
  notes: (
    <p>
      The toggle is a real button whose name changes with the state, so it is not a mystery eye: “show password”, then
      “hide password”. Paste is never blocked, because people paste passwords out of a manager.
    </p>
  ),
}
