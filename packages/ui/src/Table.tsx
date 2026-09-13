import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface TableProps {
  caption?: string
  head?: readonly string[]
  rows: readonly (readonly ReactNode[])[]
  className?: string
}

const CELL = [
  'text-ink-on-night',
  'text-ink-on-night-mid',
  'text-ink-on-night-dim',
] as const

// a row of hairlines rather than a boxed grid: the first cell is the row's
// name, and each column after it steps one level down the ink scale.
export function Table({ caption, head, rows, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[32rem] border-collapse text-left">
        {caption ? (
          <caption className="mb-4 text-left text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">
            {caption}
          </caption>
        ) : null}
        {head ? (
          <thead>
            <tr className="border-t border-night-rule">
              {head.map(label => (
                <th
                  key={label}
                  scope="col"
                  className="py-3 pe-6 text-left text-[12px] font-medium tracking-[0.12em] text-ink-on-night-dim uppercase">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, index) => (
            <tr
              // the first cell names the row, so it is what identifies it
              key={String(row.at(0) ?? index)}
              className="border-t border-night-rule">
              {row.map((cell, column) => {
                const tint = CELL.at(Math.min(column, CELL.length - 1))
                return column === 0 ? (
                  <th
                    key={String(cell)}
                    scope="row"
                    className={cn('py-3 pe-6 align-top text-[14px] font-medium whitespace-nowrap tabular-nums', tint)}>
                    {cell}
                  </th>
                ) : (
                  <td
                    key={String(cell)}
                    className={cn('py-3 pe-6 align-top text-[14px]', tint)}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
