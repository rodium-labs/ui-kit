# Rodium UI Kit

The surface [rodiumlabs.org](https://rodiumlabs.org) already wears, taken apart: a black ground, one
white at four strengths, square corners, and a single green kept for whatever has focus.

```
packages/tokens    the @theme block, the ground, the entrance, the disclosure
packages/ui        24 components and 12 glyphs
apps/playground    every one of them on one page
```

## Getting started

```bash
bun install
bun run dev
```

The playground comes up on [localhost:5180](http://localhost:5180).

| Script              | What it does                       |
| ------------------- | ---------------------------------- |
| `bun run dev`       | the playground, with hot reload    |
| `bun run build`     | a static build of the playground   |
| `bun run check`     | Biome, read only                   |
| `bun run fix`       | Biome, writing the safe fixes      |
| `bun run typecheck` | `tsc --build` across every package |

## Using the kit

An app imports the stylesheets once and the components from there on.

```css
@import 'tailwindcss';
@import '@rodium/tokens/theme.css';
@import '@rodium/tokens/base.css';
@import '@rodium/tokens/surface.css';

@source '../../../packages/ui/src';
```

The `@source` line matters: Tailwind v4 scans for class names, and the kit's classes live outside
the app that renders them.

```tsx
import { Action, Eyebrow, Facts, Title, Wrap } from '@rodium/ui'

export function Work() {
  return (
    <Wrap className="py-20">
      <Eyebrow>work/</Eyebrow>
      <Title className="mt-4">One project at a time.</Title>
      <Facts
        rows={[
          ['Panel', '284x76'],
          ['MCU', 'STM32F401'],
        ]}
      />
      <Action href="/waltz">Read the build</Action>
    </Wrap>
  )
}
```

## What is in it

**Chrome** — `Bar` (with `MENU_SCRIPT`), `Contents`, `Tabs`, `Dialog`, `Tooltip`

**Action** — `Action`, `Arrow`

**Editorial** — `Wrap`, `Cover`, `split`, `Display`, `Title`, `Lede`, `Body`, `Eyebrow`, `Rule`,
`Facts`, `Table`, `Ticker`, `Status`, `Tag`, `Panel`, `Mark`, glyphs

**Form** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`

**Waiting** — `Progress`, `Spinner`, `Skeleton`, `Avatar`

## How it is built

**Square, everywhere.** The only rounding on the surface is 4px on the focus ring, and it belongs to
the outline rather than to the control under it. Nothing else has a radius.

**Colour never appears in a component.** Every value is a custom property in one `@theme` block. Ink
is one white at four strengths — headings, body, labels, decoration — which keeps four levels apart
without ever introducing a second grey, and the lines are named for what they separate rather than
for how dark they are.

**The browser does the hard parts.** The menu is a native `<details>`; `MENU_SCRIPT` only adds what
the element does not do — close on a link, on escape, on a tap outside — so the disclosure works
before hydration and without React. `Dialog` is the native element, so the top layer, the focus trap
and the inert page behind it are not ours.

**Nothing animates on a timer that could animate on the scroll.** `.reveal` runs on
`animation-timeline: view()`, so the scroller is the clock: no script, nothing to hydrate, and a
browser without view timelines simply shows the content.

**Motion is opt-out everywhere.** Every transition carries a `motion-reduce` escape, and the CSS
entrances sit behind `prefers-reduced-motion: no-preference`.

## Conventions

Biome owns formatting and linting; there is no Prettier and no ESLint. The config turns on the
`react` and `project` domains, so hook dependencies, ARIA correctness and nested-component
definitions are errors rather than opinions.

The formatter is not the default: no semicolons, single quotes in TypeScript and double in JSX,
arrow parentheses only when needed, a 120 column line, and JSX attributes one per line with the
closing bracket on the last of them.

`cn()` extends `tailwind-merge` with the kit's own font sizes. Without that it reads `text-display`
as a colour and the next `text-*` class on the element silently wins.

Comments explain a decision that is not visible in the code, and nothing else.
