import { Code, CodeBlock } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'code',
  title: 'Code',
  summary:
    'Monospace in running text and in a block. A block takes a language and colours itself out of the surface’s own palette; without one it renders plain.',
  examples: [
    {
      title: 'Inline',
      code: `Run <Code>bun run dev</Code> to start it.`,
      render: () => (
        <p className="text-[15px] leading-[1.8] text-ink-on-night-mid">
          Run <Code>bun run dev</Code> to start it, then open <Code>localhost:5180</Code>.
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

.grid-ground:hover {
  --gap: 24px;
  color: #12a776;
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
        the surface did not already have.
      </p>
      <p>
        The colouring is a tokeniser, not a parser: it matches comments and strings first, because those swallow
        anything that looks like syntax inside them, and the rest is word matching. That keeps the kit at two runtime
        dependencies, and it is why a capitalised word in JSX text is coloured like a component. For grammar-accurate
        colour, highlight upstream and hand the result to a plain <code className="text-ink-on-night">&lt;pre&gt;</code>
        .
      </p>
    </>
  ),
}
