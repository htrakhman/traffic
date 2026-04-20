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

export interface JobAssistantChatTabPersistedV2 {
  id: string
  title: string
  messages: { role: 'user' | 'assistant'; content: string; timestamp: string }[]
  input: string
  choiceSelections: [string, string][]
  lockedQuestionIndices: number[]
}

export interface JobAssistantPersistedV2 {
  v: 2
  savedAt?: string
  mode: 'chat' | 'form'
  activeChatTabId: string
  chatTabs: JobAssistantChatTabPersistedV2[]
  mapArea?: MapArea
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  mapExpanded: boolean
}

export type JobAssistantPersistedBlob = JobAssistantPersistedV1 | JobAssistantPersistedV2

/** In-memory shape for one chat tab (Job Assistant UI). */
export type JobAssistantChatTabState = {
  id: string
  title: string
  messages: ChatMessage[]
  input: string
  choiceSelections: Map<string, string>
  lockedQuestionMessages: Set<number>
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

function migrateV1ToTabState(p: JobAssistantPersistedV1): {
  chatTabs: JobAssistantChatTabState[]
  activeChatTabId: string
} {
  const id = `tab-migrated-${Date.now().toString(36)}`
  return {
    chatTabs: [
      {
        id,
        title: 'Chat 1',
        messages: reviveMessages(p.messages),
        input: typeof p.input === 'string' ? p.input : '',
        choiceSelections: new Map(p.choiceSelections ?? []),
        lockedQuestionMessages: new Set(p.lockedQuestionIndices ?? []),
      },
    ],
    activeChatTabId: id,
  }
}

/**
 * Full boot state for Job Assistant (v1 session migrated to tabs in memory).
 */
export function readJobAssistantSession(embedded: boolean | undefined): {
  mode: JobAssistantPersistedV1['mode']
  chatTabs: JobAssistantChatTabState[]
  activeChatTabId: string
  mapArea: MapArea | undefined
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  mapExpanded: boolean
} | null {
  try {
    const raw = sessionStorage.getItem(jobAssistantStorageKey(embedded))
    if (!raw) return null
    const p = JSON.parse(raw) as JobAssistantPersistedBlob
    if (p.v === 2) {
      const v2 = p as JobAssistantPersistedV2
      let chatTabs: JobAssistantChatTabState[] = (v2.chatTabs ?? []).map((t) => ({
        id: typeof t.id === 'string' ? t.id : `tab-${Math.random().toString(36).slice(2, 9)}`,
        title: typeof t.title === 'string' ? t.title : 'Chat',
        messages: reviveMessages(t.messages),
        input: typeof t.input === 'string' ? t.input : '',
        choiceSelections: new Map(t.choiceSelections ?? []),
        lockedQuestionMessages: new Set(t.lockedQuestionIndices ?? []),
      }))
      if (!chatTabs.length) {
        const id = `tab-${Date.now().toString(36)}`
        chatTabs = [
          {
            id,
            title: 'Chat 1',
            messages: [],
            input: '',
            choiceSelections: new Map(),
            lockedQuestionMessages: new Set(),
          },
        ]
      }
      const active =
        typeof v2.activeChatTabId === 'string' && chatTabs.some((t) => t.id === v2.activeChatTabId)
          ? v2.activeChatTabId
          : chatTabs[0]!.id
      return {
        mode: v2.mode === 'form' ? 'form' : 'chat',
        chatTabs,
        activeChatTabId: active,
        mapArea: v2.mapArea,
        mapSiteLocated: Boolean(v2.mapSiteLocated),
        recommendation: v2.recommendation ?? null,
        mapExpanded: Boolean(v2.mapExpanded),
      }
    }
    if (p.v !== 1) return null
    const v1 = p as JobAssistantPersistedV1
    const { chatTabs, activeChatTabId } = migrateV1ToTabState(v1)
    return {
      mode: v1.mode === 'form' ? 'form' : 'chat',
      chatTabs,
      activeChatTabId,
      mapArea: v1.mapArea,
      mapSiteLocated: Boolean(v1.mapSiteLocated),
      recommendation: v1.recommendation ?? null,
      mapExpanded: Boolean(v1.mapExpanded),
    }
  } catch {
    return null
  }
}

export function writeJobAssistantSession(
  embedded: boolean | undefined,
  payload: JobAssistantPersistedV2,
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

function readPersistedBlob(embedded: boolean): JobAssistantPersistedBlob | null {
  try {
    const raw = sessionStorage.getItem(jobAssistantStorageKey(embedded))
    if (!raw) return null
    const p = JSON.parse(raw) as JobAssistantPersistedBlob
    if (p.v === 2 || p.v === 1) return p
    return null
  } catch {
    return null
  }
}

/** Newest of embed vs full-page job assistant blob (by `savedAt`, then full-page on tie). */
export function getLatestJobAssistantPersisted(): JobAssistantPersistedBlob | null {
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
  chatTabs: JobAssistantChatTabState[]
  activeChatTabId: string
  mapArea: MapArea | undefined
  mapSiteLocated: boolean
  recommendation: AIRecommendation | null
  mapExpanded: boolean
}): JobAssistantPersistedV2 {
  return {
    v: 2,
    savedAt: new Date().toISOString(),
    mode: params.mode,
    activeChatTabId: params.activeChatTabId,
    chatTabs: params.chatTabs.map((t) => ({
      id: t.id,
      title: t.title,
      messages: t.messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp:
          m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
      })),
      input: t.input,
      choiceSelections: [...t.choiceSelections.entries()],
      lockedQuestionIndices: [...t.lockedQuestionMessages],
    })),
    mapArea: params.mapArea,
    mapSiteLocated: params.mapSiteLocated,
    recommendation: params.recommendation,
    mapExpanded: params.mapExpanded,
  }
}
