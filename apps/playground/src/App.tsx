import { Action, Arrow, Bar, Contents, Cover, Display, Eyebrow, Mark, Rule, Ticker, Wrap } from '@rodium/ui'
import { Actions } from './sections/Actions'
import { Chrome } from './sections/Chrome'
import { Editorial } from './sections/Editorial'
import { Forms } from './sections/Forms'
import { Foundations } from './sections/Foundations'

const REPO_URL = 'https://github.com/rodium-labs'

const NAV = [
  {
    label: 'Foundations',
    href: '#foundations',
  },
  {
    label: 'Action',
    href: '#action',
  },
  {
    label: 'Form',
    href: '#form',
  },
  {
    label: 'Editorial',
    href: '#editorial',
  },
  {
    label: 'Chrome',
    href: '#chrome',
  },
]

const CONTENTS = [
  {
    label: 'foundations',
    href: '#foundations',
  },
  {
    label: 'action',
    href: '#action',
  },
  {
    label: 'form',
    href: '#form',
  },
  {
    label: 'editorial',
    href: '#editorial',
  },
  {
    label: 'chrome',
    href: '#chrome',
  },
]

const DISCIPLINES = [
  'Tokens',
  'Actions',
  'Forms',
  'Editorial',
  'Chrome',
] as const

const SECTIONS = [
  Foundations,
  Actions,
  Forms,
  Editorial,
  Chrome,
]

export function App() {
  return (
    <div className="grid-ground flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only bg-ink-on-night text-[13px] font-semibold text-night focus:not-sr-only focus:fixed focus:start-4 focus:top-3 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:px-4">
        Skip to content
      </a>

      <Bar
        home="#main"
        name="Rodium UI"
        logo={<Mark size={18} />}
        links={NAV}
        actionLabel="GitHub"
        actionHref={REPO_URL}
      />

      <main
        id="main"
        className="flex-1 scroll-mt-(--nav-h)">
        <Cover>
          <div className="my-auto">
            <div className="rise">
              <Eyebrow>kit/</Eyebrow>
            </div>
            <Display className="rise rise-lead mt-4 max-w-[18ch] text-balance">The surface, taken apart.</Display>
            <p className="rise rise-2 mt-6 max-w-[46ch] text-lede text-ink-on-night-mid">
              Every control rodiumlabs.org already wears, pulled into one kit: a black ground, one white at four
              strengths, square corners, and a single green kept for whatever has focus.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <Action href="#foundations">Browse the kit</Action>
              <Action
                href={REPO_URL}
                tone="quiet"
                external>
                Read the source
              </Action>
            </div>

            <Contents
              items={CONTENTS}
              className="rise rise-4 mt-14"
            />
          </div>

          <div className="strip rise rise-4 mt-14 border-t border-night-rule pt-6">
            <Ticker words={DISCIPLINES} />
          </div>
        </Cover>

        {SECTIONS.map(SectionBody => (
          <div key={SectionBody.name}>
            <Rule />
            <Wrap className="py-20 min-[900px]:py-28">
              <SectionBody />
            </Wrap>
          </div>
        ))}
      </main>

      <footer className="mt-auto border-t border-night-rule">
        <Wrap className="flex flex-col gap-6 py-10 min-[720px]:flex-row min-[720px]:items-end min-[720px]:justify-between">
          <div className="flex max-w-[42ch] flex-col gap-2.5">
            <span className="flex min-h-6 w-fit items-center gap-2.5 text-ink-on-night">
              <Mark size={16} />
              <span className="text-[14px] font-semibold">Rodium Labs</span>
            </span>
            <p className="text-[13px] leading-[1.6] text-ink-on-night-dim">
              The kit is private and versioned with the sites that wear it. Everything here is one import away.
            </p>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="nudge flex min-h-6 w-fit items-center gap-1.5 rounded-[4px] text-[13px] text-ink-on-night-mid transition-colors duration-(--motion-fast) hover:text-ink-on-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-brand-green) motion-reduce:transition-none">
            github.com/rodium-labs
            <Arrow size={12} />
          </a>
        </Wrap>
      </footer>
    </div>
  )
}
