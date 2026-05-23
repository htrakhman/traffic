#!/usr/bin/env node
/** Apply supabase/migrations/001_dropship_schema.sql via direct Postgres connection. */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const password = process.argv[2] ?? process.env.SUPABASE_DB_PASSWORD
const ref = process.env.SUPABASE_PROJECT_REF ?? 'rrklsrgcaenyvmifjnog'

if (!password) {
  console.error('Usage: SUPABASE_DB_PASSWORD=xxx node scripts/apply-migration.mjs')
  console.error('   or: node scripts/apply-migration.mjs "your-database-password"')
  process.exit(1)
}

const databaseUrl =
  process.env.DATABASE_URL ??
  `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

const sql = readFileSync(join(ROOT, 'supabase/migrations/001_dropship_schema.sql'), 'utf8')

const { default: pg } = await import('pg')
const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('Connected. Applying migration...')
  await client.query(sql)
  console.log('Migration applied successfully.')
} catch (e) {
  if (e.message?.includes('already exists')) {
    console.log('Some objects already exist — migration may be partially applied. Check Supabase SQL editor.')
  }
  console.error(e.message)
  process.exit(1)
} finally {
  await client.end()
}
