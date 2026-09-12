import { Link } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'link',
  title: 'Link',
  summary:
    'A link in running text. It stays underlined, because inside a paragraph colour alone is not enough to tell one apart from the words around it.',
  examples: [
    {
      title: 'In a sentence',
      code: `<Link href="/waltz">the build notes</Link>
<Link href={REPO} external>github.com/rodium-labs</Link>`,
      render: () => (
        <p className="max-w-[52ch] text-[15px] leading-[1.7] text-ink-on-night-mid">
          The panel is 284×76 and the player paints it in bands with no framebuffer, which is covered in{' '}
          <Link href="#/panel">the build notes</Link>. The source is on{' '}
          <Link
            href="https://github.com/rodium-labs"
            external>
            github.com/rodium-labs
          </Link>
          .
        </p>
      ),
    },
  ],
  props: [
    [
      'href',
      'string',
      'Where it goes.',
    ],
    [
      'external',
      'boolean',
      'Opens in a new tab and appends the arrow.',
    ],
  ],
  notes: (
    <>
      <p>
        The underline takes its position and thickness from the font's own metrics rather than from wherever the browser
        would have put the line.
      </p>
      <p>
        Link text has to make sense out of context, because screen-reader users navigate by a list of the page's links.
        "Read the billing docs" works; "click here" fails twice over.
      </p>
    </>
  ),
}
