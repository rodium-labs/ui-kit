import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// published, the packages resolve to their build output, which is all the
// tarball carries. the playground reads the sources instead so an edit under
// packages/ lands without a rebuild. the subpath rule comes first: a bare string
// find also matches everything under it, and would rewrite the css imports
// against index.ts.
const source = (path: string) => fileURLToPath(new URL(`../../packages/${path}`, import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: /^@rodium-labs\/tokens\/(.+)$/,
        replacement: source('tokens/src/$1'),
      },
      {
        find: '@rodium-labs/tokens',
        replacement: source('tokens/src/index.ts'),
      },
      {
        find: '@rodium-labs/ui',
        replacement: source('ui/src/index.ts'),
      },
    ],
  },
  server: {
    port: 5180,
  },
})
