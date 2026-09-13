import { Alert } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'alert',
  title: 'Alert',
  summary:
    'A standing message in the flow of a page. Each tone carries an icon as well as a colour, so the meaning survives a forced-colours mode and a reader who cannot tell green from red.',
  examples: [
    {
      title: 'Tones',
      code: `<Alert tone="info" title="Heads up">…</Alert>
<Alert tone="danger" title="The deploy failed">…</Alert>`,
      render: () => (
        <div className="flex flex-col gap-4">
          <Alert
            tone="info"
            title="The preview is read-only">
            Changes made here are not saved. Open the workspace to edit.
          </Alert>
          <Alert
            tone="success"
            title="Deploy 128 is live">
            Traffic moved four minutes ago and the previous build is still warm.
          </Alert>
          <Alert
            tone="warning"
            title="This token expires in three days">
            Rotate it from the workspace settings before it lapses.
          </Alert>
          <Alert
            tone="danger"
            title="The build failed">
            Two type errors in <code className="text-ink-on-night">packages/ui</code>. Run the typecheck to see them.
          </Alert>
        </div>
      ),
    },
  ],
  props: [
    [
      'tone',
      "'info' | 'success' | 'warning' | 'danger'",
      'Picks the icon and the edge. Default info.',
    ],
    [
      'title',
      'ReactNode',
      'The one line that carries the message.',
    ],
    [
      'children',
      'ReactNode',
      'What to do about it.',
    ],
  ],
  notes: (
    <p>
      Only the danger tone is urgent enough to interrupt, so it renders as{' '}
      <code className="text-ink-on-night">role="alert"</code>. The rest are{' '}
      <code className="text-ink-on-night">role="status"</code>, which is announced when the reader next comes up for
      air.
    </p>
  ),
}
