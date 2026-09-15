/**
 * Builds both packages with tsc and copies the token stylesheets next to the
 * emitted JavaScript, so a published package ships one directory.
 *
 * The readme and the licence are copied in too. npm publishes both from the
 * package root whatever `files` says, and without them the registry page for
 * each package is blank and the MIT the manifest claims ships with nothing
 * behind it.
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

  // npm reads these from the package root, and this is a workspace: they only
  // exist at the top of the repository. both are gitignored inside the packages
  // so the copies never become a second source to keep up to date.
  for (const file of [
    'README.md',
    'LICENSE',
  ]) {
    cpSync(file, join(root, file))
  }
  console.log('  copied the readme and the licence')

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
