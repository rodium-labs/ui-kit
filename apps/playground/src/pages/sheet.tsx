import { Action, Field, Input, Sheet } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Sides() {
  const [side, setSide] = useState<'start' | 'end' | 'bottom' | null>(null)
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(
        [
          'start',
          'end',
          'bottom',
        ] as const
      ).map(which => (
        <Action
          key={which}
          tone="quiet"
          onClick={() => setSide(which)}>
          Open {which}
        </Action>
      ))}
      <Sheet
        open={side !== null}
        onClose={() => setSide(null)}
        side={side ?? 'end'}
        title="Filters"
        description="Narrow the run list."
        footer={
          <>
            <Action
              tone="quiet"
              onClick={() => setSide(null)}>
              Clear
            </Action>
            <Action onClick={() => setSide(null)}>Apply</Action>
          </>
        }>
        <div className="flex flex-col gap-5">
          <Input
            label="Branch"
            placeholder="development"
          />
          <Input
            label="Author"
            placeholder="antaresrvish"
          />
          <Field label="Status">
            <p className="text-[13px]">Every run, whatever it exited with.</p>
          </Field>
        </div>
      </Sheet>
    </div>
  )
}

export const page: DocPage = {
  slug: 'sheet',
  title: 'Sheet',
  summary:
    'A panel parked against an edge of the screen. The same browser dialog the modal uses, so it arrives with the focus trap and the escape key already wired.',
  examples: [
    {
      title: 'Three edges',
      note: 'escape closes it',
      code: `<Sheet open={open} onClose={close} side="end" title="Filters">
  <Input label="Branch" />
</Sheet>`,
      render: () => <Sides />,
    },
  ],
  props: [
    [
      'open',
      'boolean',
      'Whether it is showing.',
    ],
    [
      'onClose',
      '() => void',
      'Called on escape, on the close button and on a click outside.',
    ],
    [
      'side',
      "'start' | 'end' | 'bottom'",
      'Which edge it belongs to. Defaults to end.',
    ],
    [
      'title',
      'ReactNode',
      'Names the panel. Required, because a panel with no name is one nobody can announce.',
    ],
    [
      'description',
      'ReactNode',
      'A line under the title.',
    ],
    [
      'footer',
      'ReactNode',
      'A bordered strip at the bottom that does not scroll with the body.',
    ],
  ],
  notes: (
    <>
      <p>
        <code className="text-ink-on-night">start</code> and <code className="text-ink-on-night">end</code> rather than
        left and right: the panel belongs to the reading edge, so it swaps with the writing direction instead of staying
        put.
      </p>
      <p>
        The bottom one is the phone shape. On a narrow screen a side panel that covers most of the width reads as a page
        you cannot leave, and a sheet rising from the bottom does not.
      </p>
    </>
  ),
}
