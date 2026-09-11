import { Action, Checkbox, Input, Search, Select, Switch, Textarea } from '@rodium/ui'
import { useState } from 'react'
import { Demo, Grid, Row, Section } from '../ui/Showcase'

export function Forms() {
  const [notify, setNotify] = useState(true)

  return (
    <Section
      id="form"
      title="Square, hairline, one green."
      blurb="The site itself has no forms, so these extend the surface rather than copy it: the same hairline edge a bordered action wears, the same square corners, and the one green reserved for the thing that has focus. Labels, hints and errors come from a single Field wrapper that owns the ids and the aria-describedby wiring.">
      <Demo label="Text">
        <Grid>
          <Input
            label="Name"
            placeholder="Ada Lovelace"
            hint="As it should appear on the invoice."
          />
          <Input
            label="Search"
            type="search"
            placeholder="Find a component"
            icon={<Search size={14} />}
          />
          <Input
            label="Email"
            type="email"
            defaultValue="not-an-email"
            error="Enter an address that includes an @, like name@example.com."
            required
          />
          <Select
            label="Environment"
            defaultValue="staging"
            hint="Where the next deploy lands.">
            <option value="dev">Development</option>
            <option value="staging">Staging</option>
            <option value="prod">Production</option>
          </Select>
        </Grid>
        <div className="mt-6">
          <Textarea
            label="Release note"
            placeholder="What changed, and why it matters."
            hint="Markdown is fine here."
          />
        </div>
      </Demo>

      <Demo label="Choice">
        <div className="flex flex-col gap-5">
          <Checkbox
            label="Run the visual diff"
            hint="Adds about forty seconds to the build."
            defaultChecked
          />
          <Checkbox
            label="Publish to the registry"
            hint="Needs a maintainer token."
          />
          <Checkbox
            label="Unavailable on this plan"
            disabled
          />
          <Switch
            label="Notify the channel"
            hint="Posts once the deploy is green."
            checked={notify}
            onChange={event => setNotify(event.target.checked)}
          />
          <Switch
            label="Locked by policy"
            disabled
          />
        </div>
      </Demo>

      <Demo
        label="Together"
        note="a real form, not a swatch">
        <form
          className="flex flex-col gap-6"
          onSubmit={event => event.preventDefault()}>
          <Grid>
            <Input
              label="Workspace"
              placeholder="rodium-labs"
              required
            />
            <Select
              label="Region"
              defaultValue="fra">
              <option value="fra">Frankfurt</option>
              <option value="ist">Istanbul</option>
              <option value="iad">Virginia</option>
            </Select>
          </Grid>
          <Textarea
            label="Why"
            rows={3}
            placeholder="One sentence is enough."
          />
          <Row className="justify-end">
            <Action
              tone="quiet"
              type="reset">
              Reset
            </Action>
            <Action type="submit">Create workspace</Action>
          </Row>
        </form>
      </Demo>
    </Section>
  )
}
