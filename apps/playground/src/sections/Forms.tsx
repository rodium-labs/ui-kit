import { Button, Checkbox, Input, Search, Select, Switch, Textarea } from '@rodium/ui'
import { useState } from 'react'
import { Demo, Grid, Row, Section } from '../ui/Showcase'

export function Forms() {
  const [notify, setNotify] = useState(true)

  return (
    <Section
      id="form"
      title="Form controls"
      blurb="One skin across the input, the select and the textarea, so a form lines up on a single edge and lights the same way on focus. Labels, hints and errors come from one Field wrapper, which owns the ids and the aria-describedby wiring.">
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
            error="That address is missing an @."
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
        <div className="mt-5">
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
          className="flex flex-col gap-5"
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
            <Button
              tone="quiet"
              type="reset">
              Reset
            </Button>
            <Button
              tone="accent"
              type="submit">
              Create workspace
            </Button>
          </Row>
        </form>
      </Demo>
    </Section>
  )
}
