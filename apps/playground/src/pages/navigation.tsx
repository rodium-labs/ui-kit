import { Accordion, Contents, Tabs } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const tabsPage: DocPage = {
  slug: 'tabs',
  title: 'Tabs',
  summary:
    'One panel at a time. The selected tab draws the same underline the bar’s links draw on hover, so the two read as one idea.',
  examples: [
    {
      title: 'With panels',
      note: 'arrow keys move between them and wrap at the ends',
      code: `<Tabs label="Build" items={[
  { value: 'log', label: 'Log', panel: <Log /> },
  { value: 'env', label: 'Environment', panel: <Env /> },
]} />`,
      render: () => (
        <Tabs
          label="Build detail"
          items={[
            {
              value: 'log',
              label: 'Log',
              panel: (
                <p className="max-w-[52ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
                  The strip scrolls where it has to, and a disabled tab is skipped rather than focused.
                </p>
              ),
            },
            {
              value: 'env',
              label: 'Environment',
              panel: (
                <p className="max-w-[52ch] text-[15px] leading-[1.65] text-ink-on-night-mid">
                  Selection is controlled or uncontrolled; pass value and onValueChange to own it yourself.
                </p>
              ),
            },
            {
              value: 'artifacts',
              label: 'Artifacts',
              panel: <p className="text-[15px] text-ink-on-night-mid">None.</p>,
            },
            {
              value: 'off',
              label: 'Disabled',
              disabled: true,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly TabItem[]',
      'Each takes a value, a label and an optional panel.',
    ],
    [
      'label',
      'string',
      'Names the tablist. Default "Sections".',
    ],
    [
      'value / defaultValue',
      'string',
      'Controlled or uncontrolled selection.',
    ],
    [
      'onValueChange',
      '(value: string) => void',
      'Called with the tab picked.',
    ],
  ],
  notes: (
    <p>
      Roving tabindex: the selected tab is the only one in the tab order, and the arrow keys move within the strip. That
      is the ARIA pattern, and it is what keeps Tab moving <em>past</em> the tabs to the panel.
    </p>
  ),
}

export const contentsPage: DocPage = {
  slug: 'contents',
  title: 'Contents',
  summary: 'The way into a long page, sitting on the cover’s baseline.',
  examples: [
    {
      title: 'On this page',
      code: `<Contents items={[{ label: 'specs', href: '#specs' }]} />`,
      render: () => (
        <Contents
          items={[
            {
              label: 'foundations',
              href: '#/tokens',
            },
            {
              label: 'action',
              href: '#/action',
            },
            {
              label: 'form',
              href: '#/input',
            },
            {
              label: 'editorial',
              href: '#/table',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly ContentsItem[]',
      'Each takes a label and an href.',
    ],
  ],
}

export const accordionPage: DocPage = {
  slug: 'accordion',
  title: 'Accordion',
  summary:
    'Stacked disclosures, built on the native element. A shared name makes the group exclusive without a line of script.',
  examples: [
    {
      title: 'One at a time',
      note: 'single passes a shared name to every details',
      code: `<Accordion single items={items} />`,
      render: () => (
        <Accordion
          single
          name="docs-accordion"
          items={[
            {
              value: 'why',
              title: 'Why the native element?',
              content:
                'It opens and closes before any JavaScript has run, it is in the tab order for free, and it announces its own expanded state.',
            },
            {
              value: 'motion',
              title: 'What about the opening animation?',
              content:
                'A closed details subtree skips style recalculation, so a CSS animation bound to [open] is never torn down and only ever runs once. The chevron turns; the panel does not slide.',
            },
            {
              value: 'exclusive',
              title: 'Can several be open at once?',
              content: 'Leave single off. Without a shared name each disclosure is independent.',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'items',
      'readonly AccordionItem[]',
      'Each takes a value, a title and its content.',
    ],
    [
      'single',
      'boolean',
      'Gives every panel one name, so opening one closes the rest.',
    ],
    [
      'name',
      'string',
      'The shared name to use. Default "accordion".',
    ],
  ],
}
