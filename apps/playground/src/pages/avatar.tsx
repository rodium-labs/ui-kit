import { Avatar } from '@rodium/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'avatar',
  title: 'Avatar',
  summary: 'A person, at three sizes. With no image it falls back to initials and names itself for a screen reader.',
  examples: [
    {
      title: 'Sizes',
      code: `<Avatar name="Yusuf Yildirim" size="md" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            name="Ada Lovelace"
            size="sm"
          />
          <Avatar name="Yusuf Yildirim" />
          <Avatar
            name="Rodium Labs"
            size="lg"
          />
        </div>
      ),
    },
    {
      title: 'Beside a name',
      render: () => (
        <div className="flex items-center gap-3">
          <Avatar name="Yusuf Yildirim" />
          <div className="flex flex-col">
            <span className="text-[13px] text-ink-on-night">Yusuf Yildirim</span>
            <span className="text-[12px] text-ink-on-night-dim">pushed 3 commits</span>
          </div>
        </div>
      ),
    },
  ],
  props: [
    [
      'name',
      'string',
      'Used for the initials and the accessible name. Required.',
    ],
    [
      'src',
      'string',
      'An image. Without one the initials stand in.',
    ],
    [
      'size',
      "'sm' | 'md' | 'lg'",
      'Default md.',
    ],
  ],
  notes: (
    <p>
      Square, like the rest of the surface. An initials avatar carries{' '}
      <code className="text-ink-on-night">role="img"</code> and the full name, because two letters on their own announce
      nothing.
    </p>
  ),
}
