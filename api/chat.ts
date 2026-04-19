// Vercel serverless — proxies chat + job JSON to Google Gemini (AI Studio key).
// Client still sends Anthropic-shaped JSON; we translate and stream SSE the UI already parses.
//
// Env: GEMINI_API_KEY (or GOOGLE_AI_API_KEY) in Vercel → Settings → Environment Variables.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { handleChatRequest } from '../server/geminiChatProxy'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const web = inner.body as import('stream/web').ReadableStream<Uint8Array>
  await pipeline(Readable.fromWeb(web), res)
}
