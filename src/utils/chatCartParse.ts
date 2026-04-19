import type { AIRecommendation } from '../types'
import { normalizeRecommendationPricing } from './pricing'

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
export function tryParseTailAfterCartStart(afterOpen: string): { rec: AIRecommendation; remainder: string } | null {
  const endMarker = afterOpen.indexOf('[CART_END]')
  const bodyForJson = endMarker === -1 ? afterOpen : afterOpen.slice(0, endMarker)
  const jsonStr = extractFirstBalancedJson(bodyForJson)
  if (!jsonStr) return null
  try {
    const rec = normalizeRecommendationPricing(JSON.parse(jsonStr) as AIRecommendation)
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
