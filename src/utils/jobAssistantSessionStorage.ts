import type { AIRecommendation, ChatMessage, MapArea } from '../types'

const STORAGE_PREFIX = 'traffic:job-assistant:v1:'

export function jobAssistantStorageKey(embedded: boolean | undefined): string {
  return `${STORAGE_PREFIX}${embedded ? 'embed' : 'page'}`
}

export interface JobAssistantPersistedV1 {
  v: 1
  /** ISO time — used to merge home embed vs full-page assistant sessions */
  savedAt?: string
  mode: 'chat' | 'form'
  messages: { role: 'user' | 'assistant'; content: string; timestamp: string }[]
  input: string
  mapArea?: MapArea
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  choiceSelections: [string, string][]
  lockedQuestionIndices: number[]
  mapExpanded: boolean
}

function reviveMessages(
  rows: JobAssistantPersistedV1['messages'] | undefined,
): ChatMessage[] {
  if (!rows?.length) return []
  return rows.map((m) => ({
    role: m.role,
    content: m.content,
    timestamp: new Date(m.timestamp),
  }))
}

export function readJobAssistantSession(embedded: boolean | undefined): Partial<{
  mode: JobAssistantPersistedV1['mode']
  messages: ChatMessage[]
  input: string
  mapArea: MapArea | undefined
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  choiceSelections: Map<string, string>
  lockedQuestionMessages: Set<number>
  mapExpanded: boolean
}> | null {
  try {
    const raw = sessionStorage.getItem(jobAssistantStorageKey(embedded))
    if (!raw) return null
    const p = JSON.parse(raw) as JobAssistantPersistedV1
    if (p.v !== 1) return null
    return {
      mode: p.mode === 'form' ? 'form' : 'chat',
      messages: reviveMessages(p.messages),
      input: typeof p.input === 'string' ? p.input : '',
      mapArea: p.mapArea,
      mapSiteLocated: Boolean(p.mapSiteLocated),
      recommendation: p.recommendation ?? null,
      choiceSelections: new Map(p.choiceSelections ?? []),
      lockedQuestionMessages: new Set(p.lockedQuestionIndices ?? []),
      mapExpanded: Boolean(p.mapExpanded),
    }
  } catch {
    return null
  }
}

export function writeJobAssistantSession(
  embedded: boolean | undefined,
  payload: JobAssistantPersistedV1,
): void {
  try {
    sessionStorage.setItem(jobAssistantStorageKey(embedded), JSON.stringify(payload))
  } catch {
    /* quota */
  }
}

export function clearJobAssistantSession(embedded: boolean | undefined): void {
  try {
    sessionStorage.removeItem(jobAssistantStorageKey(embedded))
  } catch {
    /* ignore */
  }
}

function readPersistedBlob(embedded: boolean): JobAssistantPersistedV1 | null {
  try {
    const raw = sessionStorage.getItem(jobAssistantStorageKey(embedded))
    if (!raw) return null
    const p = JSON.parse(raw) as JobAssistantPersistedV1
    if (p.v !== 1) return null
    return p
  } catch {
    return null
  }
}

/** Newest of embed vs full-page job assistant blob (by `savedAt`, then full-page on tie). */
export function getLatestJobAssistantPersisted(): JobAssistantPersistedV1 | null {
  const embed = readPersistedBlob(true)
  const page = readPersistedBlob(false)
  if (!embed && !page) return null
  if (!embed) return page
  if (!page) return embed
  const te = embed.savedAt ? Date.parse(embed.savedAt) : 0
  const tp = page.savedAt ? Date.parse(page.savedAt) : 0
  if (tp > te) return page
  if (te > tp) return embed
  return page
}

export function buildPersistPayload(params: {
  mode: 'chat' | 'form'
  messages: ChatMessage[]
  input: string
  mapArea: MapArea | undefined
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  choiceSelections: Map<string, string>
  lockedQuestionMessages: Set<number>
  mapExpanded: boolean
}): JobAssistantPersistedV1 {
  return {
    v: 1,
    savedAt: new Date().toISOString(),
    mode: params.mode,
    messages: params.messages.map((m) => ({
      role: m.role,
      content: m.content,
      timestamp:
        m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
    })),
    input: params.input,
    mapArea: params.mapArea,
    mapSiteLocated: params.mapSiteLocated,
    recommendation: params.recommendation,
    choiceSelections: [...params.choiceSelections.entries()],
    lockedQuestionIndices: [...params.lockedQuestionMessages],
    mapExpanded: params.mapExpanded,
  }
}
