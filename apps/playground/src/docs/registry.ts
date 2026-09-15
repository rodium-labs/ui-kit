import { page as accordion } from '../pages/accordion'
import { page as action } from '../pages/action'
import { page as alert } from '../pages/alert'
import { page as areaChart } from '../pages/area-chart'
import { page as aspectRatio } from '../pages/aspect-ratio'
import { page as avatar } from '../pages/avatar'
import { page as banner } from '../pages/banner'
import { page as bar } from '../pages/bar'
import { page as barChart } from '../pages/bar-chart'
import { page as barList } from '../pages/bar-list'
import { page as breadcrumb } from '../pages/breadcrumb'
import { page as card } from '../pages/card'
import { page as carousel } from '../pages/carousel'
import { page as checkbox } from '../pages/checkbox'
import { page as code } from '../pages/code'
import { page as confirm } from '../pages/confirm'
import { page as contents } from '../pages/contents'
import { page as dataTable } from '../pages/datatable'
import { page as dialog } from '../pages/dialog'
import { page as divergingBar } from '../pages/diverging-bar'
import { page as dumbbell } from '../pages/dumbbell'
import { page as emptyState } from '../pages/empty-state'
import { page as facts } from '../pages/facts'
import { page as heatmap } from '../pages/heatmap'
import { page as input } from '../pages/input'
import { page as installation } from '../pages/installation'
import { page as introduction } from '../pages/introduction'
import { page as kbd } from '../pages/kbd'
import { page as lineChart } from '../pages/line-chart'
import { page as link } from '../pages/link'
import { page as menu } from '../pages/menu'
import { page as meter } from '../pages/meter'
import { page as nativeSelect } from '../pages/native-select'
import { page as otpInput } from '../pages/otp-input'
import { page as pagination } from '../pages/pagination'
import { page as popover } from '../pages/popover'
import { page as progress } from '../pages/progress'
import { page as radio } from '../pages/radio'
import { page as scatterChart } from '../pages/scatter-chart'
import { page as commandPalette } from '../pages/search'
import { page as select } from '../pages/select'
import { page as sheet } from '../pages/sheet'
import { page as sideNav } from '../pages/sidenav'
import { page as skeleton } from '../pages/skeleton'
import { page as slider } from '../pages/slider'
import { page as sparkline } from '../pages/sparkline'
import { page as spinner } from '../pages/spinner'
import { page as stackedBar } from '../pages/stacked-bar'
import { page as stat } from '../pages/stat'
import { page as status } from '../pages/status'
import { page as steps } from '../pages/steps'
import { page as switchPage } from '../pages/switch'
import { page as table } from '../pages/table'
import { page as tabs } from '../pages/tabs'
import { page as tag } from '../pages/tag'
import { page as textarea } from '../pages/textarea'
import { page as ticker } from '../pages/ticker'
import { page as timeline } from '../pages/timeline'
import { page as toast } from '../pages/toast'
import { page as toggle } from '../pages/toggle'
import { page as toggleGroup } from '../pages/toggle-group'
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
      toggle,
      toggleGroup,
      otpInput,
    ],
  },
  {
    title: 'Feedback',
    pages: [
      alert,
      banner,
      toast,
      dialog,
      sheet,
      confirm,
      popover,
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
      steps,
    ],
  },
  {
    title: 'Content',
    pages: [
      card,
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
      timeline,
      carousel,
      aspectRatio,
    ],
  },
  {
    title: 'Charts',
    pages: [
      sparkline,
      lineChart,
      areaChart,
      barChart,
      barList,
      stackedBar,
      divergingBar,
      dumbbell,
      heatmap,
      scatterChart,
      meter,
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
