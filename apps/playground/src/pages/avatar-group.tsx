import { AvatarGroup } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const PEOPLE = [
  {
    name: 'Ada Lovelace',
  },
  {
    name: 'Grace Hopper',
  },
  {
    name: 'Alan Turing',
  },
  {
    name: 'Katherine Johnson',
  },
  {
    name: 'Edsger Dijkstra',
  },
  {
    name: 'Barbara Liskov',
  },
]

export const page: DocPage = {
  slug: 'avatar-group',
  title: 'Avatar group',
  nav: 'Avatar group',
  summary: 'A row of people, with the ones past the limit counted rather than dropped.',
  examples: [
    {
      title: 'Six people, four drawn',
      code: `<AvatarGroup people={people} max={4} />`,
      render: () => (
        <div className="flex flex-col gap-5">
          <AvatarGroup people={PEOPLE} />
          <AvatarGroup
            people={PEOPLE.slice(0, 3)}
            size="lg"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'people',
      'AvatarGroupPerson[]',
      'name, and optionally src.',
    ],
    [
      'max',
      'number',
      'How many to draw before the rest become a count. Defaults to 4.',
    ],
    [
      'size',
      "'sm' | 'md' | 'lg'",
      'Passed through to each avatar.',
    ],
  ],
  notes: (
    <>
      <p>
        The group carries one accessible name listing everyone, including the ones not drawn. Five separate images in a
        row is not what anyone wants read out.
      </p>
      <p>
        They do not overlap. Stacking is an idiom for round avatars, where the curve of the one in front says which is
        in front; these are square like everything else here, and overlapping squares read as boxes wedged into each
        other.
      </p>
    </>
  ),
}
