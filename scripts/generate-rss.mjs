#!/usr/bin/env node
/**
 * Generate public/rss.xml from src/data/articles/*.ts.
 * Owned by the seo-specialist subagent.
 *
 * Usage: node scripts/generate-rss.mjs
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ORIGIN = 'https://trafficcontrolrental.com'

function escape(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function extractField(src, name) {
  const m =
    src.match(new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)) ||
    src.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`))
  return m ? m[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : ''
}

const dir = join(ROOT, 'src/data/articles')
let files = []
try {
  files = await readdir(dir)
} catch {
  files = []
}

const items = []
for (const f of files) {
  if (!f.endsWith('.ts')) continue
  const src = await readFile(join(dir, f), 'utf8')
  const slug = extractField(src, 'slug')
  const title = extractField(src, 'title')
  const excerpt = extractField(src, 'excerpt')
  const date = extractField(src, 'datePublished')
  if (!slug || !title) continue
  items.push({ slug, title, excerpt, date })
}

items.sort((a, b) => (a.date < b.date ? 1 : -1))

const now = new Date().toUTCString()
const rss =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>Traffic Control Rental — Work Zone Guides</title>\n` +
  `    <link>${ORIGIN}/blog</link>\n` +
  `    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />\n` +
  `    <description>Practical, contractor-voiced guides on traffic control rental, MUTCD work zone setup, and job-site safety.</description>\n` +
  `    <language>en-us</language>\n` +
  `    <lastBuildDate>${now}</lastBuildDate>\n` +
  items
    .map(
      (it) =>
        `    <item>\n` +
        `      <title>${escape(it.title)}</title>\n` +
        `      <link>${ORIGIN}/blog/${it.slug}</link>\n` +
        `      <guid>${ORIGIN}/blog/${it.slug}</guid>\n` +
        `      <pubDate>${new Date(it.date).toUTCString()}</pubDate>\n` +
        `      <description>${escape(it.excerpt)}</description>\n` +
        `    </item>`,
    )
    .join('\n') +
  `\n  </channel>\n</rss>\n`

await writeFile(join(ROOT, 'public/rss.xml'), rss, 'utf8')
console.log(`rss.xml: ${items.length} items`)
