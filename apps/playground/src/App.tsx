import { ArrowUpRight, Badge, Button, GradientText, Mark, Navbar, Wrap } from '@rodium/ui'
import { Buttons } from './sections/Buttons'
import { Editorial } from './sections/Editorial'
import { Feedback } from './sections/Feedback'
import { Forms } from './sections/Forms'
import { Foundations } from './sections/Foundations'
import { Navigation } from './sections/Navigation'
import { Surfaces } from './sections/Surfaces'

const SECTIONS = [
  {
    id: 'foundations',
    label: 'Foundations',
  },
  {
    id: 'button',
    label: 'Button',
  },
  {
    id: 'form',
    label: 'Form controls',
  },
  {
    id: 'surface',
    label: 'Surfaces',
  },
  {
    id: 'feedback',
    label: 'Feedback',
  },
  {
    id: 'navigation',
    label: 'Navigation',
  },
  {
    id: 'editorial',
    label: 'Editorial',
  },
] as const

const NAV_LINKS = [
  {
    label: 'Tokens',
    href: '#foundations',
  },
  {
    label: 'Controls',
    href: '#button',
  },
  {
    label: 'Surfaces',
    href: '#surface',
  },
  {
    label: 'Editorial',
    href: '#editorial',
  },
]

export function App() {
  return (
    <div className="grid-ground min-h-svh">
      <Navbar
        home="#top"
        name="Rodium UI"
        logo={
          <Mark
            size={20}
            title="Rodium Labs"
          />
        }
        links={NAV_LINKS}
        actions={
          <Button
            tone="accent"
            size="sm"
            href="https://rodiumlabs.org"
            external
            trailing={<ArrowUpRight size={13} />}>
            rodiumlabs.org
          </Button>
        }
      />

      <main
        id="top"
        className="pt-(--nav-h)">
        <Wrap className="flex min-h-[calc(100svh_-_var(--nav-h))] flex-col justify-center gap-7 py-20">
          <div className="rise rise-1 flex flex-wrap items-center gap-3">
            <Badge
              tone="accent"
              dot>
              v0.0.0
            </Badge>
            <span className="text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">
              Rodium Labs · Design System
            </span>
          </div>

          <h1 className="rise rise-lead max-w-[18ch] text-display-l font-book tracking-tight text-ink-on-night sm:text-display-xl">
            One surface,{' '}
            <GradientText
              colors={[
                '#12a776',
                '#ff95f8',
                '#12a776',
              ]}
              speed={9}>
              every control
            </GradientText>
          </h1>

          <p className="rise rise-2 max-w-[58ch] text-lede text-ink-on-night-mid">
            The components behind rodiumlabs.org, pulled out into a kit: one black ground, one glass recipe, one ink
            scale, and a Biome config that every file in here already passes.
          </p>

          <div className="rise rise-3 flex flex-wrap gap-3">
            <Button
              tone="solid"
              href="#foundations">
              Browse the kit
            </Button>
            <Button
              tone="quiet"
              href="#button">
              Jump to controls
            </Button>
          </div>
        </Wrap>

        <Wrap className="pb-28">
          <div className="grid gap-12 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-16">
            <nav
              aria-label="Components"
              className="hidden lg:block">
              <ul className="sticky top-28 flex flex-col gap-1 border-l border-night-rule">
                {SECTIONS.map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] text-ink-on-night-dim transition-[color,border-color] duration-(--motion-fast) ease-rl hover:border-brand-green hover:text-ink-on-night motion-reduce:transition-none">
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex min-w-0 flex-col gap-16">
              <Foundations />
              <Buttons />
              <Forms />
              <Surfaces />
              <Feedback />
              <Navigation />
              <Editorial />
            </div>
          </div>
        </Wrap>

        <footer className="border-t border-night-rule py-10">
          <Wrap className="flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-[13px] text-ink-on-night-dim">
              <Mark size={14} />
              Rodium Labs
            </span>
            <span className="font-mono text-[12px] text-ink-on-night-dim">@rodium/ui · @rodium/tokens</span>
          </Wrap>
        </footer>
      </main>
    </div>
  )
}
