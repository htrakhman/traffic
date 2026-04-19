# Patch: Move Anthropic API calls to a Vercel serverless function

**Priority:** P0 / security. Without this, the Anthropic key is exposed in
the browser bundle, and any visitor can extract it and rack up charges
on your account.

**Effort:** 1–2 hours.

## Why

`src/utils/aiClient.ts` currently reads `VITE_ANTHROPIC_API_KEY` from
`import.meta.env` and sends it as `x-api-key` directly from the browser.
Vite `VITE_*` vars are public — they get inlined into the bundle at
build time. There is no Anthropic-side protection (no referrer
restrictions, no CORS-based safety).

## Change

1. **Add a serverless function** at `/api/chat.ts` that holds the key
   server-side.
2. **Remove the key from the browser.** Replace direct Anthropic calls
   in `aiClient.ts` with fetches to `/api/chat`.
3. **Change env var** in Vercel: delete `VITE_ANTHROPIC_API_KEY`, add
   `ANTHROPIC_API_KEY` (no `VITE_` prefix — server-only).

## Files to add

### `/api/chat.ts`

```ts
// Vercel Node serverless function. Receives the same payload the
// browser used to send to Anthropic directly, forwards server-side
// with the secret key.
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'Server misconfigured: no ANTHROPIC_API_KEY' })
  }

  // Optional rate limit gate — add real logic later (per IP, per session)
  // if (await isRateLimited(req)) return res.status(429).json({ error: 'rate limit' })

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify(req.body),
    })
    // Stream if possible; for non-streaming, pass through JSON
    const isStream = (req.body as any)?.stream === true
    if (isStream && upstream.body) {
      res.setHeader('content-type', 'text/event-stream')
      res.setHeader('cache-control', 'no-cache')
      res.setHeader('connection', 'keep-alive')
      const reader = upstream.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(decoder.decode(value))
      }
      res.end()
      return
    }
    const json = await upstream.json()
    return res.status(upstream.status).json(json)
  } catch (err: any) {
    return res.status(502).json({ error: 'Upstream error', detail: String(err?.message ?? err) })
  }
}
```

Install dep: `npm i -D @vercel/node`

### Edits to `src/utils/aiClient.ts`

Replace both `fetch('https://api.anthropic.com/v1/messages', ...)` calls
with `fetch('/api/chat', ...)` using the same body, and delete the
`'x-api-key'`, `'anthropic-version'`, and `'anthropic-dangerous-direct-browser-access'`
headers (the server adds them).

Delete line 6:

```ts
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
```

Replace the `if (!API_KEY)` guards with a simpler "AI is offline" fallback,
since the browser no longer needs a key.

### Edits to `src/vite-env.d.ts`

Remove the line `readonly VITE_ANTHROPIC_API_KEY?: string`.

### Edits to `.env.example`

Change:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```
to:
```
# Server-only (Vercel env): do NOT prefix with VITE_
ANTHROPIC_API_KEY=sk-ant-...
```

## Vercel env var changes (after shipping the patch)

1. Delete: `VITE_ANTHROPIC_API_KEY`
2. Add: `ANTHROPIC_API_KEY` — value is the Anthropic key — **NOT** `VITE_`-prefixed — scope to Production + Preview + Development

## Verification checklist

- [ ] Open a Preview deployment and search the JS bundle for `sk-ant-` — should return nothing
- [ ] Test /assistant chat works
- [ ] Test /planner recommendation works
- [ ] Open DevTools → Network → confirm requests go to `/api/chat` not `api.anthropic.com`
- [ ] Cap the Anthropic key at a sane monthly spend (Console → Workspace → Spend limits)
