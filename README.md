# Rodium UI Kit

The components behind [rodiumlabs.org](https://rodiumlabs.org), pulled out into a kit: one black
ground, one glass recipe, one ink scale, and a Biome config that every file in here already passes.

```
packages/tokens    the @theme block, the glass recipe, the motion primitives
packages/ui        the components
apps/playground    every component on one page
```

## Getting started

```bash
bun install
bun run dev
```

The playground comes up on [localhost:5180](http://localhost:5180).

| Script              | What it does                               |
| ------------------- | ------------------------------------------ |
| `bun run dev`       | the playground, with hot reload             |
| `bun run build`     | a static build of the playground            |
| `bun run check`     | Biome, read only                            |
| `bun run fix`       | Biome, writing the safe fixes               |
| `bun run typecheck` | `tsc --build` across every package          |

## Using the kit

An app imports the stylesheet once and the components from there on.

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
import { Button, Card, CardBody, CardTitle } from '@rodium/ui'

export function Example() {
  return (
    <Card tone="glass">
      <CardBody>
        <CardTitle>Deploy 128</CardTitle>
        <Button tone="accent">Promote</Button>
      </CardBody>
    </Card>
  )
}
```

## What is in it

**Controls** — `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Field`

**Surfaces** — `Card`, `Glass`, `Badge`, `Avatar`, `Skeleton`

**Feedback** — `Dialog`, `Tooltip`, `Progress`, `Spinner`

**Navigation** — `Navbar`, `Tabs`

**Editorial** — `Wrap`, `Eyebrow`, `Rule`, `Facts`, `GradientText`, `Mark`, glyphs

## How it is built

**Colour never appears in a component.** Every value is a custom property in one `@theme` block, so
a tone changes in one file and the whole kit follows. Ink on the black ground is one white at four
fixed strengths — headings, body, labels, decoration — which keeps three levels apart without
introducing a second grey.

**The glass is one recipe.** `Glass` draws a blurred rim, a sheen, an optional sweep and a specular
edge, and every glass surface in the kit is that component at a different radius. A nested glass
skips the rim: an element with a backdrop filter is a backdrop root, so a second one inside samples
its parent instead of the page.

**Motion is opt-out everywhere.** Every transition and animation carries a `motion-reduce` escape,
and the CSS-only entrances in `surface.css` sit behind `prefers-reduced-motion: no-preference`.

**The browser does the hard parts.** `Dialog` is the native element, so the top layer, the focus
trap, the inert page behind it and the escape key are the browser's rather than ours.

## Conventions

Biome owns formatting and linting; there is no Prettier and no ESLint. The config turns on the
`react` and `project` domains, so hook dependencies, ARIA correctness and nested-component
definitions are all errors rather than opinions.

The formatter is not the default: no semicolons, single quotes in TypeScript and double in JSX,
arrow parentheses only when needed, a 120 column line, and JSX attributes one per line with the
closing bracket on the last of them.

Comments explain a decision that is not visible in the code, and nothing else. A comment that
restates its line is noise the next reader has to check.
