import { Avatar } from '@rodium/ui'
import type { DocPage } from '../docs/types'

const FACE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%233d2631'/%3E%3Ccircle cx='48' cy='38' r='17' fill='%2312a776'/%3E%3Cpath d='M12 96c0-20 16-32 36-32s36 12 36 32z' fill='%2341b991'/%3E%3C/svg%3E"

export const page: DocPage = {
  slug: 'avatar',
  title: 'Avatar',
  summary:
    'A person, at three sizes. It takes an ordinary image and crops it to fill; with none it falls back to initials and names itself for a screen reader.',
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
      title: 'With an image',
      note: 'src wins; the initials are only the fallback',
      code: `<Avatar name="Ada Lovelace" src="/people/ada.jpg" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            name="Ada Lovelace"
            src={FACE}
            size="sm"
          />
          <Avatar
            name="Ada Lovelace"
            src={FACE}
          />
          <Avatar
            name="Ada Lovelace"
            src={FACE}
            size="lg"
          />
          <span className="text-[13px] text-ink-on-night-dim">the image is cropped to fill, never squashed</span>
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
