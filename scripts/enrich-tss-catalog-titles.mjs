#!/usr/bin/env node
/**
 * Enrich public/tss-catalog.json: set each product `name` from Traffic Safety Store PDP HTML
 * (og:title → JSON-LD Product.name → <title>, with site suffix stripped). Disk cache: .cache/tss-pdp/
 *
 * Usage: node scripts/enrich-tss-catalog-titles.mjs [--force] [--concurrency=10] [--limit=N]
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CATALOG = join(ROOT, 'public/tss-catalog.json')
const CACHE_DIR = join(ROOT, '.cache/tss-pdp')

const UA = 'TrafficControlRental-catalog-title-enrich/1.0 (+https://trafficcontrolsupply.com)'

function parseArgs(argv) {
  let force = false
  let concurrency = 10
  let limit = Infinity
  for (const a of argv) {
    if (a === '--force') force = true
    else if (a.startsWith('--concurrency=')) concurrency = Math.max(1, parseInt(a.split('=')[1], 10) || 10)
    else if (a.startsWith('--limit=')) limit = Math.max(1, parseInt(a.split('=')[1], 10) || 1)
  }
  return { force, concurrency, limit }
}

function cachePath(url) {
  const h = createHash('sha256').update(url).digest('hex').slice(0, 24)
  return join(CACHE_DIR, `${h}.html`)
}

function stripSiteSuffix(s) {
  if (!s) return s
  return s
    .replace(/\s*\|\s*Traffic Safety Store\s*$/i, '')
    .replace(/\s*-\s*Traffic Safety Store\s*$/i, '')
    .replace(/\s*\|\s*TSS\s*$/i, '')
    .trim()
}

function walkLdJsonForProductName(node) {
  if (!node) return null
  if (Array.isArray(node)) {
    for (const x of node) {
      const n = walkLdJsonForProductName(x)
      if (n) return n
    }
    return null
  }
  if (typeof node !== 'object') return null

  const rawType = node['@type']
  const types = Array.isArray(rawType) ? rawType : rawType != null ? [rawType] : []
  const isProduct = types.some((t) => String(t).toLowerCase() === 'product')
  if (isProduct && typeof node.name === 'string' && node.name.trim()) {
    return node.name.trim()
  }

  if (node['@graph']) {
    const n = walkLdJsonForProductName(node['@graph'])
    if (n) return n
  }

  for (const k of Object.keys(node)) {
    if (k === '@context' || k === '@type') continue
    const v = node[k]
    if (v && typeof v === 'object') {
      const n = walkLdJsonForProductName(v)
      if (n) return n
    }
  }
  return null
}

function extractTitle(html) {
  const root = parse(html, { lowerCaseTagName: true })

  const og = root.querySelector('meta[property="og:title"]')
  const ogContent = og?.getAttribute('content')?.trim()
  if (ogContent) return stripSiteSuffix(ogContent)

  const scripts = root.querySelectorAll('script[type="application/ld+json"]')
  for (const sc of scripts) {
    const raw = sc.textContent?.trim()
    if (!raw) continue
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      continue
    }
    const found = walkLdJsonForProductName(data)
    if (found) return stripSiteSuffix(found)
  }

  const t = root.querySelector('title')
  const tt = t?.textContent?.trim()
  if (tt) return stripSiteSuffix(tt)

  return null
}

async function fetchHtml(url, force) {
  const cp = cachePath(url)
  if (!force && existsSync(cp)) {
    return readFileSync(cp, 'utf8')
  }
  let lastErr
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
        redirect: 'follow',
      })
      if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1)))
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const html = await res.text()
      mkdirSync(dirname(cp), { recursive: true })
      writeFileSync(cp, html, 'utf8')
      return html
    } catch (e) {
      lastErr = e
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }
  throw lastErr ?? new Error('fetch failed')
}

async function mapPool(items, concurrency, fn) {
  let next = 0
  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = next++
      if (i >= items.length) break
      await fn(items[i], i)
    }
  })
  await Promise.all(workers)
}

async function main() {
  const { force, concurrency, limit } = parseArgs(process.argv.slice(2))
  mkdirSync(CACHE_DIR, { recursive: true })

  const raw = readFileSync(CATALOG, 'utf8')
  const products = JSON.parse(raw)
  if (!Array.isArray(products)) throw new Error('tss-catalog.json must be a JSON array')

  const slice = products.slice(0, limit)
  let updated = 0
  let failed = 0
  const errors = []

  let done = 0
  const total = slice.length

  await mapPool(slice, concurrency, async (p) => {
    const url = p.supplierUrl
    if (!url || typeof url !== 'string') {
      done++
      return
    }
    try {
      const html = await fetchHtml(url, force)
      const title = extractTitle(html)
      if (title && title !== p.name) {
        p.name = title
        updated++
      }
    } catch (e) {
      failed++
      if (errors.length < 25) errors.push(`${url}: ${e?.message || e}`)
    }
    done++
    if (done % 200 === 0 || done === total) {
      console.log(`Progress ${done}/${total} (titles updated: ${updated}, failed: ${failed})`)
    }
  })

  const out = JSON.stringify(products)
  JSON.parse(out)
  writeFileSync(CATALOG, out, 'utf8')
  console.log('Wrote', CATALOG)
  console.log('Titles changed:', updated, 'Fetch failures:', failed)
  if (errors.length) {
    console.log('Sample errors:')
    for (const line of errors) console.log(' ', line)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
