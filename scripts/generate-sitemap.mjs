#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from the 10-product catalog + articles.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ORIGIN = 'https://trafficcontrolsupply.com'

const STATIC_PATHS = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/browse', changefreq: 'daily', priority: '0.9' },
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
  return [...new Set(slugs)]
    .filter((s) => !s.includes('-legacy'))
    .map((slug) => ({
      loc: `/category/${slug}`,
      changefreq: 'weekly',
      priority: '0.8',
    }))
}

async function parseProducts() {
  try {
    const raw = await readFile(join(ROOT, 'supabase/catalog-seed.json'), 'utf8')
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data
      .map((p) => p.slug)
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
    const slugM = src.match(/slug:\s*'([^']+)'/)
    const dateM = src.match(/date:\s*'([^']+)'/)
    if (!slugM) continue
    out.push({
      loc: `/blog/${slugM[1]}`,
      lastmod: dateM?.[1]?.slice(0, 10) || today,
      changefreq: 'monthly',
      priority: '0.6',
    })
  }
  return out
}

async function main() {
  const categories = await parseCategories()
  const products = await parseProducts()
  const articles = await parseArticles()
  const all = [...STATIC_PATHS, ...categories, ...products, ...articles]
  const body = all.map(urlEntry).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  await writeFile(join(ROOT, 'public/sitemap.xml'), xml)
  console.log(`Wrote sitemap.xml with ${all.length} URLs (${products.length} products)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
