import { Action, Banner } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'banner',
  title: 'Banner',
  summary: 'A notice about the whole screen rather than one field. Full width, at the top.',
  examples: [
    {
      title: 'Three tones',
      note: 'the first one dismisses',
      code: `<Banner dismissible action={<Action size="sm" tone="ghost">Upgrade</Action>}>
  You are close to the request limit for this month.
</Banner>`,
      render: () => (
        <div className="flex flex-col">
          <Banner
            dismissible
            action={
              <Action
                size="sm"
                tone="ghost">
                Upgrade
              </Action>
            }>
            You are close to the request limit for this month.
          </Banner>
          <Banner tone="warm">The token used by this project expires in three days.</Banner>
          <Banner tone="danger">Builds are paused while the region recovers.</Banner>
        </div>
      ),
    },
  ],
  props: [
    [
      'tone',
      "'info' | 'warm' | 'danger'",
      'What kind of notice it is.',
    ],
    [
      'action',
      'ReactNode',
      'Sits at the trailing end.',
    ],
    [
      'dismissible',
      'boolean',
      'Adds a named close button; the banner removes itself.',
    ],
  ],
  notes: (
    <p>
      Reach for <code className="text-ink-on-night">Alert</code> where the message is about one thing on the page, and
      this where it is about the page.
    </p>
  ),
}
