import { page as action } from '../pages/action'
import { page as alert } from '../pages/alert'
import { page as bar } from '../pages/bar'
import { page as breadcrumb } from '../pages/breadcrumb'
import { page as checkbox } from '../pages/checkbox'
import { codePage, factsPage, panelPage, statPage, statusPage, tablePage } from '../pages/content'
import { page as dataTable } from '../pages/datatable'
import { page as dialog } from '../pages/dialog'
import { emptyStatePage, progressPage, skeletonPage, spinnerPage } from '../pages/feedback'
import { page as input } from '../pages/input'
import { page as installation } from '../pages/installation'
import { page as introduction } from '../pages/introduction'
import { page as link } from '../pages/link'
import { page as menu } from '../pages/menu'
import { accordionPage, contentsPage, tabsPage } from '../pages/navigation'
import { page as pagination } from '../pages/pagination'
import { page as radio } from '../pages/radio'
import { page as commandPalette } from '../pages/search'
import { page as select } from '../pages/select'
import { page as slider } from '../pages/slider'
import { page as switchPage } from '../pages/switch'
import { page as textarea } from '../pages/textarea'
import { page as toast } from '../pages/toast'
import { page as tokens } from '../pages/tokens'
import { page as tooltip } from '../pages/tooltip'
import type { DocPage, DocSection } from './types'

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
      progressPage,
      spinnerPage,
      skeletonPage,
      emptyStatePage,
    ],
  },
  {
    title: 'Navigation',
    pages: [
      bar,
      tabsPage,
      contentsPage,
      accordionPage,
      commandPalette,
    ],
  },
  {
    title: 'Content',
    pages: [
      dataTable,
      tablePage,
      factsPage,
      statPage,
      statusPage,
      codePage,
      panelPage,
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
  return {
    previous: at > 0 ? ALL_PAGES[at - 1] : undefined,
    next: at < ALL_PAGES.length - 1 ? ALL_PAGES[at + 1] : undefined,
  }
}
