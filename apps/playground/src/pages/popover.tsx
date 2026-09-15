import { Action, Popover, Rule } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'popover',
  title: 'Popover',
  summary: 'A panel anchored to what opened it, holding whatever you put in it.',
  examples: [
    {
      title: 'An explanation',
      note: 'escape or a click outside closes it',
      code: `<Popover label="What counts?">
  <p>A request is counted when the origin answers.</p>
</Popover>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Popover label="What counts?">
            <p>
              A request is counted when the origin answers, not when it arrives. A retry that reaches a warm cache is
              free.
            </p>
          </Popover>
          <Popover
            label="Keys"
            align="end"
            width="15rem">
            <div className="flex flex-col gap-3">
              <p className="text-ink-on-night">Two keys are live.</p>
              <Rule />
              <Action
                size="sm"
                tone="quiet"
                full>
                Rotate them
              </Action>
            </div>
          </Popover>
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'What opens it.',
    ],
    [
      'align',
      "'start' | 'end'",
      'Which edge the panel lines up with. Defaults to start.',
    ],
    [
      'width',
      'string',
      'Panel width. Clamped to the viewport on top of whatever you pass.',
    ],
    [
      'panelClassName',
      'string',
      'Classes for the panel rather than the trigger.',
    ],
  ],
  notes: (
    <>
      <p>
        It is the browser's own disclosure, which is why it needs no script to open and keeps working before hydration.
        Escape and a pointer landing outside both close it.
      </p>
      <p>
        <code className="text-ink-on-night">Menu</code> is the one for a list of commands.{' '}
        <code className="text-ink-on-night">Tooltip</code> is the one for a short aside that should appear on hover.
        This is for everything that is neither.
      </p>
    </>
  ),
}
