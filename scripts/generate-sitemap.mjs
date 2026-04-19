#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from the live catalog + articles.
 *
 * Owned by the seo-specialist subagent.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *
 * Runs standalone (no Vite needed). Reads:
 *   - public/tss-catalog.json       (products)
 *   - src/data/categories.ts        (categories, parsed as text)
 *   - src/data/articles/*.ts        (articles — slug + date via regex)
 *
 * Ships to public/sitemap.xml. Commit the result.
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ORIGIN = 'https://trafficcontrolrental.com'

const STATIC_PATHS = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/browse', changefreq: 'daily', priority: '0.9' },
  { loc: '/assistant', changefreq: 'monthly', priority: '0.6' },
  { loc: '/planner', changefreq: 'monthly', priority: '0.6' },
  { loc: '/quote', changefreq: 'monthly', priority: '0.5' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
]

const today = new Date().toISOString().slice(0, 10)

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${ORIGIN}${loc}</loc>\n    <lastmod>${lastmod || today}</lastmod>\n    <changefreq>${changefreq || 'weekly'}</changefreq>\n    <priority>${priority || '0.7'}</priority>\n  </url>`
}

async function parseCategories() {
  const src = await readFile(join(ROOT, 'src/data/categories.ts'), 'utf8')
  const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
  return [...new Set(slugs)].map((slug) => ({
    loc: `/category/${slug}`,
    changefreq: 'weekly',
    priority: '0.8',
  }))
}

async function parseProducts() {
  try {
    const raw = await readFile(join(ROOT, 'public/tss-catalog.json'), 'utf8')
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data
      .map((p) => p.slug || p.id)
      .filter(Boolean)
      .map((slug) => ({
        loc: `/product/${slug}`,
        changefreq: 'weekly',
        priority: '0.7',
      }))
  } catch {
    return []
  }
}

async function parseArticles() {
  const dir = join(ROOT, 'src/data/articles')
  let files = []
  try {
    files = await readdir(dir)
  } catch {
    return []
  }
  const out = []
  for (const f of files) {
    if (!f.endsWith('.ts')) continue
    const src = await readFile(join(dir, f), 'utf8')
    const slug = src.match(/slug:\s*'([^']+)'/)?.[1]
    const date = src.match(/datePublished:\s*'([^']+)'/)?.[1]
    if (!slug) continue
    out.push({
      loc: `/blog/${slug}`,
      lastmod: date || today,
      changefreq: 'monthly',
      priority: '0.7',
    })
  }
  return out
}

const all = [
  ...STATIC_PATHS,
  ...(await parseCategories()),
  ...(await parseProducts()),
  ...(await parseArticles()),
]

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all.map(urlEntry).join('\n') +
  `\n</urlset>\n`

await writeFile(join(ROOT, 'public/sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml: ${all.length} URLs`)
