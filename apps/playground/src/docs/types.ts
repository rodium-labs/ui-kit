import type { ReactNode } from 'react'

export interface DocExample {
  title: string
  note?: string
  code?: string
  render: () => ReactNode
}

/** name, type, description */
export type PropRow = readonly [
  string,
  string,
  string,
]

export interface DocPage {
  slug: string
  title: string
  /** short label for the sidebar; falls back to title */
  nav?: string
  summary: string
  examples?: readonly DocExample[]
  props?: readonly PropRow[]
  notes?: ReactNode
  body?: () => ReactNode
}

export interface DocSection {
  title: string
  pages: readonly DocPage[]
}
