import { Action, Arrow, Bar, CommandPalette, cn, focus, Kbd, Search, SideNav, useMenuDismiss, Wrap } from '@rodium/ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DocsPage } from './docs/DocsPage'
import { ALL_PAGES, findPage, neighbours, SECTIONS } from './docs/registry'
import { href, useRoute } from './docs/router'
import { RodiumMark } from './ui/RodiumMark'

const REPO_URL = 'https://github.com/rodium-labs'

const BAR_LINKS = [
  {
    label: 'Docs',
    href: href('introduction'),
  },
  {
    label: 'Tokens',
    href: href('tokens'),
  },
  {
    label: 'Components',
    href: href('action'),
  },
]

export function App() {
  const index = useRef<HTMLDetailsElement>(null)
  useMenuDismiss(index)
  const slug = useRoute()
  const [searchOpen, setSearchOpen] = useState(false)

  const navSections = useMemo(
    () =>
      SECTIONS.map(section => ({
        title: section.title,
        items: section.pages.map(entry => ({
          label: entry.nav ?? entry.title,
          href: href(entry.slug),
        })),
      })),
    [],
  )

  const commands = useMemo(
    () =>
      ALL_PAGES.map(entry => ({
        id: entry.slug,
        label: entry.nav ?? entry.title,
        group: SECTIONS.find(section => section.pages.includes(entry))?.title,
        hint: entry.slug,
        keywords: entry.summary,
        onSelect: () => {
          window.location.hash = `/${entry.slug}`
        },
      })),
    [],
  )
  const page = findPage(slug)
  const { previous, next } = neighbours(slug)

  // a route change is a new document as far as the reader is concerned
  useEffect(() => {
    document.title = page ? `${page.title} — Rodium UI` : 'Rodium UI'
    window.scrollTo({
      top: 0,
    })
  }, [
    page,
  ])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only bg-ink-on-night text-[13px] font-semibold text-night focus:not-sr-only focus:fixed focus:start-4 focus:top-3 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:px-4">
        Skip to content
      </a>

      <Bar
        home={href('introduction')}
        name="Rodium UI"
        logo={<RodiumMark size={18} />}
        links={BAR_LINKS}
        actionLabel="GitHub"
        actionHref={REPO_URL}
        actions={
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the kit"
            aria-keyshortcuts="Meta+K Control+K"
            className={cn(
              'flex min-h-9 shrink-0 items-center gap-2 border border-night-edge px-2.5 text-[13px] text-ink-on-night-dim',
              'transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:text-ink-on-night',
              'motion-reduce:transition-none',
              focus,
            )}>
            <Search size={14} />
            <span className="hidden min-[860px]:inline">Search</span>
            <Kbd className="hidden min-[860px]:inline-flex">⌘K</Kbd>
          </button>
        }
      />

      <CommandPalette
        open={searchOpen}
        onOpenChange={setSearchOpen}
        items={commands}
        placeholder="Search the kit…"
        label="Search the kit"
      />

      <Wrap className="flex w-full flex-1 gap-12 py-12 lg:gap-16">
        {/* the rail follows the column's py-12: it starts one padding below the
            bar and is two paddings shorter than the screen. a taller rail than
            that makes it the tallest column and scrolls every short page. */}
        <aside className="hidden w-[200px] shrink-0 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+3rem)] max-h-[calc(100svh-var(--nav-h)-6rem)] overflow-y-auto pe-2">
            <SideNav
              sections={navSections}
              current={href(slug)}
              label="Components"
            />
          </div>
        </aside>

        <main
          id="main"
          className="flex min-w-0 flex-1 flex-col gap-10">
          {/* the rail is hidden below lg, so the index has to come back as a
              disclosure or the whole kit is reachable only one page at a time */}
          <details
            ref={index}
            className="menu group -mt-2 border-b border-night-rule pb-4 lg:hidden">
            <summary
              className={`flex min-h-11 cursor-pointer list-none items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-ink-on-night uppercase [&::-webkit-details-marker]:hidden ${focus}`}>
              Browse components
              <svg
                width={13}
                height={13}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="square"
                aria-hidden="true"
                focusable="false"
                className="text-ink-on-night-dim transition-transform duration-(--motion-base) ease-rl group-open:-rotate-180 motion-reduce:transition-none">
                <path d="M4 6.5 L8 10.5 L12 6.5" />
              </svg>
            </summary>
            <div className="pt-6">
              <SideNav
                sections={navSections}
                current={href(slug)}
                label="Components"
              />
            </div>
          </details>

          {page ? (
            <DocsPage page={page} />
          ) : (
            <div className="flex flex-col gap-5">
              <h1 className="text-title font-semibold text-ink-on-night">No page at that address.</h1>
              <p className="max-w-[46ch] text-body text-ink-on-night-mid">
                The kit has no component called <code className="text-ink-on-night">{slug}</code>. Start from the
                introduction and pick one from the list.
              </p>
              <div>
                <Action href={href('introduction')}>Back to the introduction</Action>
              </div>
            </div>
          )}

          {page ? (
            <nav
              aria-label="Pagination"
              className="flex flex-wrap items-stretch justify-between gap-4 border-t border-night-rule pt-8">
              {previous ? (
                <a
                  href={href(previous.slug)}
                  className="group flex max-w-[48%] flex-col gap-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-brand-green)">
                  <span className="text-[12px] tracking-[0.12em] text-ink-on-night-dim uppercase">Previous</span>
                  <span className="text-[15px] font-medium text-ink-on-night-mid transition-colors duration-(--motion-fast) group-hover:text-ink-on-night motion-reduce:transition-none">
                    {previous.title}
                  </span>
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a
                  href={href(next.slug)}
                  className="group flex max-w-[48%] flex-col items-end gap-1 text-end focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-brand-green)">
                  <span className="text-[12px] tracking-[0.12em] text-ink-on-night-dim uppercase">Next</span>
                  <span className="flex items-center gap-1.5 text-[15px] font-medium text-ink-on-night-mid transition-colors duration-(--motion-fast) group-hover:text-ink-on-night motion-reduce:transition-none">
                    {next.title}
                    <Arrow size={12} />
                  </span>
                </a>
              ) : null}
            </nav>
          ) : null}
        </main>
      </Wrap>
    </div>
  )
}
