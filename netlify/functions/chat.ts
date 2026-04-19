/**
 * Netlify Functions entry for POST /api/chat (see netlify.toml redirect).
 * Buffers the transformed SSE so classic Lambda-style responses work everywhere.
 */
import { handleChatRequest } from '../../api/lib/geminiChatProxy'

type NetlifyEvent = { httpMethod?: string; body?: string | null }

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method not allowed' }
  }

  let incoming: Record<string, unknown>
  try {
    incoming = JSON.parse(event.body || '{}') as Record<string, unknown>
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const inner = await handleChatRequest(incoming)
  const body = await inner.text()
  const headers: Record<string, string> = {}
  inner.headers.forEach((v, k) => {
    headers[k] = v
  })

  return {
    statusCode: inner.status,
    headers,
    body,
  }
}
