#!/usr/bin/env node
/** Seed Supabase — reads product rows from JSON (generate via `npm run build` or edit manually). */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const raw = readFileSync(join(ROOT, 'supabase/catalog-seed.json'), 'utf8')
const products = JSON.parse(raw)

const sb = createClient(url, key)
const { error } = await sb.from('products').upsert(products, { onConflict: 'sku' })
if (error) {
  console.error(error)
  process.exit(1)
}
console.log(`Seeded ${products.length} products`)
