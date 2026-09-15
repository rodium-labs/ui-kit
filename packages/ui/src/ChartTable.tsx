import { format, type Series } from './chart.js'
import { Table } from './Table.js'

export interface ChartTableProps {
  series: readonly Series[]
}

// the same numbers the plot draws. not a fallback: it is where a screen reader,
// a printout and anyone checking a figure against a total all end up.
export function ChartTable({ series }: ChartTableProps) {
  const labels = series.at(0)?.points.map(p => p.label) ?? []
  return (
    <Table
      head={[
        '',
        ...series.map(s => s.name),
      ]}
      rows={labels.map((label, i) => [
        label,
        ...series.map(s => format(s.points.at(i)?.value ?? 0)),
      ])}
    />
  )
}
