import { ArrowUpRight, Button, Check, Search } from '@rodium/ui'
import { Demo, Row, Section } from '../ui/Showcase'

export function Buttons() {
  return (
    <Section
      id="button"
      title="Button"
      blurb="Five tones over three sizes. Accent and ghost wear the glass rim; solid, quiet and danger are flat fills. Every tone shares the same lift on hover and press on click, and every one of them drops that motion under a reduced-motion preference.">
      <Demo
        label="Tones"
        note="size md">
        <Row>
          <Button tone="solid">Ship it</Button>
          <Button tone="accent">Accent</Button>
          <Button tone="quiet">Quiet</Button>
          <Button tone="ghost">Ghost</Button>
          <Button tone="danger">Delete</Button>
        </Row>
      </Demo>

      <Demo label="Sizes">
        <Row>
          <Button
            tone="accent"
            size="sm">
            Small
          </Button>
          <Button
            tone="accent"
            size="md">
            Medium
          </Button>
          <Button
            tone="accent"
            size="lg">
            Large
          </Button>
        </Row>
      </Demo>

      <Demo label="With icons">
        <Row>
          <Button
            tone="solid"
            icon={<Check size={14} />}>
            Confirm
          </Button>
          <Button
            tone="quiet"
            icon={<Search size={14} />}>
            Search
          </Button>
          <Button
            tone="ghost"
            trailing={<ArrowUpRight size={14} />}
            href="https://rodiumlabs.org"
            external>
            Open the site
          </Button>
        </Row>
      </Demo>

      <Demo
        label="States"
        note="loading disables the control and marks it busy">
        <Row>
          <Button
            tone="solid"
            loading>
            Saving
          </Button>
          <Button
            tone="accent"
            loading>
            Deploying
          </Button>
          <Button
            tone="quiet"
            disabled>
            Disabled
          </Button>
          <Button
            tone="solid"
            full
            className="mt-1">
            Full width
          </Button>
        </Row>
      </Demo>
    </Section>
  )
}
