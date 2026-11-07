#!/usr/bin/env node
/**
 * Prerender every route to static HTML after `vite build`, so crawlers and AI
 * answer engines that do not run JavaScript get the full page: title, meta,
 * canonical, JSON-LD and body text. The browser app still boots and takes over.
 *
 * Writes dist/<route>/index.html for each route, dist/404.html, and dist/llms.txt.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_OUT = join(ROOT, 'node_modules/.prerender')
const ORIGIN = 'https://www.trafficcontrolsupply.com'

const HEAD_RE = /<!--head:start-->[\s\S]*?<!--head:end-->/
const APP_RE = /<!--app:start-->[\s\S]*?<!--app:end-->/

async function main() {
  await rm(SSR_OUT, { recursive: true, force: true })
  await build({
    root: ROOT,
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.tsx', outDir: SSR_OUT, emptyOutDir: true },
  })
  const { render, routes } = await import(pathToFileURL(join(SSR_OUT, 'entry-server.js')).href)

  const template = await readFile(join(DIST, 'index.html'), 'utf8')
  if (!HEAD_RE.test(template) || !APP_RE.test(template)) {
    throw new Error('index.html is missing the <!--head:start/end--> or <!--app:start/end--> markers')
  }

  const fill = (head, html) => template.replace(HEAD_RE, () => head).replace(APP_RE, () => html)
  const titleOf = (head) => head.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
  const pages = []

  for (const route of routes()) {
    const { html, head } = await render(route)
    if (!/<h1[\s>]/.test(html)) throw new Error(`Prerender: no <h1> on ${route}`)
    if (!head.includes('rel="canonical"')) throw new Error(`Prerender: no canonical on ${route}`)
    const file = route === '/' ? join(DIST, 'index.html') : join(DIST, route.slice(1), 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, fill(head, html))
    pages.push({ route, title: titleOf(head).replace(/&amp;/g, '&') })
  }

  const notFound = await render('/__not-found__')
  await writeFile(join(DIST, '404.html'), fill(notFound.head, notFound.html))

  await writeFile(join(DIST, 'llms.txt'), llmsTxt(pages))
  console.log(`Prerendered ${pages.length} routes + 404.html + llms.txt`)
}

/** https://llmstxt.org — a plain map of the site for AI answer engines. */
function llmsTxt(pages) {
  const section = (title, test) => {
    const items = pages.filter((p) => test(p.route))
    if (!items.length) return ''
    return `## ${title}\n\n${items.map((p) => `- [${p.title}](${ORIGIN}${p.route})`).join('\n')}\n`
  }
  return [
    '# Traffic Control Supply',
    '',
    '> New Jersey based wholesale and retail supplier of steel crowd control barricades, water-filled barriers, traffic cones, delineator posts, temporary fence panels and work zone equipment. Every order is quoted delivered to the job site anywhere in the US; prices are not published, request a quote. Contact: harold@trafficcontrolsupply.com',
    '',
    section('Product categories', (r) => !r.startsWith('/products/') && !r.startsWith('/blog') && !r.startsWith('/delivery/') && !r.startsWith('/compare/') && !r.startsWith('/tools/') && !['/', '/about', '/contact', '/shipping-and-delivery', '/wholesale'].includes(r)),
    section('Products', (r) => r.startsWith('/products/')),
    section('Buying guides and comparisons', (r) => r.startsWith('/compare/')),
    section('Calculators', (r) => r.startsWith('/tools/')),
    section('Delivery by state', (r) => r.startsWith('/delivery/')),
    section('Company', (r) => ['/', '/about', '/contact', '/shipping-and-delivery', '/wholesale'].includes(r)),
    section('Work zone guides', (r) => r.startsWith('/blog')),
  ]
    .filter(Boolean)
    .join('\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
