import { SideNav } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const SECTIONS = [
  {
    title: 'Getting started',
    items: [
      {
        label: 'Introduction',
        href: '#sidenav-introduction',
      },
      {
        label: 'Installation',
        href: '#sidenav-installation',
      },
    ],
  },
  {
    title: 'Forms',
    items: [
      {
        label: 'Input',
        href: '#sidenav-input',
      },
      {
        label: 'Select',
        href: '#sidenav-select',
      },
      {
        label: 'Checkbox',
        href: '#sidenav-checkbox',
      },
      {
        label: 'Slider',
        href: '#sidenav-slider',
      },
    ],
  },
]

export const page: DocPage = {
  slug: 'side-nav',
  nav: 'Side nav',
  title: 'Side nav',
  summary:
    'The rail down the left of this page. One continuous line per section with the current page marked on it, rather than a border per row.',
  examples: [
    {
      title: 'Sections and a current page',
      note: 'the live one is the rail down the left of this page',
      code: `<SideNav
  sections={[
    { title: 'Forms', items: [{ label: 'Input', href: '/input' }] },
  ]}
  current={pathname}
  label="Components"
/>`,
      render: () => (
        <div className="max-w-[220px]">
          <SideNav
            sections={SECTIONS}
            current="#sidenav-select"
            label="Demo sections"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'sections',
      'readonly SideNavSection[]',
      'Each takes a title and its items.',
    ],
    [
      'items',
      'readonly SideNavItem[]',
      'A label and an href per row.',
    ],
    [
      'current',
      'string',
      'The href of the page being read. Matched exactly.',
    ],
    [
      'label',
      'string',
      'Names the nav landmark. Default "Sections".',
    ],
  ],
  notes: (
    <>
      <p>
        The rail is one border drawn by the group, not a border on each row. A border per row leaves a hole wherever the
        rows are spaced, which reads as a column of dashes rather than a line — so the rows sit flush and take their own
        padding instead.
      </p>
      <p>
        The current marker sits <em>on</em> the rail rather than replacing it, so the line stays unbroken as the reader
        moves between pages. The row also carries <code className="text-ink-on-night">aria-current="page"</code>, so the
        position is announced and not only drawn.
      </p>
    </>
  ),
}
