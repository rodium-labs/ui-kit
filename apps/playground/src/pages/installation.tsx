import { Alert, CodeBlock, Rule } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'installation',
  nav: 'Installation',
  title: 'Two imports and a source line.',
  summary:
    'The kit ships as source. An app imports the stylesheets once, points Tailwind at the component folder and imports components from there on.',
  body: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Add the packages</h2>
        <CodeBlock
          caption="package.json"
          language="json">{`{
  "dependencies": {
    "@rodium/tokens": "workspace:*",
    "@rodium/ui": "workspace:*"
  }
}`}</CodeBlock>
      </div>

      <Rule />

      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Import the styles</h2>
        <CodeBlock
          caption="globals.css"
          language="css">{`@import 'tailwindcss';
@import '@fontsource-variable/geist/index.css';
@import '@rodium/tokens/theme.css';
@import '@rodium/tokens/base.css';
@import '@rodium/tokens/surface.css';

@source '../../../packages/ui/src';`}</CodeBlock>
        <Alert
          tone="warning"
          title="The @source line is not optional">
          Tailwind v4 finds classes by scanning files. The kit's classes live outside the app that renders them, so
          without that line every component arrives unstyled.
        </Alert>
      </div>

      <Rule />

      <div className="flex flex-col gap-5">
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">Wear the ground</h2>
        <p className="max-w-[58ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
          The grid belongs to a first screen and stops one viewport down, so it never runs on into the section below it.
        </p>
        <CodeBlock
          caption="layout.tsx"
          language="tsx">{`<div className="grid-ground flex min-h-svh flex-col">
  <Bar name="Rodium Labs" links={nav} />
  <main id="main" className="flex-1">{children}</main>
</div>`}</CodeBlock>
      </div>
    </div>
  ),
}
