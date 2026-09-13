import { Avatar, Code, CodeBlock, Facts, Kbd, Mark, Panel, Stat, Status, Table, Tag, Ticker } from '@rodium/ui'
import { useEffect, useState } from 'react'
import type { DocPage } from '../docs/types'

function LiveStats() {
  const [deploys, setDeploys] = useState(128)
  const [failures, setFailures] = useState(3)
  const [median, setMedian] = useState(41)

  useEffect(() => {
    const tick = window.setInterval(() => {
      setDeploys(n => n + Math.round(Math.random() * 6))
      setFailures(n => Math.max(0, n + (Math.random() > 0.6 ? 1 : -1)))
      setMedian(n => Math.max(18, Math.min(90, n + Math.round((Math.random() - 0.5) * 14))))
    }, 2200)
    return () => window.clearInterval(tick)
  }, [])

  return (
    <div className="grid gap-8 sm:grid-cols-3">
      <Stat
        animate
        label="Deploys"
        value={deploys}
        trend="up"
        delta="live"
      />
      <Stat
        animate
        label="Failures"
        value={failures}
        trend="down"
        delta="live"
      />
      <Stat
        animate
        label="Median build"
        value={median}
        unit="s"
        trend="flat"
        delta="live"
      />
    </div>
  )
}

