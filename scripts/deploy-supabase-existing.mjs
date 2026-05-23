#!/usr/bin/env node
/**
 * Deploy schema + seed to an existing Supabase project.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function loadEnvFile() {
  const path = join(ROOT, '.env')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 0) continue
    const k = t.slice(0, i).trim()
    const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[k]) process.env[k] = v
  }
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url') out.url = args[++i]
    else if (args[i] === '--key') out.key = args[++i]
    else if (args[i] === '--admin-email') out.adminEmail = args[++i]
    else if (args[i] === '--db-password') out.dbPassword = args[++i]
  }
  return out
}

function projectRefFromUrl(url) {
  const m = url.match(/https:\/\/([^.]+)\.supabase\.co/)
  return m?.[1] ?? null
}

async function restFetch(url, key, path, options = {}) {
  const res = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { res, body }
}

async function tableExists(url, key) {
  const { res, body } = await restFetch(url, key, '/rest/v1/products?select=id&limit=1')
  if (res.ok) return true
  const msg = typeof body === 'object' && body?.message ? body.message : ''
  return !msg.includes('Could not find the table')
}

async function upsertProducts(url, key, seed) {
  const { res, body } = await restFetch(url, key, '/rest/v1/products?on_conflict=sku', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(seed),
  })
  if (!res.ok) {
    throw new Error(typeof body === 'object' ? body.message ?? JSON.stringify(body) : String(body))
  }
}

async function upsertAdmin(url, key, email) {
  const { res, body } = await restFetch(url, key, '/rest/v1/admin_users?on_conflict=email', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ email: email.toLowerCase() }),
  })
  if (!res.ok && !String(body?.message ?? '').includes('does not exist')) {
    console.warn('admin_users:', body?.message ?? body)
  }
}

async function main() {
  loadEnvFile()
  const args = parseArgs()
  const url = (args.url ?? process.env.SUPABASE_URL)?.trim()
  const key = (args.key ?? process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim()
  const dbPassword = (args.dbPassword ?? process.env.SUPABASE_DB_PASSWORD)?.trim()
  const adminEmail = (args.adminEmail ?? process.env.ADMIN_EMAIL_ALLOWLIST)?.split(',')[0]?.trim()

  if (!url || !key) {
    console.error('Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
    process.exit(1)
  }

  const ref = projectRefFromUrl(url)
  console.log('Project:', ref ?? url)

  const seed = JSON.parse(readFileSync(join(ROOT, 'supabase/catalog-seed.json'), 'utf8'))

  if (!(await tableExists(url, key))) {
    if (dbPassword) {
      console.log('Applying migration via Postgres...')
      const r = spawnSync('node', [join(ROOT, 'scripts/apply-migration.mjs'), dbPassword], {
        cwd: ROOT,
        stdio: 'inherit',
        env: { ...process.env, SUPABASE_PROJECT_REF: ref ?? '' },
      })
      if (r.status !== 0) process.exit(r.status ?? 1)
    } else {
      console.error('\nproducts table not found. Provide --db-password (Database password from Supabase Settings → Database)')
      console.error('Or run supabase/migrations/001_dropship_schema.sql in the SQL Editor, then re-run this script.\n')
      process.exit(1)
    }
  } else {
    console.log('Schema OK (products table exists).')
  }

  console.log('Seeding', seed.length, 'products...')
  await upsertProducts(url, key, seed)
  console.log('Products seeded.')

  if (adminEmail) {
    await upsertAdmin(url, key, adminEmail)
    console.log('Admin allowlist:', adminEmail)
  }

  const envPath = join(ROOT, '.env')
  const lines = {
    SUPABASE_URL: url,
    SUPABASE_SERVICE_ROLE_KEY: key,
    ...(adminEmail ? { ADMIN_EMAIL_ALLOWLIST: adminEmail } : {}),
  }
  let existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : ''
  for (const [k, v] of Object.entries(lines)) {
    const line = `${k}=${v}`
    if (existing.includes(`${k}=`)) {
      existing = existing.replace(new RegExp(`^${k}=.*$`, 'm'), line)
    } else {
      existing += (existing && !existing.endsWith('\n') ? '\n' : '') + line + '\n'
    }
  }
  writeFileSync(envPath, existing)
  console.log('\nWrote', envPath)
  console.log('Add the same vars to Vercel → Environment Variables, then redeploy.')
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
