/**
 * Anthropic-shaped JSON in/out for the existing browser client.
 * Calls Gemini REST; streams SSE compatible with aiClient.ts, with
 * generateContent fallback when streamGenerateContent is unavailable.
 */

const GEMINI_HOST = 'https://generativelanguage.googleapis.com/v1beta'

export const ALLOWED_CHAT_MODELS = new Set([
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview-05-20',
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-1.5-flash',
])

export function getGeminiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_AI_API_KEY?.trim()
}

type ChatMsg = { role: string; content: string }

function pickModel(incoming: Record<string, unknown>): string {
  const raw = typeof incoming.model === 'string' ? incoming.model.trim() : ''
  if (raw && ALLOWED_CHAT_MODELS.has(raw)) return raw
  return 'gemini-2.5-flash'
}

export function buildGeminiPayload(incoming: Record<string, unknown>): {
  model: string
  payload: Record<string, unknown>
  stream: boolean
} {
  const stream = incoming.stream === true
  const model = pickModel(incoming)
  const system = typeof incoming.system === 'string' ? incoming.system : ''
  const maxOut =
    typeof incoming.max_tokens === 'number' && Number.isFinite(incoming.max_tokens)
      ? incoming.max_tokens
      : stream
        ? 1024
        : 1500
  const messages = (Array.isArray(incoming.messages) ? incoming.messages : []) as ChatMsg[]

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content ?? '') }],
  }))

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      maxOutputTokens: maxOut,
    },
  }
  if (system.trim()) {
    payload.systemInstruction = { parts: [{ text: system }] }
  }
  return { model, payload, stream }
}

function gemUrl(model: string, stream: boolean): string {
  const method = stream ? 'streamGenerateContent' : 'generateContent'
  const q = stream ? '?alt=sse' : ''
  return `${GEMINI_HOST}/models/${encodeURIComponent(model)}:${method}${q}`
}

function extractCandidateText(json: unknown): string {
  const o = json as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    promptFeedback?: { blockReason?: string }
    error?: { message?: string; code?: number }
  }
  if (o.error?.message) return ''
  if (o.promptFeedback?.blockReason) return ''
  const parts = o.candidates?.[0]?.content?.parts
  if (!parts?.length) return ''
  return parts.map((p) => (typeof p.text === 'string' ? p.text : '')).join('')
}

function anthropicSseLine(text: string): string {
  return `data: ${JSON.stringify({ type: 'content_block_delta', delta: { text } })}\n\n`
}

/** Single-chunk SSE stream the client already understands. */
function sseFromFullText(full: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  const chunk = anthropicSseLine(full)
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(chunk))
      controller.close()
    },
  })
}

function geminiStreamToAnthropicSseStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder()
  let buf = ''
  let agg = ''

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader()
      const encoder = new TextEncoder()

      const emitLine = (line: string) => {
        const t = line.trim()
        if (!t.startsWith('data:')) return
        const raw = t.slice(5).trim()
        if (!raw || raw === '[DONE]') return
        let json: unknown
        try {
          json = JSON.parse(raw)
        } catch {
          return
        }
        const piece = extractCandidateText(json)
        if (!piece) return
        let delta: string
        if (piece.startsWith(agg)) {
          delta = piece.slice(agg.length)
          agg = piece
        } else {
          delta = piece
          agg += piece
        }
        if (delta) {
          controller.enqueue(encoder.encode(anthropicSseLine(delta)))
        }
      }

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() ?? ''
          for (const line of lines) emitLine(line)
        }
        if (buf.trim()) {
          for (const line of buf.split('\n')) emitLine(line)
        }
        controller.close()
      } catch (e) {
        controller.error(e)
      }
    },
  })
}

const MAX_BODY_BYTES = 64 * 1024

async function fetchGemini(
  model: string,
  payload: Record<string, unknown>,
  key: string,
  stream: boolean,
): Promise<Response> {
  return fetch(gemUrl(model, stream), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': key,
    },
    body: JSON.stringify(payload),
  })
}

export async function handleChatRequest(incoming: Record<string, unknown>): Promise<Response> {
  const key = getGeminiKey()
  if (!key) {
    return new Response(JSON.stringify({ error: 'Server misconfigured: GEMINI_API_KEY missing' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  const bodyJson = JSON.stringify(incoming)
  if (bodyJson.length > MAX_BODY_BYTES) {
    return new Response(JSON.stringify({ error: 'Payload too large' }), {
      status: 413,
      headers: { 'content-type': 'application/json' },
    })
  }

  const { model, payload, stream } = buildGeminiPayload(incoming)
  const contents = payload.contents
  if (!Array.isArray(contents) || contents.length === 0) {
    return new Response(JSON.stringify({ error: 'messages required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (stream) {
    const streamRes = await fetchGemini(model, payload, key, true)
    if (streamRes.ok && streamRes.body) {
      const outBody = geminiStreamToAnthropicSseStream(streamRes.body)
      return new Response(outBody, {
        status: 200,
        headers: {
          'content-type': 'text/event-stream',
          'cache-control': 'no-cache, no-transform',
        },
      })
    }

    let genRes = await fetchGemini(model, payload, key, false)
    if (!genRes.ok && model !== 'gemini-1.5-flash') {
      genRes = await fetchGemini('gemini-1.5-flash', payload, key, false)
    }
    if (genRes.ok) {
      const json = (await genRes.json()) as unknown
      const text = extractCandidateText(json)
      if (!text) {
        const raw = JSON.stringify(json)
        return new Response(JSON.stringify({ error: 'empty model response', detail: raw.slice(0, 2000) }), {
          status: 502,
          headers: { 'content-type': 'application/json' },
        })
      }
      return new Response(sseFromFullText(text), {
        status: 200,
        headers: {
          'content-type': 'text/event-stream',
          'cache-control': 'no-cache, no-transform',
        },
      })
    }

    const err = await genRes.text()
    const status = genRes.status >= 400 && genRes.status < 600 ? genRes.status : 502
    return new Response(err, { status: status === 404 ? 502 : status })
  }

  let genRes = await fetchGemini(model, payload, key, false)
  if (!genRes.ok && model !== 'gemini-1.5-flash') {
    genRes = await fetchGemini('gemini-1.5-flash', payload, key, false)
  }
  if (!genRes.ok) {
    const t = await genRes.text()
    const status = genRes.status >= 400 && genRes.status < 600 ? genRes.status : 502
    return new Response(t, { status: status === 404 ? 502 : status })
  }

  const json = (await genRes.json()) as unknown
  const text = extractCandidateText(json)
  const shaped = { content: [{ type: 'text' as const, text }] }
  return new Response(JSON.stringify(shaped), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
