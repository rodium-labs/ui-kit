# Rodium Labs UI Kit

A React component library and design token set for dark interfaces.

The kit provides 70 components, 13 icons and a set of CSS custom properties. It is built on Tailwind
CSS v4 and has two runtime dependencies: `clsx` and `tailwind-merge`.

## Packages

| Package | Contents |
| --- | --- |
| `@rodium-labs/tokens` | CSS custom properties for colour, typography and motion |
| `@rodium-labs/ui` | React components |

## Installation

```bash
npm install @rodium-labs/ui @rodium-labs/tokens
```

React 19 and Tailwind CSS v4 are peer dependencies.

## Setup

Import the stylesheets once, in the entry stylesheet of your application:

```css
@import 'tailwindcss';
@import '@rodium-labs/tokens/theme.css';
@import '@rodium-labs/tokens/base.css';
@import '@rodium-labs/tokens/surface.css';

@source '../node_modules/@rodium-labs/ui/dist';
```

The `@source` directive is required. Tailwind v4 generates CSS by scanning files for class names, and
the component classes live inside the installed package rather than in your own source.

The kit also expects the Geist typeface. Install `@fontsource-variable/geist` and import it, or
provide your own font stack by overriding `--font-sans`.

## Usage

```tsx
import { Action, Eyebrow, Title, Wrap } from '@rodium-labs/ui'

export function Example() {
  return (
    <Wrap className="py-20">
      <Eyebrow>work/</Eyebrow>
      <Title className="mt-4">One project at a time.</Title>
      <Action href="/waltz">Read the build</Action>
    </Wrap>
  )
}
```

## Components

**Actions** — `Action`, `Link`, `Menu`, `Pagination`, `Breadcrumb`, `Arrow`

**Forms** — `Field`, `Input`, `Textarea`, `Select`, `NativeSelect`, `Checkbox`, `Radio`,
`RadioGroup`, `Switch`, `Slider`, `Toggle`, `ToggleGroup`, `OtpInput`, `NumberInput`,
`PasswordInput`, `Rating`, `TagInput`, `FileDrop`, `Combobox`

**Feedback** — `Alert`, `Banner`, `Toast`, `ToastRegion`, `Dialog`, `Sheet`, `Confirm`, `Popover`,
`Tooltip`, `Progress`, `Spinner`, `Skeleton`, `EmptyState`

**Navigation** — `Bar`, `SideNav`, `Tabs`, `Contents`, `Accordion`, `CommandPalette`, `Steps`,
`Tree`, `useMenuDismiss`

**Content** — `Wrap`, `Cover`, `split`, `Display`, `Title`, `Lede`, `Body`, `Eyebrow`, `Rule`,
`Card`, `Facts`, `Table`, `DataTable`, `Stat`, `Status`, `Tag`, `Code`, `CodeBlock`, `Kbd`,
`Ticker`, `Avatar`, `AvatarGroup`, `Snippet`, `Prose`, `Timeline`, `Carousel`, `AspectRatio`,
and 13 icons

**Charts** — `Sparkline`, `LineChart`, `AreaChart`, `BarChart`, `BarList`, `StackedBar`,
`DivergingBar`, `Dumbbell`, `Heatmap`, `ScatterChart`, `Meter`

## Design decisions

**No border radius.** Controls, panels and dialogs are square. The only exception is the radio
button, which stays circular so it is not mistaken for a checkbox.

**Colour lives in tokens.** Components reference CSS custom properties and never contain a hex
value. Text on the background uses a single white at four opacities, which separates headings, body
copy, labels and decoration without introducing a second grey.

**Native elements where they exist.** Menus and accordions use `<details>`. Dialogs and the command
palette use `<dialog>`, which provides the top layer, focus trapping and Escape handling. Selects
are available in both a custom and a native implementation.

**Motion is optional.** Every transition and animation has a `prefers-reduced-motion` fallback. No
state is communicated by motion or colour alone.

**Accessibility.** All interactive elements have accessible names. Contrast ratios were measured
against the rendered background; text pairs meet WCAG AA and control boundaries meet 3:1. Touch
targets are at least 24×24 CSS pixels.

## Development

```bash
bun install
bun run dev
```

The documentation site runs at `localhost:5180` and has one page per component.

| Script | Purpose |
| --- | --- |
| `bun run dev` | Documentation site with hot reload |
| `bun run build` | Static build of the documentation site |
| `bun run check` | Biome and the token check |
| `bun run fix` | Biome with safe fixes applied |
| `bun run typecheck` | `tsc --build` across all packages |

Biome handles formatting and linting; there is no Prettier or ESLint. The configuration enables the
`react` and `project` domains, so hook dependencies, ARIA correctness and nested component
definitions are errors.

The formatter is not configured with defaults: no semicolons, single quotes in TypeScript and double
quotes in JSX, arrow parentheses only where required, a 120 character line width, and JSX attributes
on separate lines.

`tools/check-tokens.mjs` verifies that every colour utility in the source refers to a token declared
in the theme. Tailwind emits nothing for an unresolvable colour, so this check catches a class that
would otherwise fail silently.

## Licence

MIT. See [LICENSE](LICENSE).
