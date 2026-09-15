import { ChartFrame } from './ChartFrame.js'
import { format, span } from './chart.js'
import { Table } from './Table.js'

export interface DumbbellRow {
  label: string
  from: number
  to: number
}

export interface DumbbellProps {
  title: string
  caption?: string
  rows: readonly DumbbellRow[]
  fromLabel?: string
  toLabel?: string
  className?: string
}

// before and after per item. one hue in two shades rather than two hues: the
// pair is the same measure at two times, not two different things, and reading
// them as two categories is the wrong idea about the data.
export function Dumbbell({ title, caption, rows, fromLabel = 'Before', toLabel = 'After', className }: DumbbellProps) {
  const of = span(
    rows.flatMap(r => [
      r.from,
      r.to,
    ]),
  )
  const at = (v: number) => ((v - of.min) / (of.max - of.min)) * 100

  return (
    <ChartFrame
      title={title}
      caption={caption}
      className={className}
      legend={
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {[
            [
              fromLabel,
              'var(--color-scale-2)',
            ],
            [
              toLabel,
              'var(--color-series-1)',
            ],
          ].map(([name, colour]) => (
            <li
              key={name}
              className="flex items-center gap-1.5 text-[12px] text-ink-on-night-mid">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{
                  background: colour,
                }}
              />
              {name}
            </li>
          ))}
        </ul>
      }
      table={
        <Table
          head={[
            '',
            fromLabel,
            toLabel,
          ]}
          rows={rows.map(r => [
            r.label,
            format(r.from),
            format(r.to),
          ])}
        />
      }>
      <ul className="flex flex-col gap-3">
        {rows.map(r => (
          <li
            key={r.label}
            className="flex items-center gap-3">
            <span className="w-20 shrink-0 truncate text-[12px] text-ink-on-night-mid">{r.label}</span>
            <span
              aria-hidden="true"
              className="relative h-2.5 min-w-0 flex-1">
              <span
                className="absolute top-1/2 h-px -translate-y-1/2 bg-night-edge"
                style={{
                  left: `${Math.min(at(r.from), at(r.to))}%`,
                  width: `${Math.abs(at(r.to) - at(r.from))}%`,
                }}
              />
              {[
                [
                  r.from,
                  'var(--color-scale-2)',
                ],
                [
                  r.to,
                  'var(--color-series-1)',
                ],
              ].map(([v, colour]) => (
                <span
                  key={String(colour)}
                  className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-night"
                  style={{
                    left: `${at(v as number)}%`,
                    background: colour as string,
                  }}
                />
              ))}
            </span>
            <span className="w-14 shrink-0 text-end text-[12px] text-ink-on-night tabular-nums">
              {r.to > r.from ? '+' : ''}
              {format(r.to - r.from)}
            </span>
          </li>
        ))}
      </ul>
    </ChartFrame>
  )
}
