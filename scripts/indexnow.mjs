#!/usr/bin/env node
/**
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver…) which pages changed.
 * Runs from .github/workflows/indexnow.yml after each successful production deploy.
 *
 * Reads the live /indexnow-manifest.json (url → content hash, written by
 * scripts/prerender.mjs), diffs it against the manifest saved from the previous
 * run, and submits new or changed URLs. The first run (no previous manifest)
 * submits every URL.
 *
 * Usage: node scripts/indexnow.mjs [--previous path] [--save path] [--all] [--dry-run]
 *
 * The key is public by design: it must be served at /<key>.txt to prove ownership.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export const INDEXNOW_KEY = 'c9d0e819395e5b7eefc3c9c555049467'
const HOST = 'www.trafficcontrolsupply.com'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS = 10000

function arg(name) {
  const i = process.argv.indexOf(name)
  return i === -1 ? undefined : process.argv[i + 1]
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return null
  }
}

async function main() {
  const previousPath = arg('--previous')
  const savePath = arg('--save')
  const all = process.argv.includes('--all')
  const dryRun = process.argv.includes('--dry-run')

  const res = await fetch(`${ORIGIN}/indexnow-manifest.json`, { headers: { 'cache-control': 'no-cache' } })
  if (!res.ok) throw new Error(`Could not fetch live manifest: HTTP ${res.status}`)
  const current = await res.json()

  const previous = all || !previousPath ? null : await readJson(previousPath)
  const urls = Object.keys(current).filter((url) => !previous || previous[url] !== current[url])

  console.log(
    previous
      ? `${urls.length} of ${Object.keys(current).length} pages changed since the last submission`
      : `No previous manifest: submitting all ${urls.length} pages`,
  )

  if (urls.length && !dryRun) {
    for (let i = 0; i < urls.length; i += MAX_URLS) {
      const batch = urls.slice(i, i + MAX_URLS)
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      })
      // 200 = accepted, 202 = accepted pending key check. 403 = key not verified yet
      // (normal for a while after the first submission), 429 = rate limited: warn
      // and keep the old manifest so the next deploy retries these URLs.
      if (r.status === 403 || r.status === 429) {
        console.warn(`::warning::IndexNow returned HTTP ${r.status}; will retry on the next deploy. ${await r.text()}`)
        return
      }
      if (r.status !== 200 && r.status !== 202) {
        throw new Error(`IndexNow rejected the submission: HTTP ${r.status} ${await r.text()}`)
      }
      console.log(`Submitted ${batch.length} URLs (HTTP ${r.status})`)
    }
  } else if (dryRun) {
    console.log(urls.slice(0, 20).join('\n'))
  }

  if (savePath) {
    await mkdir(dirname(savePath), { recursive: true })
    await writeFile(savePath, JSON.stringify(current))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
