import { Stat } from '@rodium/ui'
import { useEffect, useState } from 'react'
import type { DocPage } from '../docs/types'

function LiveStats() {
  const [deploys, setDeploys] = useState(128)
  const [failures, setFailures] = useState(3)
  const [median, setMedian] = useState(41)

  useEffect(() => {
    const tick = window.setInterval(() => {
      setDeploys(n => n + Math.round(Math.random() * 6))
      setFailures(n => Math.max(0, n + (Math.random() > 0.6 ? 1 : -1)))
      setMedian(n => Math.max(18, Math.min(90, n + Math.round((Math.random() - 0.5) * 14))))
    }, 2200)
    return () => window.clearInterval(tick)
  }, [])

  return (
    <div className="grid gap-8 sm:grid-cols-3">
      <Stat
        animate
        label="Deploys"
        value={deploys}
        trend="up"
        delta="live"
      />
      <Stat
        animate
        label="Failures"
        value={failures}
        trend="down"
        delta="live"
      />
      <Stat
        animate
        label="Median build"
        value={median}
        unit="s"
        trend="flat"
        delta="live"
      />
    </div>
  )
}

export const page: DocPage = {
  slug: 'stat',
  title: 'Stat',
  summary:
    'One number, large. It counts from the old value to the new one when the data moves, and the arrow and hidden word carry the direction alongside the colour.',
  examples: [
    {
      title: 'Counting',
      note: 'the numbers change every couple of seconds',
      code: `<Stat animate label="Deploys" value={deploys} trend="up" delta="live" />`,
      render: () => <LiveStats />,
    },
    {
      title: 'Fixed',
      code: `<Stat label="Deploys" value="128" trend="up" delta="12 this week" />`,
      render: () => (
        <div className="grid gap-8 sm:grid-cols-3">
          <Stat
            label="Deploys"
            value="128"
            trend="up"
            delta="12 this week"
          />
          <Stat
            label="Failures"
            value="3"
            trend="down"
            delta="2 fewer"
          />
          <Stat
            label="Median build"
            value="41"
            unit="s"
            trend="flat"
            delta="unchanged"
          />
        </div>
      ),
    },
  ],
  props: [
    [
      'label',
      'string',
      'What the number is.',
    ],
    [
      'value',
      'ReactNode',
      'The number itself, set in tabular figures.',
    ],
    [
      'unit',
      'string',
      'Sits after the value at reading size.',
    ],
    [
      'trend',
      "'up' | 'down' | 'flat'",
      'Picks the arrow and the hue.',
    ],
    [
      'delta',
      'string',
      'The change, beside the arrow.',
    ],
    [
      'animate',
      'boolean',
      'Counts from the old number to the new one. Skipped under reduced motion.',
    ],
  ],
  notes: (
    <p>
      Each trend adds a visually hidden word — up, down, level — so the direction is never carried by the hue and the
      arrow glyph alone.
    </p>
  ),
}
