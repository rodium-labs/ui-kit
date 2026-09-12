import { Action, Toast, ToastRegion } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [items, setItems] = useState<number[]>([])
  const [next, setNext] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Action
          tone="quiet"
          onClick={() => {
            setItems(list => [
              ...list,
              next,
            ])
            setNext(n => n + 1)
          }}>
          Raise a toast
        </Action>
        <Action
          tone="ghost"
          onClick={() => setItems([])}>
          Clear
        </Action>
      </div>

      <div className="flex flex-col gap-2">
        <Toast
          title="Deploy 128 rolled back"
          actionLabel="Undo"
          onDismiss={() => undefined}>
          Traffic is on deploy 127.
        </Toast>
      </div>

      <ToastRegion>
        {items.map(id => (
          <Toast
            key={id}
            title={`Deploy ${127 + id} queued`}
            actionLabel="View"
            onDismiss={() => setItems(list => list.filter(n => n !== id))}>
            It will be live in about two minutes.
          </Toast>
        ))}
      </ToastRegion>
    </div>
  )
}

export const page: DocPage = {
  slug: 'toast',
  title: 'Toast',
  summary:
    'A message that arrives after something happened. The region is rendered whether or not it holds anything, because a live region inserted at the same moment as its text is announced unreliably.',
  examples: [
    {
      title: 'In a region',
      note: 'the raised ones stack in the corner',
      code: `<ToastRegion>
  {items.map(t => (
    <Toast key={t.id} title={t.title} actionLabel="Undo"
      onAction={t.undo} onDismiss={() => dismiss(t.id)} />
  ))}
</ToastRegion>`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'title',
      'ReactNode',
      'The one line that says what happened.',
    ],
    [
      'actionLabel / onAction',
      'string / () => void',
      'An optional way to act on it, usually an undo.',
    ],
    [
      'onDismiss',
      '() => void',
      'Renders the close control. Omit it for a toast that times out.',
    ],
  ],
  notes: (
    <>
      <p>
        The region is <code className="text-ink-on-night">polite</code>. Reserve{' '}
        <code className="text-ink-on-night">assertive</code> for errors that cannot wait; a routine confirmation that
        interrupts a screen reader mid-sentence is worse than one that waits.
      </p>
      <p>A toast carrying an action or an error has to stay until it is dismissed. Never time those out.</p>
    </>
  ),
}
