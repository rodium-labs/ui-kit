import { Action, Dialog } from '@rodium/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Action
        tone="quiet"
        onClick={() => setOpen(true)}>
        Open dialog
      </Action>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Roll back deploy 128?"
        description="Traffic moves to deploy 127 straight away."
        footer={
          <>
            <Action
              tone="quiet"
              size="sm"
              onClick={() => setOpen(false)}>
              Keep it
            </Action>
            <Action
              tone="danger"
              size="sm"
              onClick={() => setOpen(false)}>
              Roll back
            </Action>
          </>
        }>
        The previous build is still warm, so the switch takes about two seconds. Nothing is deleted — deploy 128 stays
        available and can be promoted again.
      </Dialog>
    </>
  )
}

export const page: DocPage = {
  slug: 'dialog',
  title: 'Dialog',
  summary:
    "The browser's own dialog element. It takes the top layer, the focus trap, the inert page behind it and the escape key, none of which are worth rebuilding.",
  examples: [
    {
      title: 'Confirming something',
      note: 'escape closes it, and so does a click on the backdrop',
      code: `<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Roll back deploy 128?"
  description="Traffic moves to deploy 127 straight away."
  footer={<><Action tone="quiet" size="sm">Keep it</Action>
           <Action tone="danger" size="sm">Roll back</Action></>}
>…</Dialog>`,
      render: () => <Demo />,
    },
  ],
  props: [
    [
      'open',
      'boolean',
      'Calls showModal or close to match.',
    ],
    [
      'onClose',
      '() => void',
      'Fired by escape, the backdrop and the close control.',
    ],
    [
      'title',
      'ReactNode',
      'The question, as a heading.',
    ],
    [
      'description',
      'ReactNode',
      'One line under it.',
    ],
    [
      'footer',
      'ReactNode',
      'Where the actions go.',
    ],
  ],
  notes: (
    <>
      <p>
        The confirming button repeats the consequence, so the dialog is answerable without reading the body. "Delete
        this project?" offers <em>Delete project</em>, never a bare <em>Yes</em>.
      </p>
      <p>
        The backdrop click is bound imperatively rather than as a prop: the backdrop is not a control, and escape
        already provides the keyboard path.
      </p>
    </>
  ),
}
