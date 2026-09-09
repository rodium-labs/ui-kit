import { Button, Dialog, Info, Progress, Skeleton, Spinner, Tooltip } from '@rodium/ui'
import { useState } from 'react'
import { Demo, Row, Section } from '../ui/Showcase'

export function Feedback() {
  const [open, setOpen] = useState(false)

  return (
    <Section
      id="feedback"
      title="Feedback"
      blurb="What the interface says while it is working, and what it says when it needs an answer. The dialog is the browser's own element, so the top layer, the focus trap and the escape key come for free.">
      <Demo label="Progress">
        <div className="flex max-w-md flex-col gap-6">
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
        <div className="flex flex-col gap-6">
          <Row>
            <Spinner size={14} />
            <Spinner size={18} />
            <Spinner
              size={24}
              className="text-brand-green"
            />
            <span className="text-[13px] text-ink-on-night-dim">Reading the manifest…</span>
          </Row>
          <div className="flex max-w-sm flex-col gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton
              radius={12}
              className="mt-1 h-24 w-full"
            />
          </div>
        </div>
      </Demo>

      <Demo
        label="Tooltip and dialog"
        note="hover, focus, or press the button">
        <Row>
          <Tooltip label="Shown on hover and on keyboard focus.">
            <Button
              tone="ghost"
              icon={<Info size={14} />}>
              What is this
            </Button>
          </Tooltip>
          <Tooltip
            label="It can sit under the control too."
            side="bottom">
            <Button tone="quiet">Below</Button>
          </Tooltip>
          <Button
            tone="accent"
            onClick={() => setOpen(true)}>
            Open dialog
          </Button>
        </Row>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Roll back deploy 128?"
          description="Traffic moves to deploy 127 straight away."
          footer={
            <>
              <Button
                tone="quiet"
                size="sm"
                onClick={() => setOpen(false)}>
                Keep it
              </Button>
              <Button
                tone="danger"
                size="sm"
                onClick={() => setOpen(false)}>
                Roll back
              </Button>
            </>
          }>
          The previous build is still warm, so the switch takes about two seconds. Nothing is deleted — deploy 128 stays
          available and can be promoted again.
        </Dialog>
      </Demo>
    </Section>
  )
}
