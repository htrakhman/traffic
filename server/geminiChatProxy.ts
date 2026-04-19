/**
 * Shared server logic: Anthropic-shaped JSON in/out so the Vite client stays unchanged.
 * Streams Gemini SSE and re-emits chunks the client already parses (content_block_delta.delta.text).
 */

const GEMINI_HOST = 'https://generativelanguage.googleapis.com/v1beta'

export const ALLOWED_CHAT_MODELS = new Set([
  'gemini-2.0-flash',
  'gemini-2.5-flash-preview-05-20',
  'gemini-1.5-flash',
])

export function getGeminiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_AI_API_KEY?.trim()
}

type ChatMsg = { role: string; content: string }

function pickModel(incoming: Record<string, unknown>): string {
  const raw = typeof incoming.model === 'string' ? incoming.model.trim() : ''
  if (raw && ALLOWED_CHAT_MODELS.has(raw)) return raw
  return 'gemini-2.0-flash'
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

function extractCandidateText(json: unknown): string {
  const o = json as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    error?: { message?: string; code?: number }
  }
  if (o.error?.message) return ''
  const parts = o.candidates?.[0]?.content?.parts
  if (!parts?.length) return ''
  return parts.map((p) => p.text ?? '').join('')
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
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'content_block_delta', delta: { text: delta } })}\n\n`,
            ),
          )
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
  const method = stream ? 'streamGenerateContent' : 'generateContent'
  const url = `${GEMINI_HOST}/models/${encodeURIComponent(model)}:${method}${stream ? '?alt=sse' : ''}`

  const upstream = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': key,
    },
    body: JSON.stringify(payload),
  })

  if (!upstream.ok) {
    const t = await upstream.text()
    const status = upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502
    return new Response(t, { status: status === 404 ? 502 : status })
  }

  if (stream && upstream.body) {
    const outBody = geminiStreamToAnthropicSseStream(upstream.body)
    return new Response(outBody, {
      status: 200,
      headers: {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache, no-transform',
      },
    })
  }

  const json = (await upstream.json()) as unknown
  const text = extractCandidateText(json)
  const shaped = { content: [{ type: 'text' as const, text }] }
  return new Response(JSON.stringify(shaped), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
