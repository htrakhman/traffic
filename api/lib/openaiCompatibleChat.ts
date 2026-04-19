/**
 * OpenAI Chat Completions API (streaming + JSON), normalized to the same
 * Anthropic-shaped SSE / JSON responses the browser client expects.
 * Works for api.openai.com and OpenAI-compatible hosts (e.g. Perplexity).
 */

import { anthropicSseLine, sseFromFullText } from './chatSse.js'

const MAX_BODY_BYTES = 64 * 1024

type ChatMsg = { role: string; content: string }

function buildOpenAiMessages(incoming: Record<string, unknown>): { role: string; content: string }[] {
  const system = typeof incoming.system === 'string' ? incoming.system : ''
  const messages = (Array.isArray(incoming.messages) ? incoming.messages : []) as ChatMsg[]
  const out: { role: string; content: string }[] = []
  if (system.trim()) {
    out.push({ role: 'system', content: system })
  }
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'assistant' : 'user'
    out.push({ role, content: String(m.content ?? '') })
  }
  return out
}

function openAiStreamToAnthropicSseStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder()
  let buf = ''

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader()
      const encoder = new TextEncoder()

      const flushBlock = (block: string) => {
        for (const line of block.split('\n')) {
          const t = line.trim()
          if (!t.startsWith('data:')) continue
          const raw = t.slice(5).trim()
          if (!raw || raw === '[DONE]') continue
          let j: unknown
          try {
            j = JSON.parse(raw)
          } catch {
            continue
          }
          const o = j as { choices?: Array<{ delta?: { content?: string | null } }> }
          const piece = o.choices?.[0]?.delta?.content
          if (typeof piece === 'string' && piece.length > 0) {
            controller.enqueue(encoder.encode(anthropicSseLine(piece)))
          }
        }
      }

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const segments = buf.split('\n\n')
          buf = segments.pop() ?? ''
          for (const seg of segments) flushBlock(seg)
        }
        if (buf.trim()) flushBlock(buf)
        controller.close()
      } catch (e) {
        controller.error(e)
      }
    },
  })
}

export async function handleOpenAICompatibleRequest(
  incoming: Record<string, unknown>,
  opts: {
    apiKey: string
    baseUrl: string
    defaultModel: string
    /** OpenAI API rejects max_tokens for many current models — use max_completion_tokens. */
    outputTokenLimit?: 'completion' | 'max_tokens'
  },
): Promise<Response> {
  const bodyJson = JSON.stringify(incoming)
  if (bodyJson.length > MAX_BODY_BYTES) {
    return new Response(JSON.stringify({ error: 'Payload too large' }), {
      status: 413,
      headers: { 'content-type': 'application/json' },
    })
  }

  const openAiMessages = buildOpenAiMessages(incoming)
  if (openAiMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const stream = incoming.stream === true
  const maxOut =
    typeof incoming.max_tokens === 'number' && Number.isFinite(incoming.max_tokens)
      ? incoming.max_tokens
      : stream
        ? 1024
        : 1500

  const base = opts.baseUrl.replace(/\/$/, '')
  const url = `${base}/chat/completions`
  const payload: Record<string, unknown> = {
    model: opts.defaultModel,
    messages: openAiMessages,
    stream,
  }
  const limitStyle = opts.outputTokenLimit ?? 'max_tokens'
  if (limitStyle === 'completion') {
    payload.max_completion_tokens = maxOut
  } else {
    payload.max_tokens = maxOut
  }

  const upstream = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!upstream.ok) {
    const t = await upstream.text()
    const status = upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502
    return new Response(t, { status: status === 404 ? 502 : status })
  }

  if (stream && upstream.body) {
    const outBody = openAiStreamToAnthropicSseStream(upstream.body)
    return new Response(outBody, {
      status: 200,
      headers: {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache, no-transform',
      },
    })
  }

  const json = (await upstream.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>
  }
  const text = json.choices?.[0]?.message?.content ?? ''
  if (!text) {
    return new Response(JSON.stringify({ error: 'empty model response' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (stream) {
    return new Response(sseFromFullText(text), {
      status: 200,
      headers: {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache, no-transform',
      },
    })
  }

  const shaped = { content: [{ type: 'text' as const, text }] }
  return new Response(JSON.stringify(shaped), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
