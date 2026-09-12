import { useEffect, useState } from 'react'

const DEFAULT_SLUG = 'introduction'

function read(): string {
  const raw = window.location.hash.replace(/^#\/?/, '').trim()
  return raw === '' ? DEFAULT_SLUG : raw
}

// hash routing, because the docs build is a static folder: a path route would
// need the host to rewrite every unknown url back to index.html.
export function useRoute(): string {
  const [slug, setSlug] = useState(read)

  useEffect(() => {
    const onHash = () => setSlug(read())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return slug
}

export function href(slug: string): string {
  return `#/${slug}`
}
