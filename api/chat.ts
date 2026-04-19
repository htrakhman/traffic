// Vercel serverless — proxies chat to OpenAI / Gemini / Perplexity (see api/lib/chatProxyRouter.ts).
// Client still sends Anthropic-shaped JSON; backends normalize to the same SSE / JSON the UI parses.
//
// Env: OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), PERPLEXITY_API_KEY — server only, never VITE_*.

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

/** Pipe WHATWG stream to Node response (Buffer.from view must use byteOffset/byteLength). */
async function pipeWebStreamToNodeResponse(
  body: ReadableStream<Uint8Array>,
  res: VercelResponse,
): Promise<void> {
  const reader = body.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value !== undefined && value.byteLength > 0) {
        res.write(Buffer.from(value.buffer, value.byteOffset, value.byteLength))
      }
    }
  } finally {
    try {
      reader.releaseLock()
    } catch {
      /* ignore */
    }
  }
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

    res.status(inner.status)
    for (const [k, v] of inner.headers.entries()) {
      const lk = k.toLowerCase()
      if (lk === 'transfer-encoding' || lk === 'content-length') continue
      res.setHeader(k, v)
    }

    if (inner.body) {
      await pipeWebStreamToNodeResponse(inner.body as ReadableStream<Uint8Array>, res)
    }
    return res.end()
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
