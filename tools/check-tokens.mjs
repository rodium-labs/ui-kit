/**
 * A colour class Tailwind cannot resolve is emitted as nothing at all: no
 * warning, no rule, just a component that quietly loses its background. This
 * walks every colour utility in the source and fails on any whose token is not
 * declared in the theme.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const THEME = 'packages/tokens/src/theme.css'
const ROOTS = [
  'packages/ui/src',
  'apps/playground/src',
]
const PREFIXES = [
  'bg',
  'text',
  'border',
  'outline',
  'decoration',
  'fill',
  'stroke',
  'ring',
  'shadow',
  'accent',
  'caret',
  'divide',
]
/** font sizes live in the same text-* namespace */
const TYPE_SCALE = new Set([
  'display',
  'display-sm',
  'title',
  'title-sm',
  'lede',
  'body',
])

const defined = new Set(
  [
    ...readFileSync(THEME, 'utf8').matchAll(/--color-([a-z0-9-]+):/g),
  ].map(m => m[1]),
)

function walk(dir) {
  return readdirSync(dir).flatMap(entry => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.tsx?$/.test(path)
      ? [
          path,
        ]
      : []
  })
}

const pattern = new RegExp(
  `(?<![\\w-])(${PREFIXES.join('|')})-((?:night|ink|brand|accent|danger|paper|rule)[a-z0-9-]*)`,
  'g',
)

const dead = []
for (const file of ROOTS.flatMap(walk)) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(pattern)) {
    const [, util, raw] = match
    const token = raw.split('/')[0]
    if (defined.has(token)) continue
    if (util === 'text' && TYPE_SCALE.has(token)) continue
    dead.push(`${file}  ${util}-${token}`)
  }
}

if (dead.length > 0) {
  console.error(`${dead.length} colour class(es) reference a token the theme does not declare:\n`)
  for (const line of [
    ...new Set(dead),
  ])
    console.error(`  ${line}`)
  console.error(`\nDeclare it in ${THEME}, or use a token that exists.`)
  process.exit(1)
}

console.log(`${defined.size} colour tokens declared, every usage resolves.`)
