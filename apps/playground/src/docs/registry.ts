import { page as accordion } from '../pages/accordion'
import { page as action } from '../pages/action'
import { page as alert } from '../pages/alert'
import { page as avatar } from '../pages/avatar'
import { page as bar } from '../pages/bar'
import { page as breadcrumb } from '../pages/breadcrumb'
import { page as checkbox } from '../pages/checkbox'
import { page as code } from '../pages/code'
import { page as contents } from '../pages/contents'
import { page as dataTable } from '../pages/datatable'
import { page as dialog } from '../pages/dialog'
import { page as emptyState } from '../pages/empty-state'
import { page as facts } from '../pages/facts'
import { page as input } from '../pages/input'
import { page as installation } from '../pages/installation'
import { page as introduction } from '../pages/introduction'
import { page as kbd } from '../pages/kbd'
import { page as link } from '../pages/link'
import { page as menu } from '../pages/menu'
import { page as nativeSelect } from '../pages/native-select'
import { page as pagination } from '../pages/pagination'
import { page as progress } from '../pages/progress'
import { page as radio } from '../pages/radio'
import { page as commandPalette } from '../pages/search'
import { page as select } from '../pages/select'
import { page as sideNav } from '../pages/sidenav'
import { page as skeleton } from '../pages/skeleton'
import { page as slider } from '../pages/slider'
import { page as spinner } from '../pages/spinner'
import { page as stat } from '../pages/stat'
import { page as status } from '../pages/status'
import { page as switchPage } from '../pages/switch'
import { page as table } from '../pages/table'
import { page as tabs } from '../pages/tabs'
import { page as tag } from '../pages/tag'
import { page as textarea } from '../pages/textarea'
import { page as ticker } from '../pages/ticker'
import { page as toast } from '../pages/toast'
import { page as tokens } from '../pages/tokens'
import { page as tooltip } from '../pages/tooltip'
import type { DocPage, DocSection } from './types'

// one component, one page. a page that documents two of them hides the second
// from the index and from search.
export const SECTIONS: readonly DocSection[] = [
  {
    title: 'Getting started',
    pages: [
      introduction,
      installation,
      tokens,
    ],
  },
  {
    title: 'Actions',
    pages: [
      action,
      link,
      menu,
      pagination,
      breadcrumb,
    ],
  },
  {
    title: 'Forms',
    pages: [
      input,
      textarea,
      select,
      nativeSelect,
      checkbox,
      radio,
      switchPage,
      slider,
    ],
  },
  {
    title: 'Feedback',
    pages: [
      alert,
      toast,
      dialog,
      tooltip,
      progress,
      spinner,
      skeleton,
      emptyState,
    ],
  },
  {
    title: 'Navigation',
    pages: [
      bar,
      sideNav,
      tabs,
      contents,
      accordion,
      commandPalette,
    ],
  },
  {
    title: 'Content',
    pages: [
      dataTable,
      table,
      facts,
      stat,
      status,
      tag,
      code,
      kbd,
      ticker,
      avatar,
    ],
  },
]

const BY_SLUG = new Map<string, DocPage>(
  SECTIONS.flatMap(section =>
    section.pages.map(page => [
      page.slug,
      page,
    ]),
  ),
)

export const ALL_PAGES: readonly DocPage[] = SECTIONS.flatMap(section => section.pages)

export function findPage(slug: string): DocPage | undefined {
  return BY_SLUG.get(slug)
}

export function neighbours(slug: string): {
  previous?: DocPage
  next?: DocPage
} {
  const at = ALL_PAGES.findIndex(page => page.slug === slug)
  if (at < 0) return {}
  // at() with a negative index wraps to the end of the list, which would make the
  // first page's "previous" the last one
  return {
    previous: at > 0 ? ALL_PAGES[at - 1] : undefined,
    next: at < ALL_PAGES.length - 1 ? ALL_PAGES[at + 1] : undefined,
  }
}
