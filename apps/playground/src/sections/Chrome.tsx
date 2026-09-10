import { Action, Contents, Dialog, Progress, Skeleton, Spinner, Tabs } from '@rodium/ui'
import { useState } from 'react'
import { Demo, Row, Section } from '../ui/Showcase'

const TABS = [
  {
    value: 'bar',
    label: 'The bar',
    panel: (
      <p className="max-w-[52ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
        The bar at the top of this page is the kit's: it sticks, it carries one blurred layer of its own rather than
        wearing one on the header, and its links draw their underline left to right on hover and on focus.
      </p>
    ),
  },
  {
    value: 'menu',
    label: 'The disclosure',
    panel: (
      <p className="max-w-[52ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
        Below 620px the links fold into a native details element. The sheet hangs off the bar rather than growing it, so
        opening it never moves the page underneath. Resize the window to see it.
      </p>
    ),
  },
  {
    value: 'entrance',
    label: 'The entrance',
    panel: (
      <p className="max-w-[52ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
        Everything past the cover arrives on the scroll that reveals it. The scroller is the clock, so there is no
        script and nothing to hydrate; a browser without view timelines never enters the block and the content is simply
        there.
      </p>
    ),
  },
  {
    value: 'off',
    label: 'Disabled',
    disabled: true,
  },
] as const

const LINKS = [
  {
    label: 'foundations',
    href: '#foundations',
  },
  {
    label: 'action',
    href: '#action',
  },
  {
    label: 'form',
    href: '#form',
  },
  {
    label: 'editorial',
    href: '#editorial',
  },
]

export function Chrome() {
  const [open, setOpen] = useState(false)

  return (
    <Section
      id="chrome"
      title="The bar, the way in, the wait."
      blurb="The chrome the surface wears on every page, and what it says while it is working. The dialog is the browser's own element, so the top layer, the focus trap and the inert page behind it are not ours to rebuild.">
      <Demo
        label="Tabs"
        note="arrow keys move between them">
        <Tabs items={TABS} />
      </Demo>

      <Demo
        label="Contents"
        note="the way into a long page">
        <Contents items={LINKS} />
      </Demo>

      <Demo label="Progress">
        <div className="flex max-w-md flex-col gap-7">
          <Progress
            value={28}
            label="Bundle"
            showValue
          />
          <Progress
            value={76}
            label="Upload"
            showValue
          />
          <Progress value={100} />
        </div>
      </Demo>

      <Demo label="Waiting">
        <div className="flex flex-col gap-7">
          <Row className="gap-4">
            <Spinner size={14} />
            <Spinner size={18} />
            <Spinner
              size={22}
              className="text-ink-green-on-night"
            />
            <span className="text-[13px] text-ink-on-night-dim">Reading the manifest…</span>
          </Row>
          <div className="flex max-w-sm flex-col gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-1 h-20 w-full" />
          </div>
        </div>
      </Demo>

      <Demo
        label="Dialog"
        note="native, so escape and the focus trap come for free">
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
      </Demo>
    </Section>
  )
}
