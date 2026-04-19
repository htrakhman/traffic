// Vercel serverless — proxies chat to OpenAI / Gemini / Perplexity (see api/lib/chatProxyRouter.ts).
// Client still sends Anthropic-shaped JSON; backends normalize to the same SSE / JSON the UI parses.
//
// Env: OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), PERPLEXITY_API_KEY — server only, never VITE_*.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleChatRequest } from './lib/chatProxyRouter'

export const config = { runtime: 'nodejs' }

async function pipeWebStreamToNodeResponse(
  body: ReadableStream<Uint8Array>,
  res: VercelResponse,
): Promise<void> {
  const reader = body.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value?.byteLength) res.write(Buffer.from(value))
    }
  } finally {
    reader.releaseLock()
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const bodyObj =
      typeof req.body === 'string'
        ? (JSON.parse(req.body || '{}') as Record<string, unknown>)
        : ((req.body ?? {}) as Record<string, unknown>)

    const inner = await handleChatRequest(bodyObj)

    const ct = inner.headers.get('content-type') ?? ''

    if (ct.includes('application/json')) {
      const text = await inner.text()
      res.status(inner.status)
      res.setHeader('content-type', 'application/json')
      return res.send(text)
    }

    res.status(inner.status)
    inner.headers.forEach((v, k) => {
      if (k.toLowerCase() === 'transfer-encoding') return
      res.setHeader(k, v)
    })

    if (!inner.body) {
      return res.end()
    }

    await pipeWebStreamToNodeResponse(inner.body as ReadableStream<Uint8Array>, res)
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
