import { Action, Search, Tooltip } from '@rodium/ui'
import { Demo, Row, Section } from '../ui/Showcase'

export function Actions() {
  return (
    <Section
      id="action"
      title="One action, four weights."
      blurb="The solid one is the way forward and there is one per screen. The arrow leans out of the link on hover and focus, and the whole control takes the press — both written as plain classes so the reduced-motion guard cannot escape them.">
      <Demo
        label="Tones"
        note="a link carries the arrow, a button does not">
        <Row>
          <Action href="#action">See the work</Action>
          <Action
            href="#action"
            tone="quiet">
            Read the source
          </Action>
          <Action
            href="#action"
            tone="ghost">
            Skip
          </Action>
          <Action tone="danger">Delete</Action>
        </Row>
      </Demo>

      <Demo label="Sizes">
        <Row>
          <Action
            href="#action"
            size="sm">
            Small
          </Action>
          <Action href="#action">Medium</Action>
        </Row>
      </Demo>

      <Demo label="As a button">
        <Row>
          <Action>Submit</Action>
          <Action
            tone="quiet"
            icon={<Search size={14} />}>
            Search
          </Action>
          <Action
            tone="quiet"
            arrow>
            With an arrow
          </Action>
          <Tooltip label="Shown on hover and on keyboard focus.">
            <Action tone="ghost">Hover me</Action>
          </Tooltip>
        </Row>
      </Demo>

      <Demo
        label="States"
        note="loading disables the control and marks it busy">
        <Row>
          <Action loading>Saving</Action>
          <Action
            tone="quiet"
            loading>
            Building
          </Action>
          <Action disabled>Disabled</Action>
          <Action
            tone="quiet"
            disabled>
            Disabled
          </Action>
        </Row>
        <div className="mt-4 max-w-sm">
          <Action full>Full width</Action>
        </div>
      </Demo>
    </Section>
  )
}
