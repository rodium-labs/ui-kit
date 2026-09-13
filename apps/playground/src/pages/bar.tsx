import type { DocPage } from '../docs/types'
import { RodiumMark } from '../ui/RodiumMark'

export const page: DocPage = {
  slug: 'bar',
  title: 'Bar',
  summary:
    'The bar at the top of this page. It sticks, it carries one blurred layer of its own rather than wearing one on the header, and below 620px its links fold into a native disclosure.',
  examples: [
    {
      title: 'In place',
      note: 'the live one is above — this is the same component',
      code: `<Bar
  name="Rodium Labs"
  logo={<RodiumMark size={18} />}
  links={[{ label: 'Work', href: '#work' }]}
  actionLabel="GitHub"
  actionHref={ORG_URL}
/>`,
      render: () => (
        <div className="relative h-[77px] overflow-hidden border border-night-frame">
          <div className="pointer-events-none absolute inset-0 flex items-center gap-8 px-6">
            <span className="flex items-center gap-2.5 text-ink-on-night">
              <RodiumMark size={18} />
              <span className="text-[15px] font-semibold tracking-[-0.01em]">Rodium Labs</span>
            </span>
            <span className="ms-auto hidden items-center gap-4 text-[14px] text-ink-on-night-mid min-[620px]:flex">
              <span>Work</span>
              <span>Prototyping</span>
              <span>About</span>
            </span>
            <span className="flex min-h-9 items-center border border-night-edge px-3.5 text-[14px] font-medium text-ink-on-night">
              GitHub
            </span>
          </div>
        </div>
      ),
    },
  ],
  props: [
    [
      'name',
      'string',
      'The wordmark beside the logo.',
    ],
    [
      'logo',
      'ReactNode',
      'Whatever mark the site wears. The kit ships none.',
    ],
    [
      'home',
      'string',
      'Where the wordmark goes. Default "/".',
    ],
    [
      'links',
      'readonly BarLink[]',
      'The sections. Below 620px these move into the disclosure.',
    ],
    [
      'actionLabel / actionHref',
      'string',
      'One outbound action, opened in a new tab.',
    ],
  ],
  notes: (
    <>
      <p>
        The blur sits on a layer of its own rather than on the header. An element with a backdrop filter is a backdrop
        root, and anything inside one samples that element instead of the page — which is what kept the open sheet from
        carrying the same glass.
      </p>
      <p>
        Closing on a pick, on escape and on a pointer outside comes from{' '}
        <code className="text-ink-on-night">useMenuDismiss</code>, which the bar installs for itself. That behaviour
        used to ship as an injected script, which React never executes on the client.
      </p>
    </>
  ),
}
