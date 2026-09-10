import { Action, Avatar, Eyebrow, Facts, Rule, Status, Table, Tag, Ticker, Title } from '@rodium/ui'
import { Demo, Row, Section } from '../ui/Showcase'

const DISCIPLINES = [
  'Design',
  'Firmware',
  'Web',
  'Hardware',
  'Tooling',
] as const

export function Editorial() {
  return (
    <Section
      id="editorial"
      title="The parts that carry copy."
      blurb="A slug above a heading, a hairline between sections, a table of numbers that makes the argument. The trailing slash on an eyebrow is the surface's own convention and it runs all the way through — section slugs, contents links, captions.">
      <Demo label="Eyebrow, title, rule, facts">
        <div className="flex flex-col gap-5">
          <div>
            <Eyebrow>work/</Eyebrow>
            <Title className="mt-4 max-w-[20ch]">One project at a time.</Title>
          </div>
          <Rule />
          <Facts
            rows={[
              [
                'Components',
                '24',
              ],
              [
                'Dependencies',
                '2',
              ],
              [
                'Corners',
                'square',
              ],
              [
                'Licence',
                'Private',
              ],
            ]}
          />
        </div>
      </Demo>

      <Demo
        label="Ticker"
        note="a list where the column holds it, a marquee where it does not">
        <div className="border-t border-night-rule pt-6">
          <Ticker words={DISCIPLINES} />
        </div>
      </Demo>

      <Demo
        label="Status and tag"
        note="a state is set, not boxed">
        <div className="flex flex-col gap-5">
          <Row className="gap-6">
            <Status>Shipping</Status>
            <Status tone="neutral">Archived</Status>
            <Status tone="warm">Preview</Status>
            <Status tone="danger">Failing</Status>
          </Row>
          <Row>
            <Tag>v0.0.0</Tag>
            <Tag>STM32F401</Tag>
            <Tag muted>284x76</Tag>
          </Row>
        </div>
      </Demo>

      <Demo
        label="A record, laid out"
        note="the site's own arrangement"
        className="p-0">
        <article className="p-6">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-ink-on-night">Waltz</h3>
            <span className="text-[13px] text-ink-on-night-dim tabular-nums">2025</span>
            <Status className="ms-auto">Shipping</Status>
          </div>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-ink-on-night-mid">
            An MP3 player on an STM32F401 and a 284x76 bar panel, painted in bands with no framebuffer.
          </p>
          <div className="mt-7">
            <Facts
              rows={[
                [
                  'Panel',
                  '284x76',
                ],
                [
                  'MCU',
                  'STM32F401',
                ],
                [
                  'Framebuffer',
                  'none',
                ],
              ]}
            />
          </div>
          <Row className="mt-8 gap-5">
            <Avatar name="Yusuf Yildirim" />
            <div className="flex flex-col">
              <span className="text-[13px] text-ink-on-night">Yusuf Yildirim</span>
              <span className="text-[12px] text-ink-on-night-dim">pushed 3 commits</span>
            </div>
            <Action
              href="#editorial"
              className="ms-auto">
              Read the build
            </Action>
          </Row>
        </article>
      </Demo>

      <Demo
        label="Table"
        note="hairline rows, each column a step down the ink scale">
        <Table
          caption="in use"
          rows={[
            [
              'PA5',
              'SPI1_SCK',
              'panel clock',
            ],
            [
              'PA7',
              'SPI1_MOSI',
              'panel data',
            ],
            [
              'PB0',
              'GPIO',
              'panel reset',
            ],
            [
              'PB1',
              'GPIO',
              'panel chip select',
            ],
          ]}
        />
      </Demo>
    </Section>
  )
}
