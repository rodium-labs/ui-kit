import { Card, Carousel } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const REGIONS = [
  [
    'eu-central-1',
    'Frankfurt',
    '12 ms',
  ],
  [
    'eu-west-2',
    'London',
    '18 ms',
  ],
  [
    'us-east-1',
    'Virginia',
    '86 ms',
  ],
  [
    'us-west-2',
    'Oregon',
    '141 ms',
  ],
  [
    'ap-south-1',
    'Mumbai',
    '119 ms',
  ],
  [
    'sa-east-1',
    'Sao Paulo',
    '204 ms',
  ],
]

export const page: DocPage = {
  slug: 'carousel',
  title: 'Carousel',
  summary: 'A row that runs past the edge of its container, snapping as it scrolls.',
  examples: [
    {
      title: 'A row of regions',
      note: 'swipe, or use the arrows',
      code: `<Carousel label="Regions">
  <Card title="eu-central-1" description="Frankfurt" />
  <Card title="eu-west-2" description="London" />
</Carousel>`,
      render: () => (
        <Carousel label="Regions">
          {REGIONS.map(([id, city, latency]) => (
            <Card
              key={id}
              title={id}
              description={city}
              footer={<span className="text-[12px] text-ink-on-night-dim tabular-nums">{latency}</span>}
            />
          ))}
        </Carousel>
      ),
    },
  ],
  props: [
    [
      'label',
      'string',
      'Names the carousel for anyone who cannot see it run.',
    ],
    [
      'children',
      'ReactNode',
      'One child, one slide.',
    ],
    [
      'slideWidth',
      'string',
      'How wide a slide is. Defaults to 17rem.',
    ],
  ],
  notes: (
    <>
      <p>
        The scroller is the browser's. Snapping, momentum, the trackpad and the swipe all come from making it a real
        overflow box, so the script only reports which end it has reached and nudges it one page along.
      </p>
      <p>
        The rail takes no tab stop of its own. The two buttons are the keyboard path, and anything focusable inside a
        slide scrolls itself into view when it is tabbed to.
      </p>
    </>
  ),
}
