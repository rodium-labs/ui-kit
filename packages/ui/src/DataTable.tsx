'use client'

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'

export type Align = 'start' | 'end'

export interface Column<Row> {
  key: string
  header: string
  align?: Align
  width?: string
  sortable?: boolean
  /** how the cell is drawn; defaults to the raw value */
  render?: (row: Row) => ReactNode
  /** what the column sorts on; defaults to row[key] */
  sortValue?: (row: Row) => string | number
}

export interface DataTableProps<Row> {
  columns: readonly Column<Row>[]
  rows: readonly Row[]
  rowKey: (row: Row) => string
  caption?: string
  /** holds the header while the body scrolls */
  stickyHeader?: boolean
  maxHeight?: string
  empty?: ReactNode
  className?: string
}

type Direction = 'asc' | 'desc'

function read<Row>(row: Row, column: Column<Row>): string | number {
  if (column.sortValue) return column.sortValue(row)
  const value = (row as Record<string, unknown>)[column.key]
  if (typeof value === 'number' || typeof value === 'string') return value
  return ''
}

const ALIGN: Record<Align, string> = {
  start: 'text-start',
  end: 'text-end tabular-nums',
}

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  caption,
  stickyHeader = false,
  maxHeight,
  empty = 'Nothing to show.',
  className,
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<{
    key: string
    direction: Direction
  } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // the bar lights up once the page has moved under it; the header does the
  // same once rows have moved under it, which is the only depth cue a pure
  // black ground can carry.
  useEffect(() => {
    const el = box.current
    if (!el || !stickyHeader) return
    const onScroll = () => setScrolled(el.scrollTop > 0)
    onScroll()
    el.addEventListener('scroll', onScroll, {
      passive: true,
    })
    return () => el.removeEventListener('scroll', onScroll)
  }, [
    stickyHeader,
  ])

  const ordered = useMemo(() => {
    if (!sort) return rows
    const column = columns.find(c => c.key === sort.key)
    if (!column) return rows
    const factor = sort.direction === 'asc' ? 1 : -1
    // a copy, because sorting the prop in place would mutate the caller's array
    return [
      ...rows,
    ].sort((a, b) => {
      const left = read(a, column)
      const right = read(b, column)
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * factor
      return (
        String(left).localeCompare(String(right), undefined, {
          numeric: true,
        }) * factor
      )
    })
  }, [
    rows,
    columns,
    sort,
  ])

  const toggle = (key: string) => {
    setSort(current => {
      if (current?.key !== key)
        return {
          key,
          direction: 'asc',
        }
      if (current.direction === 'asc')
        return {
          key,
          direction: 'desc',
        }
      return null
    })
  }

  return (
    <div
      ref={box}
      className={cn('overflow-auto border border-night-frame', className)}
      style={
        maxHeight
          ? {
              maxHeight,
            }
          : undefined
      }>
      <table className="w-full border-collapse text-left">
        {caption ? (
          <caption className="bg-night px-4 py-3 text-start text-[12px] font-medium tracking-[0.16em] text-ink-on-night-dim uppercase">
            {caption}
          </caption>
        ) : null}
        <thead className={cn(stickyHeader && 'sticky top-0 z-1')}>
          <tr>
            {columns.map(column => {
              const active = sort?.key === column.key
              const align = column.align ?? 'start'
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={
                    column.width
                      ? {
                          width: column.width,
                        }
                      : undefined
                  }
                  aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                  className={cn(
                    'bg-night px-4 py-2.5 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap text-ink-on-night-dim uppercase',
                    stickyHeader && scrolled
                      ? 'shadow-[inset_0_-1px_0_var(--color-night-edge-lit)]'
                      : 'shadow-[inset_0_-1px_0_var(--color-night-edge)]',
                    'transition-shadow duration-(--motion-base) ease-rl motion-reduce:transition-none',
                    ALIGN[align],
                  )}>
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggle(column.key)}
                      className={cn(
                        'inline-flex min-h-6 items-center gap-1.5 transition-colors duration-(--motion-fast) hover:text-ink-on-night motion-reduce:transition-none',
                        align === 'end' && 'flex-row-reverse',
                        active && 'text-ink-on-night',
                        focus,
                      )}>
                      {column.header}
                      <span
                        aria-hidden="true"
                        className={cn('text-[10px]', active ? 'text-brand-green' : 'text-ink-on-night-faint')}>
                        {active ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {ordered.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-[14px] text-ink-on-night-dim">
                {empty}
              </td>
            </tr>
          ) : (
            ordered.map(row => (
              <tr
                key={rowKey(row)}
                className="border-b border-night-rule transition-colors duration-(--motion-fast) last:border-b-0 hover:bg-night-wash motion-reduce:transition-none">
                {columns.map((column, index) => {
                  const align = column.align ?? 'start'
                  const content = column.render ? column.render(row) : String(read(row, column))
                  return index === 0 ? (
                    <th
                      key={column.key}
                      scope="row"
                      className={cn(
                        'px-4 py-2.5 text-[13px] font-medium whitespace-nowrap text-ink-on-night',
                        ALIGN[align],
                      )}>
                      {content}
                    </th>
                  ) : (
                    <td
                      key={column.key}
                      className={cn('px-4 py-2.5 text-[13px] text-ink-on-night-mid', ALIGN[align])}>
                      {content}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
