#!/usr/bin/env node
/**
 * Compare Traffic Safety Store sitemap /shop/ PDP count to public/tss-catalog.json length.
 * Exits 1 on mismatch. Use --print-new to list sitemap URLs missing from the JSON (by supplierUrl).
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITEMAP = 'https://www.trafficsafetystore.com/sitemap.xml'
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CATALOG = join(ROOT, 'public/tss-catalog.json')
const UA = 'TrafficControlRental-catalog-verify/1.0 (+https://trafficcontrolrental.com)'

const BAD_PATH_PREFIXES = ['/shop/#NAME?/']

function parseArgs(argv) {
  return { printNew: argv.includes('--print-new') }
}

async function fetchSitemapLocs() {
  const res = await fetch(SITEMAP, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`Sitemap HTTP ${res.status}`)
  const xml = await res.text()
  const locRe = /<loc>([^<]+)<\/loc>/g
  const locs = []
  let m
  while ((m = locRe.exec(xml))) {
    locs.push(m[1].trim())
  }
  return locs
}

function shopProductPaths(locs) {
  const seen = new Set()
  const paths = []
  for (const url of locs) {
    if (!url.includes('/shop/')) continue
    if (BAD_PATH_PREFIXES.some((pre) => url.includes(pre))) continue
    let pathname
    try {
      pathname = new URL(url).pathname.replace(/\/$/, '')
    } catch {
      continue
    }
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] !== 'shop' || parts.length < 3) continue
    if (seen.has(pathname)) continue
    seen.add(pathname)
    paths.push({ pathname, url })
  }
  return paths
}

async function main() {
  const { printNew } = parseArgs(process.argv.slice(2))

  if (!existsSync(CATALOG)) {
    console.error('Missing', CATALOG)
    process.exit(1)
  }

  const products = JSON.parse(readFileSync(CATALOG, 'utf8'))
  if (!Array.isArray(products)) throw new Error('tss-catalog.json must be an array')

  const jsonUrls = new Set(products.map((p) => p.supplierUrl).filter(Boolean))
  const locs = await fetchSitemapLocs()
  const shop = shopProductPaths(locs)

  console.log('Sitemap unique /shop/ PDP paths:', shop.length)
  console.log('public/tss-catalog.json products:', products.length)

  if (shop.length !== products.length) {
    console.error('Mismatch: counts differ.')
    process.exitCode = 1
  } else {
    console.log('Count check: OK')
  }

  if (printNew) {
    const missing = shop.filter(({ url }) => !jsonUrls.has(url))
    if (missing.length) {
      console.log('Sitemap URLs not in JSON (supplierUrl):', missing.length)
      for (const { url } of missing.slice(0, 50)) console.log(' ', url)
      if (missing.length > 50) console.log(' …', missing.length - 50, 'more')
      process.exitCode = 1
    } else {
      console.log('URL set check: every sitemap PDP URL appears in JSON.')
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
