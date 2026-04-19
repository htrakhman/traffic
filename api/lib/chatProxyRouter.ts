/**
 * Tries chat backends in order until one returns HTTP 2xx.
 * Env CHAT_AI_FALLBACK_ORDER: comma list, default "gemini,openai,perplexity"
 * (e.g. "openai,gemini" to try OpenAI first when both keys exist).
 */

import { getGeminiKey, handleGeminiChatRequest } from './geminiChatProxy'
import { handleOpenAICompatibleRequest } from './openaiCompatibleChat'

const MAX_BODY_BYTES = 64 * 1024

type ProviderId = 'openai' | 'gemini' | 'perplexity'

function parseProviderOrder(): ProviderId[] {
  const raw = process.env.CHAT_AI_FALLBACK_ORDER?.trim() || 'gemini,openai,perplexity'
  const allowed = new Set<string>(['openai', 'gemini', 'perplexity'])
  const parts = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ProviderId => allowed.has(s))
  const seen = new Set<ProviderId>()
  const out: ProviderId[] = []
  for (const p of parts) {
    if (!seen.has(p)) {
      seen.add(p)
      out.push(p)
    }
  }
  return out.length ? out : ['gemini', 'openai', 'perplexity']
}

function getOpenAiKey(): string | undefined {
  return process.env.OPENAI_API_KEY?.trim()
}

function getPerplexityKey(): string | undefined {
  return process.env.PERPLEXITY_API_KEY?.trim()
}

export async function handleChatRequest(incoming: Record<string, unknown>): Promise<Response> {
  const bodyJson = JSON.stringify(incoming)
  if (bodyJson.length > MAX_BODY_BYTES) {
    return new Response(JSON.stringify({ error: 'Payload too large' }), {
      status: 413,
      headers: { 'content-type': 'application/json' },
    })
  }

  const order = parseProviderOrder()
  const openaiKey = getOpenAiKey()
  const perplexityKey = getPerplexityKey()
  const geminiKey = getGeminiKey()

  let lastFailure: { status: number; body: string } | null = null
  let triedAny = false

  for (const provider of order) {
    if (provider === 'openai' && !openaiKey) continue
    if (provider === 'perplexity' && !perplexityKey) continue
    if (provider === 'gemini' && !geminiKey) continue

    triedAny = true

    let res: Response
    if (provider === 'openai') {
      res = await handleOpenAICompatibleRequest(incoming, {
        apiKey: openaiKey!,
        baseUrl: process.env.OPENAI_API_BASE?.trim() || 'https://api.openai.com/v1',
        defaultModel: process.env.OPENAI_CHAT_MODEL?.trim() || 'gpt-4o-mini',
        outputTokenLimit: 'completion',
      })
    } else if (provider === 'perplexity') {
      res = await handleOpenAICompatibleRequest(incoming, {
        apiKey: perplexityKey!,
        baseUrl: 'https://api.perplexity.ai',
        defaultModel: process.env.PERPLEXITY_CHAT_MODEL?.trim() || 'sonar',
        outputTokenLimit: 'max_tokens',
      })
    } else {
      res = await handleGeminiChatRequest(incoming)
    }

    if (res.ok) return res

    // Do not short-circuit on 400: upstream often returns invalid_parameter (e.g. wrong
    // token limit field for the model); we still want Gemini/Perplexity to run.
    if (res.status === 413) return res

    const body = await res.text().catch(() => '')
    lastFailure = { status: res.status, body: body.slice(0, 800) }
  }

  if (!triedAny) {
    return new Response(
      JSON.stringify({
        error:
          'Server misconfigured: no chat API keys. Set OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), and/or PERPLEXITY_API_KEY, then redeploy.',
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({
      error: 'All configured chat providers failed',
      detail: lastFailure ? `${lastFailure.status}: ${lastFailure.body}` : 'unknown',
    }),
    { status: 502, headers: { 'content-type': 'application/json' } },
  )
}
