/**
 * Build-time prerender entry (see scripts/prerender.mjs). Renders one route to
 * HTML and returns the <head> tags its SEO/JsonLd components registered.
 */
import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from './App'
import { serializeHead, ssrHead } from './components/seo/ssrHead'
import { PRODUCTS, CATEGORIES } from './data/catalog'
import { STATES } from './data/locations'
import { COMPARISONS } from './data/comparisons'
import { articles } from './data/articles'

export const STATIC_ROUTES = [
  '/',
  '/traffic-safety-supplies',
  '/traffic-control-equipment',
  '/traffic-safety-equipment',
  '/barricades',
  '/arrow-boards',
  '/channelizing-drums',
  '/work-zone-signs',
  '/tools/barricade-calculator',
  '/tools/cone-taper-calculator',
  '/about',
  '/contact',
  '/shipping-and-delivery',
  '/wholesale',
  '/blog',
]

export function routes(): string[] {
  const all = [
    ...STATIC_ROUTES,
    ...CATEGORIES.map((c) => c.path),
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
    ...STATES.map((s) => `/delivery/${s.slug}`),
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ]
  return [...new Set(all)]
}

export function render(url: string): Promise<{ html: string; head: string }> {
  const head = { tags: new Map<string, string>(), jsonLd: new Set<string>() }
  ssrHead.active = head
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new PassThrough()
    sink.on('data', (chunk) => (html += chunk))
    sink.on('end', () => {
      ssrHead.active = null
      resolve({ html, head: serializeHead(head) })
    })
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
