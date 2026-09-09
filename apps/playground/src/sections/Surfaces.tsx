import { Avatar, Badge, Button, Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@rodium/ui'
import { Demo, Grid, Row, Section } from '../ui/Showcase'

export function Surfaces() {
  return (
    <Section
      id="surface"
      title="Surfaces"
      blurb="Three ways a panel sits on the black ground: flat against it, raised off it, or glass over it. The glass tone is the same rim, sheen and specular stack the navigation bar wears.">
      <Demo label="Card tones">
        <Grid className="lg:grid-cols-3">
          <Card tone="flat">
            <CardHeader>
              <CardTitle>Flat</CardTitle>
              <CardDescription>A hairline frame and the ground showing through.</CardDescription>
            </CardHeader>
            <CardBody className="pt-3">
              <Badge tone="outline">default</Badge>
            </CardBody>
          </Card>

          <Card tone="raised">
            <CardHeader>
              <CardTitle>Raised</CardTitle>
              <CardDescription>Lifted a step with a long, soft shadow under it.</CardDescription>
            </CardHeader>
            <CardBody className="pt-3">
              <Badge tone="accent">promoted</Badge>
            </CardBody>
          </Card>

          <Card tone="glass">
            <CardHeader>
              <CardTitle>Glass</CardTitle>
              <CardDescription>The rim and sheen the bar wears, at panel size.</CardDescription>
            </CardHeader>
            <CardBody className="pt-3">
              <Badge tone="warm">signature</Badge>
            </CardBody>
          </Card>
        </Grid>
      </Demo>

      <Demo
        label="A card doing work"
        note="header, body, footer">
        <Card
          tone="raised"
          className="max-w-md">
          <CardHeader>
            <Row className="justify-between">
              <CardTitle>Deploy 128</CardTitle>
              <Badge
                tone="accent"
                dot>
                live
              </Badge>
            </Row>
            <CardDescription>main · 4 minutes ago · Frankfurt</CardDescription>
          </CardHeader>
          <CardBody className="pt-4">
            <Row>
              <Avatar name="Yusuf Yildirim" />
              <div className="flex flex-col">
                <span className="text-[13px] text-ink-on-night">Yusuf Yildirim</span>
                <span className="text-[12px] text-ink-on-night-dim">pushed 3 commits</span>
              </div>
            </Row>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              tone="ghost"
              size="sm">
              Logs
            </Button>
            <Button
              tone="quiet"
              size="sm">
              Roll back
            </Button>
          </CardFooter>
        </Card>
      </Demo>

      <Demo label="Badges and avatars">
        <div className="flex flex-col gap-5">
          <Row>
            <Badge tone="neutral">neutral</Badge>
            <Badge
              tone="accent"
              dot>
              passing
            </Badge>
            <Badge
              tone="warm"
              dot>
              preview
            </Badge>
            <Badge
              tone="danger"
              dot>
              failing
            </Badge>
            <Badge tone="outline">v0.0.0</Badge>
          </Row>
          <Row>
            <Avatar
              name="Ada Lovelace"
              size="sm"
            />
            <Avatar
              name="Yusuf Yildirim"
              size="md"
            />
            <Avatar
              name="Rodium Labs"
              size="lg"
            />
          </Row>
        </div>
      </Demo>
    </Section>
  )
}
