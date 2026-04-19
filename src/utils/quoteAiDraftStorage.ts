import type { AIRecommendation } from '../types'

export const QUOTE_AI_DRAFT_STORAGE_KEY = 'traffic:quote-ai-draft:v1'

export function readQuoteAiDraft(): AIRecommendation | null {
  try {
    const raw = sessionStorage.getItem(QUOTE_AI_DRAFT_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AIRecommendation
  } catch {
    return null
  }
}

export function writeQuoteAiDraft(rec: AIRecommendation): void {
  try {
    sessionStorage.setItem(QUOTE_AI_DRAFT_STORAGE_KEY, JSON.stringify(rec))
  } catch {
    /* quota or private mode */
  }
}

export function clearQuoteAiDraft(): void {
  try {
    sessionStorage.removeItem(QUOTE_AI_DRAFT_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
