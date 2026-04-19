// Vercel serverless — proxies chat to OpenAI / Gemini / Perplexity (see api/lib/chatProxyRouter.ts).
// Client still sends Anthropic-shaped JSON; backends normalize to the same SSE / JSON the UI parses.
//
// Env: OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), PERPLEXITY_API_KEY — server only, never VITE_*.
//
// Important: do not pipe Web ReadableStream chunks directly to VercelResponse — it often yields
// FUNCTION_INVOCATION_FAILED. Buffer the upstream body first, then send once.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleChatRequest } from './lib/chatProxyRouter'

export const config = { runtime: 'nodejs' }

function parseJsonBody(req: VercelRequest): Record<string, unknown> {
  const b = req.body as unknown
  if (b == null) return {}
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString('utf8') || '{}') as Record<string, unknown>
    } catch {
      return {}
    }
  }
  if (typeof b === 'string') {
    try {
      return JSON.parse(b || '{}') as Record<string, unknown>
    } catch {
      return {}
    }
  }
  if (typeof b === 'object') {
    return b as Record<string, unknown>
  }
  return {}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const bodyObj = parseJsonBody(req)

    let inner: Response
    try {
      inner = await handleChatRequest(bodyObj)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('[api/chat] handleChatRequest', msg)
      return res.status(500).json({ error: 'chat proxy failed', detail: msg })
    }

    const ct = inner.headers.get('content-type') ?? ''

    if (ct.includes('application/json')) {
      const text = await inner.text()
      res.status(inner.status)
      res.setHeader('content-type', 'application/json')
      return res.send(text)
    }

    // Buffer SSE / text bodies entirely before touching Node response (Vercel stability).
    let bodyBuf = Buffer.alloc(0)
    if (inner.body) {
      try {
        bodyBuf = Buffer.from(await inner.arrayBuffer())
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[api/chat] buffer upstream body', msg)
        return res.status(502).json({
          error: 'chat upstream stream failed',
          detail: msg,
        })
      }
    }

    res.status(inner.status)
    for (const [k, v] of inner.headers.entries()) {
      const lk = k.toLowerCase()
      if (lk === 'transfer-encoding' || lk === 'content-length') continue
      res.setHeader(k, v)
    }
    if (bodyBuf.byteLength) {
      res.end(bodyBuf)
    } else {
      res.end()
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[api/chat]', msg)
    if (!res.headersSent) {
      return res.status(500).json({ error: 'chat proxy failed', detail: msg })
    }
    try {
      res.end()
    } catch {
      /* ignore */
    }
  }
}
