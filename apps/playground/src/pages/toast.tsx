import { Action, Toast, ToastRegion } from '@rodium/ui'
import { useRef, useState } from 'react'
import type { DocPage } from '../docs/types'

interface Raised {
  id: number
  withAction: boolean
}

function Demo() {
  const [items, setItems] = useState<Raised[]>([])
  const next = useRef(1)

  const raise = (withAction: boolean) => {
    setItems(list => [
      ...list,
      {
        id: next.current,
        withAction,
      },
    ])
    next.current += 1
  }

  const drop = (id: number) => setItems(list => list.filter(item => item.id !== id))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Action
          tone="quiet"
          onClick={() => raise(false)}>
          Raise one that times out
        </Action>
        <Action
          tone="quiet"
          onClick={() => raise(true)}>
          Raise one with an action
        </Action>
        <Action
          tone="ghost"
          onClick={() => setItems([])}>
          Clear
        </Action>
      </div>

      <ToastRegion>
        {items.map(item =>
          item.withAction ? (
            <Toast
              key={item.id}
              title={`Deploy ${127 + item.id} rolled back`}
              actionLabel="Undo"
              onDismiss={() => drop(item.id)}>
              It carries an action, so it waits for you.
            </Toast>
          ) : (
            <Toast
              key={item.id}
              title={`Deploy ${127 + item.id} queued`}
              duration={4000}
              onDismiss={() => drop(item.id)}>
              This one leaves on its own in four seconds.
            </Toast>
          ),
        )}
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
      note: 'one times out, the other waits — hover either to hold it',
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
      <p>
        A toast carrying an action has to stay until it is dismissed — timing out a row with an undo on it takes the
        undo away — so <code className="text-ink-on-night">duration</code> is ignored whenever{' '}
        <code className="text-ink-on-night">actionLabel</code> is set.
      </p>
      <p>The timer pauses while the pointer rests on the toast or focus is inside it, and restarts when both leave.</p>
    </>
  ),
}
