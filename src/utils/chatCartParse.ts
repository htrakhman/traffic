import type { AIRecommendation } from '../types'
import { normalizeRecommendationPricing, type RecommendationFootprintGuard } from './pricing'

/** First `{` … matching `}` span, respecting JSON string escapes. */
export function extractFirstBalancedJson(source: string): string | null {
  const start = source.indexOf('{')
  if (start === -1) return null
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < source.length; i++) {
    const c = source[i]!
    if (inStr) {
      if (esc) {
        esc = false
        continue
      }
      if (c === '\\') {
        esc = true
        continue
      }
      if (c === '"') inStr = false
      continue
    }
    if (c === '"') {
      inStr = true
      continue
    }
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return source.slice(start, i + 1)
    }
  }
  return null
}

/**
 * Parse recommendation JSON after `[CART_START]` (with or without `[CART_END]`).
 * Used for completed messages and for streaming previews once JSON is balanced.
 */
/** First successfully parsed cart in the message, or null if none. */
export function extractChatCartRecommendation(
  content: string,
  mapFootprint?: RecommendationFootprintGuard,
): AIRecommendation | null {
  const cartRegex = /\[CART_START\]([\s\S]*?)\[CART_END\]/g
  let match: RegExpExecArray | null
  while ((match = cartRegex.exec(content)) !== null) {
    try {
      const rec = normalizeRecommendationPricing(
        JSON.parse(match[1].trim()) as AIRecommendation,
        mapFootprint,
      )
      if (Array.isArray(rec.items)) return rec
    } catch {
      /* try next match */
    }
  }
  const openIdx = content.indexOf('[CART_START]')
  if (openIdx === -1) return null
  const afterOpen = content.slice(openIdx + '[CART_START]'.length)
  return tryParseTailAfterCartStart(afterOpen, mapFootprint)?.rec ?? null
}

export function tryParseTailAfterCartStart(
  afterOpen: string,
  mapFootprint?: RecommendationFootprintGuard,
): { rec: AIRecommendation; remainder: string } | null {
  const endMarker = afterOpen.indexOf('[CART_END]')
  const bodyForJson = endMarker === -1 ? afterOpen : afterOpen.slice(0, endMarker)
  const jsonStr = extractFirstBalancedJson(bodyForJson)
  if (!jsonStr) return null
  try {
    const rec = normalizeRecommendationPricing(JSON.parse(jsonStr) as AIRecommendation, mapFootprint)
    if (!Array.isArray(rec.items)) return null
    const remainder =
      endMarker === -1
        ? (() => {
            const idx = afterOpen.indexOf(jsonStr)
            return idx >= 0 ? afterOpen.slice(idx + jsonStr.length).trim() : ''
          })()
        : afterOpen.slice(endMarker + '[CART_END]'.length).trim()
    return { rec, remainder }
  } catch {
    return null
  }
}
