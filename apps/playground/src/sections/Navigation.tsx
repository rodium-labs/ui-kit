import { Card, CardBody, Facts, Tabs } from '@rodium/ui'
import { Demo, Section } from '../ui/Showcase'

const ITEMS = [
  {
    value: 'overview',
    label: 'Overview',
    panel: (
      <Card tone="flat">
        <CardBody className="text-[14px] leading-relaxed text-ink-on-night-mid">
          The indicator is one glass chip that measures the selected tab and slides to it. A resize observer keeps it on
          the mark when the strip reflows.
        </CardBody>
      </Card>
    ),
  },
  {
    value: 'tokens',
    label: 'Tokens',
    panel: (
      <Card tone="flat">
        <CardBody>
          <Facts
            rows={[
              [
                'Ground',
                '#000000',
              ],
              [
                'Accent',
                '#12a776',
              ],
              [
                'Warm',
                '#ff95f8',
              ],
              [
                'Radius',
                '8 / 10 / 12 / 14',
              ],
            ]}
          />
        </CardBody>
      </Card>
    ),
  },
  {
    value: 'keyboard',
    label: 'Keyboard',
    panel: (
      <Card tone="flat">
        <CardBody className="text-[14px] leading-relaxed text-ink-on-night-mid">
          Arrow left and right move between tabs and wrap at the ends. Disabled tabs are skipped rather than focused.
        </CardBody>
      </Card>
    ),
  },
  {
    value: 'soon',
    label: 'Disabled',
    disabled: true,
  },
] as const

export function Navigation() {
  return (
    <Section
      id="navigation"
      title="Navigation"
      blurb="The bar at the top of this page is the Navbar: it condenses on scroll, moves a glass chip under whichever link has the pointer or focus, and folds into a sheet below 769px. Tabs use the same chip at panel scale.">
      <Demo
        label="Tabs"
        note="arrow keys move between them">
        <Tabs items={ITEMS} />
      </Demo>
    </Section>
  )
}
