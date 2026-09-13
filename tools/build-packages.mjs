/**
 * Builds both packages with tsc and copies the token stylesheets next to the
 * emitted JavaScript, so a published package ships one directory.
 */
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const TSC = join('node_modules', '.bin', 'tsc')

function build(pkg) {
  const root = join('packages', pkg)
  rmSync(join(root, 'dist'), {
    recursive: true,
    force: true,
  })
  execFileSync(
    TSC,
    [
      '-p',
      join(root, 'tsconfig.build.json'),
    ],
    {
      stdio: 'inherit',
    },
  )
  return root
}

for (const pkg of [
  'tokens',
  'ui',
]) {
  const root = build(pkg)
  console.log(`built ${pkg}`)

  if (pkg === 'tokens') {
    // css needs no compiling, but it has to sit in the published directory
    const src = join(root, 'src')
    const dist = join(root, 'dist')
    mkdirSync(dist, {
      recursive: true,
    })
    for (const file of readdirSync(src).filter(f => f.endsWith('.css'))) {
      cpSync(join(src, file), join(dist, file))
    }
    console.log('  copied the stylesheets')
  }
}