export const tablePage: DocPage = {
  slug: 'table',
  title: 'Table',
  summary:
    'A row of hairlines rather than a boxed grid. The first cell names the row, and each column after it steps one level down the ink scale.',
  examples: [
    {
      title: 'With a caption',
      code: `<Table caption="in use" rows={[['PA5', 'SPI1_SCK', 'panel clock']]} />`,
      render: () => (
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
      ),
    },
    {
      title: 'With a head',
      render: () => (
        <Table
          head={[
            'token',
            'value',
            'role',
          ]}
          rows={[
            [
              'night-edge',
              '0.38',
              'around a control',
            ],
            [
              'night-frame',
              '0.10',
              'around a panel',
            ],
            [
              'night-rule',
              '0.08',
              'between sections',
            ],
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'rows',
      'readonly ReactNode[][]',
      'The first cell of each row becomes its row header.',
    ],
    [
      'head',
      'readonly string[]',
      'Optional column headers.',
    ],
    [
      'caption',
      'string',
      'Sits above the table, set in the surface’s uppercase.',
    ],
  ],
  notes: <p>The table scrolls inside its own container rather than widening the page.</p>,
}

export const factsPage: DocPage = {
  slug: 'facts',
  title: 'Facts',
  summary: 'Label left, value right, one hairline between. The numbers are the argument.',
  examples: [
    {
      title: 'A specification',
      code: `<Facts rows={[['Panel', '284x76'], ['MCU', 'STM32F401']]} />`,
      render: () => (
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
            [
              'Themes',
              '16',
            ],
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'rows',
      'readonly [string, ReactNode][]',
      'Label and value per row.',
    ],
  ],
}

export const statPage: DocPage = {
  slug: 'stat',
  title: 'Stat',
  summary:
    'One number, large. It counts from the old value to the new one when the data moves, and the arrow and hidden word carry the direction alongside the colour.',
  examples: [
    {
      title: 'Counting',
      note: 'the numbers change every couple of seconds',
      code: `<Stat animate label="Deploys" value={deploys} trend="up" delta="live" />`,
      render: () => <LiveStats />,
    },
    {
      title: 'A row of them',
      code: `<Stat label="Deploys" value="128" trend="up" delta="12 this week" />`,
      render: () => (
        <div className="grid gap-8 sm:grid-cols-3">
          <Stat
            label="Deploys"
            value="128"
            trend="up"
            delta="12 this week"
          />
          <Stat
            label="Failures"
            value="3"
            trend="down"
            delta="2 fewer"
          />
          <Stat
            label="Median build"
            value="41"
            unit="s"
            trend="flat"
            delta="unchanged"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'string',
      'What the number is.',
    ],
    [
      'value',
      'ReactNode',
      'The number itself, set in tabular figures.',
    ],
    [
      'unit',
      'string',
      'Sits after the value at reading size.',
    ],
    [
      'trend',
      "'up' | 'down' | 'flat'",
      'Picks the arrow and the hue.',
    ],
    [
      'delta',
      'string',
      'The change, beside the arrow.',
    ],
  ],
  notes: (
    <p>
      Each trend adds a visually hidden word — up, down, level — so the direction is never carried by the hue and the
      arrow glyph alone.
    </p>
  ),
}

export const statusPage: DocPage = {
  slug: 'status',
  nav: 'Status & Tag',
  title: 'Status and Tag',
  summary:
    'Two small labels. A status is set rather than boxed, because a filled pill would be the only rounded thing on the surface; a tag is bordered and square.',
  examples: [
    {
      title: 'Status',
      code: `<Status>Shipping</Status>
<Status tone="danger">Failing</Status>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-6">
          <Status>Shipping</Status>
          <Status tone="neutral">Archived</Status>
          <Status tone="warm">Preview</Status>
          <Status tone="danger">Failing</Status>
        </div>
      ),
    },
    {
      title: 'Tag',
      code: `<Tag>v0.0.0</Tag>
<Tag muted>284x76</Tag>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Tag>v0.0.0</Tag>
          <Tag>STM32F401</Tag>
          <Tag muted>284x76</Tag>
        </div>
      ),
    },
  ],
  props: [
    [
      'tone',
      "'accent' | 'neutral' | 'warm' | 'danger'",
      'Status only. Default accent.',
    ],
    [
      'muted',
      'boolean',
      'Tag only. Steps the ink down one level.',
    ],
  ],
  notes: (
    <p>
      The word is the meaning; the hue only reinforces it. "Failing" in red and "Failing" in grey say the same thing to
      a reader who cannot tell them apart.
    </p>
  ),
}

export const codePage: DocPage = {
  slug: 'code',
  nav: 'Code & Kbd',
  title: 'Code and Kbd',
  summary:
    'Monospace in running text, in a block, and as a key. A block takes a language and colours itself out of the surface’s own palette; without one it renders plain.',
  examples: [
    {
      title: 'Inline',
      code: `Run <Code>bun run dev</Code> and press <Kbd>⌘</Kbd><Kbd>K</Kbd>.`,
      render: () => (
        <p className="flex flex-wrap items-center gap-1.5 text-[15px] leading-[1.8] text-ink-on-night-mid">
          Run <Code>bun run dev</Code> and press <Kbd>⌘</Kbd>
          <Kbd>K</Kbd> to open the palette.
        </p>
      ),
    },
    {
      title: 'The languages it knows',
      note: 'tsx · ts · js · jsx · css · json · bash · html',
      code: `<CodeBlock language="tsx" caption="app.tsx">{source}</CodeBlock>`,
      render: () => (
        <div className="flex flex-col gap-5">
          <CodeBlock
            language="tsx"
            caption="app.tsx">{`import { Action } from '@rodium/ui'

// a link carries the arrow
export function Cta() {
  const count = 128
  return <Action href="/work">See the work</Action>
}`}</CodeBlock>

          <CodeBlock
            language="css"
            caption="globals.css">{`@import 'tailwindcss';

.grid-ground {
  --grid-line: color-mix(in oklab, var(--color-brand-green) 26%, transparent);
  background-size: 64px 64px;
}`}</CodeBlock>

          <CodeBlock
            language="json"
            caption="package.json">{`{
  "name": "@rodium/ui",
  "private": true,
  "dependencies": { "clsx": "^2.1.1" }
}`}</CodeBlock>

          <CodeBlock
            language="bash"
            caption="terminal">{`# start the docs
bun run dev --port 5180`}</CodeBlock>
        </div>
      ),
    },
    {
      title: 'Without a language',
      note: 'plain, and nothing is guessed',
      render: () => <CodeBlock>{`GET /deploys/128\n204 No Content`}</CodeBlock>,
    },
  ],
  props: [
    [
      'caption',
      'string',
      'CodeBlock only. Sits above the block as a filename.',
    ],
    [
      'language',
      'CodeLanguage',
      'tsx, ts, js, jsx, css, json, bash or html. Omit for plain.',
    ],
    [
      'children',
      'string',
      'CodeBlock takes a string, not nodes, because it tokenises what it is given.',
    ],
  ],
  notes: (
    <>
      <p>
        The block wraps rather than scrolls. A scrolling block hides the end of a long line and has to become a
        focusable region to give it back; wrapping costs a little beauty and hides nothing at any width.
      </p>
      <p>
        A block is held to the same colour budget as the page around it: pink is the language, green is a value, white
        is a name, and the greys carry everything else. Two hues and three strengths of one white — no value here that
        the surface did not already have. A borrowed editor palette puts six competing hues on a page that otherwise has
        two, which is what made the blocks shout.
      </p>
      <p>
        The colouring is a tokeniser, not a parser: it matches comments and strings first, because those swallow
        anything that looks like syntax inside them, and the rest is word matching. That keeps the kit at two runtime
        dependencies, and it is why a capitalised word in JSX text is coloured like a component.
      </p>
      <p>
        For grammar-accurate colour — a language this does not know, or code you did not write — highlight it upstream
        and hand the result to a plain <code className="text-ink-on-night">&lt;pre&gt;</code>.
      </p>
    </>
  ),
}

export const panelPage: DocPage = {
  slug: 'panel',
  nav: 'Panel & media',
  title: 'Panel, Ticker, Avatar, Mark',
  summary: 'The pieces that carry an image, a running list, a person and the brand.',
  examples: [
    {
      title: 'Panel',
      note: '284×76 of real device output, stepped 1x → 2x and nothing between',
      code: `<Panel src="/screens/player.png" alt="The player screen" wide />`,
      render: () => (
        <div className="flex flex-col gap-3">
          <Panel
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='284' height='76'%3E%3Crect width='284' height='76' fill='%23000'/%3E%3Crect x='8' y='8' width='60' height='60' fill='%2312a776'/%3E%3Crect x='78' y='20' width='120' height='8' fill='%23fff'/%3E%3Crect x='78' y='36' width='80' height='6' fill='%23666'/%3E%3Crect x='78' y='54' width='198' height='4' fill='%23ff95f8'/%3E%3C/svg%3E"
            alt="A mock of the Waltz player screen"
          />
          <p className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">the player</p>
        </div>
      ),
    },
    {
      title: 'Ticker',
      note: 'a plain list where the column holds it, a marquee where it does not',
      code: `<Ticker words={['Design', 'Firmware', 'Web']} />`,
      render: () => (
        <div className="border-t border-night-rule pt-6">
          <Ticker
            words={[
              'Design',
              'Firmware',
              'Web',
              'Hardware',
              'Tooling',
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Avatar and Mark',
      code: `<Avatar name="Yusuf Yildirim" />
<Mark size={24} title="Rodium Labs" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            name="Ada Lovelace"
            size="sm"
          />
          <Avatar name="Yusuf Yildirim" />
          <Avatar
            name="Rodium Labs"
            size="lg"
          />
          <span className="ms-4 flex items-center gap-3 text-ink-on-night">
            <Mark size={18} />
            <Mark size={28} />
            <Mark size={40} />
          </span>
        </div>
      ),
    },
  ],
  props: [
    [
      'Panel · src, alt',
      'string',
      'Required. The image renders pixelated at 1x and 2x.',
    ],
    [
      'Panel · wide',
      'boolean',
      'Opts into 568px where the column can hold it.',
    ],
    [
      'Ticker · words',
      'readonly string[]',
      'The list.',
    ],
    [
      'Avatar · name',
      'string',
      'Used for the initials and the accessible name.',
    ],
    [
      'Mark · size, title',
      'number, string',
      'A title makes the mark an image; without one it is decorative.',
    ],
  ],
}
