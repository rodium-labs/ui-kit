import { Action, Confirm } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Destructive() {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Action
        tone="danger"
        onClick={() => setOpen(true)}
        disabled={gone}>
        Delete project
      </Action>
      {gone ? <span className="text-[13px] text-ink-on-night-dim">Deleted. Reload to reset the example.</span> : null}
      <Confirm
        open={open}
        danger
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setGone(true)
          setOpen(false)
        }}
        title="Delete edge-router?"
        description="The project, its runs and its logs go with it. This cannot be undone."
        confirmLabel="Delete project"
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'confirm',
  title: 'Confirm',
  summary: 'The question you ask before something cannot be undone.',
  examples: [
    {
      title: 'A destructive answer',
      code: `<Confirm
  open={open}
  danger
  onCancel={close}
  onConfirm={remove}
  title="Delete edge-router?"
  description="The project, its runs and its logs go with it."
  confirmLabel="Delete project"
/>`,
      render: () => <Destructive />,
    },
  ],
  props: [
    [
      'open',
      'boolean',
      'Whether the question is being asked.',
    ],
    [
      'onCancel',
      '() => void',
      'The safe answer. Also what escape does.',
    ],
    [
      'onConfirm',
      '() => void',
      'The answer that does the thing.',
    ],
    [
      'title',
      'ReactNode',
      'The question itself.',
    ],
    [
      'description',
      'ReactNode',
      'What happens if the answer is yes.',
    ],
    [
      'confirmLabel',
      'string',
      'Repeat the consequence here rather than writing OK.',
    ],
    [
      'danger',
      'boolean',
      'Paints the confirming action with the destructive tone.',
    ],
    [
      'busy',
      'boolean',
      'Spins the confirming action and locks the cancel while the work runs.',
    ],
  ],
  notes: (
    <>
      <p>
        It is an <code className="text-ink-on-night">alertdialog</code>, so the question is read on open rather than
        waiting to be walked to. Focus lands on the safe answer, and a click on the backdrop does nothing: a stray click
        should not be able to answer a question about deleting something.
      </p>
      <p>
        Label the confirming button with the consequence. A dialog whose buttons read yes and no has to be read twice.
      </p>
    </>
  ),
}
