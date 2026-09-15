import { Sparkline, Stat } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

const TREND = [
  124,
  131,
  128,
  142,
  139,
  151,
  148,
  163,
  171,
  168,
  179,
  186,
].map((value, i) => ({
  label: `w${i + 1}`,
  value,
}))

export const page: DocPage = {
  slug: 'sparkline',
  title: 'Sparkline',
  summary: 'The smallest chart there is: a shape beside a number, with no axis and no legend.',
  examples: [
    {
      title: 'Beside a stat',
      code: `<Sparkline label="Deploys per week" points={weeks} />`,
      render: () => (
        <div className="flex flex-wrap items-end gap-10">
          <div className="flex flex-col gap-3">
            <Stat
              label="Deploys"
              value="186"
              trend="up"
              delta="+11 this week"
            />
            <Sparkline
              label="Deploys per week"
              points={TREND}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Stat
              label="p95 latency"
              value="41"
              unit="ms"
              trend="down"
              delta="-6 ms"
            />
            <Sparkline
              label="p95 latency"
              points={[
                ...TREND,
              ].reverse()}
            />
          </div>
        </div>
      ),
    },
  ],
  props: [
    [
      'points',
      'Point[]',
      'label and value. The label is only read out, never drawn.',
    ],
    [
      'label',
      'string',
      'What it plots, for anyone who cannot see it.',
    ],
    [
      'width / height',
      'number',
      'Defaults to 96 by 24.',
    ],
  ],
  notes: (
    <>
      <p>
        It reads shape, not magnitude, so it does not start at zero. That is the one place in the kit where a baseline
        is allowed to float, and it works because there are no gridlines to misread it against.
      </p>
      <p>It carries no tooltip. There is nothing to point at that the number beside it does not already say.</p>
    </>
  ),
}
