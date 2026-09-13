import { Action, Info, Tooltip } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'tooltip',
  title: 'Tooltip',
  summary:
    'A short aside on a control. It describes rather than labels, so a screen reader still reads the control’s own name first.',
  examples: [
    {
      title: 'Either side',
      note: 'hover or tab to it',
      code: `<Tooltip label="Shown on hover and on keyboard focus.">
  <Action tone="ghost" icon={<Info size={14} />}>What is this</Action>
</Tooltip>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip label="Shown on hover and on keyboard focus.">
            <Action
              tone="ghost"
              icon={<Info size={14} />}>
              What is this
            </Action>
          </Tooltip>
          <Tooltip
            label="It can sit under the control too."
            side="bottom">
            <Action tone="quiet">Below</Action>
          </Tooltip>
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'ReactNode',
      'The aside itself.',
    ],
    [
      'side',
      "'top' | 'bottom'",
      'Which side it sits on. Default top.',
    ],
    [
      'children',
      'ReactNode',
      'The control it describes.',
    ],
  ],
  notes: (
    <>
      <p>
        The description lands on the control itself rather than on a wrapper. On a wrapper it names an element nothing
        ever focuses, and the text never reaches assistive technology at all.
      </p>
      <p>
        Never put a tooltip on a natively disabled control: it cannot take focus, so the tooltip cannot be reached by
        keyboard. Put the text beside it instead.
      </p>
    </>
  ),
}
