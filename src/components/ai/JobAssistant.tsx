import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo, type SetStateAction } from 'react'
import {
  Sparkles,
  Send,
  Upload,
  X,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Plus,
  Eraser,
} from 'lucide-react'
import { streamJobChat, recoverJobChatCart } from '../../utils/aiClient'
import { normalizeRecommendationPricing, type RecommendationFootprintGuard } from '../../utils/pricing'
import { extractChatCartRecommendation, tryParseTailAfterCartStart } from '../../utils/chatCartParse'
import type { ChatMessage, AIRecommendation } from '../../types'
import {
  buildPersistPayload,
  clearJobAssistantSession,
  readJobAssistantSession,
  writeJobAssistantSession,
  type JobAssistantChatTabState,
} from '../../utils/jobAssistantSessionStorage'
import CartWidget from './CartWidget'
import ChoiceChipsWithCustom from './ChoiceChipsWithCustom'
import { parseQASegments as parseQASegmentsFromUtil } from '../../utils/chatQAParse'

type Segment =
  | { type: 'text'; content: string }
  | { type: 'choices'; question: string; options: string[] }
  | { type: 'cart'; recommendation: AIRecommendation }

function parseQASegments(content: string): Segment[] {
  return parseQASegmentsFromUtil(content) as Segment[]
}

function parseSegments(content: string, mapFootprint?: RecommendationFootprintGuard): Segment[] {
  const cartRegex = /\[CART_START\]([\s\S]*?)\[CART_END\]/g
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = cartRegex.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index).trim()
    if (before) segments.push(...parseQASegments(before))
    try {
      const rec = normalizeRecommendationPricing(
        JSON.parse(match[1].trim()) as AIRecommendation,
        mapFootprint,
      )
      segments.push({ type: 'cart', recommendation: rec })
    } catch {
      segments.push({ type: 'text', content: match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  let remaining = content.slice(lastIndex)
  const openIdx = remaining.indexOf('[CART_START]')
  if (openIdx !== -1) {
    const beforeMarker = remaining.slice(0, openIdx).trim()
    if (beforeMarker) segments.push(...parseQASegments(beforeMarker))
    const afterOpen = remaining.slice(openIdx + '[CART_START]'.length)
    const parsedOpen = tryParseTailAfterCartStart(afterOpen, mapFootprint)
    if (parsedOpen) {
      segments.push({ type: 'cart', recommendation: parsedOpen.rec })
      if (parsedOpen.remainder.trim()) segments.push(...parseQASegments(parsedOpen.remainder.trim()))
      return segments
    }
    segments.push({
      type: 'text',
      content:
        'The equipment list still could not be loaded after an automatic retry. Send your message again.',
    })
    return segments
  }

  remaining = remaining.trim()
  if (remaining) segments.push(...parseQASegments(remaining))
  return segments
}

interface Props {
  initialPrompt?: string
  /** Tighter empty state when the planner is embedded (e.g. homepage) so it does not repeat the page headline. */
  embedded?: boolean
}

function newChatTabId(): string {
  return `tab-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function emptyChatTab(title: string, id: string): JobAssistantChatTabState {
  return {
    id,
    title,
    messages: [],
    input: '',
    choiceSelections: new Map(),
    lockedQuestionMessages: new Set(),
  }
}

function ThinkingIndicator() {
  return (
    <div
      className="flex items-center gap-2.5 min-h-[1.25rem]"
      role="status"
      aria-live="polite"
      aria-label="Assistant is thinking"
    >
      <span className="text-sm font-medium text-slate-200">Thinking</span>
      <div className="flex gap-1 items-center pt-0.5" aria-hidden>
        <div className="typing-dot !bg-brand-400/90" />
        <div className="typing-dot !bg-brand-400/90" />
        <div className="typing-dot !bg-brand-400/90" />
      </div>
    </div>
  )
}

export default function JobAssistant({ initialPrompt, embedded }: Props) {
  const [boot] = useState(() => {
    const session = readJobAssistantSession(embedded)
    let tabs: JobAssistantChatTabState[]
    let activeId: string
    if (session?.chatTabs?.length) {
      tabs = session.chatTabs.map((t) => ({
        ...t,
        choiceSelections: new Map(t.choiceSelections),
        lockedQuestionMessages: new Set(t.lockedQuestionMessages),
      }))
      activeId =
        session.activeChatTabId && tabs.some((t) => t.id === session.activeChatTabId)
          ? session.activeChatTabId
          : tabs[0]!.id
    } else {
      const id = newChatTabId()
      const t0 = emptyChatTab('Chat 1', id)
      tabs = [{ ...t0, input: initialPrompt?.trim() ? initialPrompt : '' }]
      activeId = id
    }
    return { session, tabs, activeId }
  })

  const [chatTabs, setChatTabs] = useState(boot.tabs)
  const [activeChatTabId, setActiveChatTabId] = useState(boot.activeId)
  const activeChatTabIdRef = useRef(activeChatTabId)
  useLayoutEffect(() => {
    activeChatTabIdRef.current = activeChatTabId
  }, [activeChatTabId])

  const activeTab = useMemo(
    () => chatTabs.find((t) => t.id === activeChatTabId) ?? chatTabs[0]!,
    [chatTabs, activeChatTabId],
  )
  const messages = activeTab.messages
  const input = activeTab.input
  const choiceSelections = activeTab.choiceSelections
  const lockedQuestionMessages = activeTab.lockedQuestionMessages

  const setMessages = useCallback((action: SetStateAction<ChatMessage[]>) => {
    const id = activeChatTabIdRef.current
    setChatTabs((prev) =>
      prev.map((t) =>
        t.id !== id
          ? t
          : {
              ...t,
              messages: typeof action === 'function' ? (action as (m: ChatMessage[]) => ChatMessage[])(t.messages) : action,
            },
      ),
    )
  }, [])

  const setInput = useCallback((value: SetStateAction<string>) => {
    const id = activeChatTabIdRef.current
    setChatTabs((prev) =>
      prev.map((t) =>
        t.id !== id
          ? t
          : {
              ...t,
              input: typeof value === 'function' ? (value as (s: string) => string)(t.input) : value,
            },
      ),
    )
  }, [])

  const setChoiceSelections = useCallback((action: SetStateAction<Map<string, string>>) => {
    const id = activeChatTabIdRef.current
    setChatTabs((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const next =
          typeof action === 'function'
            ? (action as (m: Map<string, string>) => Map<string, string>)(new Map(t.choiceSelections))
            : action
        return { ...t, choiceSelections: next }
      }),
    )
  }, [])

  const setLockedQuestionMessages = useCallback((action: SetStateAction<Set<number>>) => {
    const id = activeChatTabIdRef.current
    setChatTabs((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const next =
          typeof action === 'function'
            ? (action as (s: Set<number>) => Set<number>)(new Set(t.lockedQuestionMessages))
            : action
        return { ...t, lockedQuestionMessages: next }
      }),
    )
  }, [])

  const [isStreaming, setIsStreaming] = useState(false)
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(
    () => boot.session?.recommendation ?? null,
  )
  const imageFileRef = useRef<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const persistSig = useMemo(
    () =>
      JSON.stringify({
        activeChatTabId,
        chatTabs: chatTabs.map((t) => ({
          id: t.id,
          title: t.title,
          messages: t.messages.map((m) => ({
            role: m.role,
            content: m.content,
            t: m.timestamp instanceof Date ? m.timestamp.getTime() : 0,
          })),
          input: t.input,
          cs: [...t.choiceSelections.entries()].sort((a, b) => a[0].localeCompare(b[0])),
          lq: [...t.lockedQuestionMessages].sort((a, b) => a - b),
        })),
        recommendation,
      }),
    [activeChatTabId, chatTabs, recommendation],
  )

  useEffect(() => {
    if (isStreaming) return
    const t = setTimeout(() => {
      writeJobAssistantSession(
        embedded,
        buildPersistPayload({
          mode: 'chat',
          chatTabs,
          activeChatTabId,
          mapArea: undefined,
          mapSiteLocated: false,
          recommendation,
          mapExpanded: false,
        }),
      )
    }, 400)
    return () => clearTimeout(t)
  }, [persistSig, embedded, isStreaming])

  const scrollPanelToBottom = () => {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  /** After layout paint — keeps scroll inside the chat panel, not the window */
  const scheduleScrollPanelToBottom = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollPanelToBottom())
    })
  }

  const initialHadChatMessages = Boolean(boot.session?.chatTabs?.some((t) => t.messages.length > 0))

  useEffect(() => {
    if (!initialPrompt || initialHadChatMessages) return
    void sendMessage(initialPrompt).catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return
    setError(null)

    const trimmed = text.trim()

    const userMsg: ChatMessage = { role: 'user', content: trimmed, timestamp: new Date() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsStreaming(true)

    // Add empty assistant message for streaming
    const assistantMsg: ChatMessage = { role: 'assistant', content: '', timestamp: new Date() }
    setMessages([...newMessages, assistantMsg])
    scheduleScrollPanelToBottom()

    let streamedAssistant = ''
    try {
      await streamJobChat(
        newMessages.map((m) => ({ role: m.role, content: m.content })),
        (chunk) => {
          streamedAssistant += chunk
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last.role === 'assistant') {
              updated[updated.length - 1] = { ...last, content: last.content + chunk }
            }
            return updated
          })
        },
        () => {},
      )

      const cartOk = extractChatCartRecommendation(streamedAssistant, undefined)
      if (streamedAssistant.includes('[CART_START]') && !cartOk) {
        const merged = await recoverJobChatCart(
          newMessages.map((m) => ({ role: m.role, content: m.content })),
          streamedAssistant,
          {},
        )
        streamedAssistant = merged
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last?.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: merged }
          }
          return updated
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      throw err
    } finally {
      setIsStreaming(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    imageFileRef.current = file
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const selectChoiceOption = (msgIndex: number, segIndex: number, option: string) => {
    if (isStreaming || lockedQuestionMessages.has(msgIndex)) return
    const key = `${msgIndex}-${segIndex}`
    setChoiceSelections((prev) => new Map(prev).set(key, option))
  }

  const submitChoiceBatch = async (msgIndex: number, nonCartSegs: Segment[]) => {
    if (isStreaming || lockedQuestionMessages.has(msgIndex)) return
    const choiceBlocks = nonCartSegs
      .map((seg, si) => ({ seg, si }))
      .filter((x): x is { seg: Extract<Segment, { type: 'choices' }>; si: number } => x.seg.type === 'choices')
    if (choiceBlocks.length === 0) return
    const allChosen = choiceBlocks.every(({ si }) => {
      const v = choiceSelections.get(`${msgIndex}-${si}`)
      return typeof v === 'string' && v.trim().length > 0
    })
    if (!allChosen) return

    const body = choiceBlocks
      .map(({ seg, si }) => {
        const ans = choiceSelections.get(`${msgIndex}-${si}`)!
        return `• ${seg.question} ${ans}`
      })
      .join('\n')

    setLockedQuestionMessages((prev) => new Set(prev).add(msgIndex))
    try {
      await sendMessage(`Here are my answers:\n${body}`)
    } catch {
      setLockedQuestionMessages((prev) => {
        const next = new Set(prev)
        next.delete(msgIndex)
        return next
      })
    }
  }

  const submitSingleChoiceAnswer = async (
    msgIndex: number,
    segIndex: number,
    question: string,
    option: string,
  ) => {
    if (isStreaming || lockedQuestionMessages.has(msgIndex)) return
    const key = `${msgIndex}-${segIndex}`
    setChoiceSelections((prev) => new Map(prev).set(key, option))
    setLockedQuestionMessages((prev) => new Set(prev).add(msgIndex))
    try {
      await sendMessage(`Here are my answers:\n• ${question} ${option}`)
    } catch {
      setLockedQuestionMessages((prev) => {
        const next = new Set(prev)
        next.delete(msgIndex)
        return next
      })
      setChoiceSelections((prev) => {
        const next = new Map(prev)
        next.delete(key)
        return next
      })
    }
  }

  const handleReset = () => {
    clearJobAssistantSession(embedded)
    const id = newChatTabId()
    setChatTabs([emptyChatTab('Chat 1', id)])
    setActiveChatTabId(id)
    setRecommendation(null)
    imageFileRef.current = null
    setImagePreview(null)
    setError(null)
  }

  const handleClearChat = useCallback(() => {
    if (isStreaming) return
    const id = activeChatTabIdRef.current
    setChatTabs((prev) =>
      prev.map((t) =>
        t.id !== id
          ? t
          : {
              ...t,
              messages: [],
              input: '',
              choiceSelections: new Map(),
              lockedQuestionMessages: new Set(),
            },
      ),
    )
    setError(null)
    imageFileRef.current = null
    setImagePreview(null)
  }, [isStreaming])

  const handleNewChatTab = useCallback(() => {
    if (isStreaming) return
    const id = newChatTabId()
    const title = `Chat ${chatTabs.length + 1}`
    setChatTabs((prev) => [...prev, emptyChatTab(title, id)])
    setActiveChatTabId(id)
    setError(null)
    imageFileRef.current = null
    setImagePreview(null)
  }, [isStreaming, chatTabs.length])

  const handleCloseChatTab = useCallback(
    (tabId: string) => {
      if (isStreaming) return
      setChatTabs((prev) => {
        if (prev.length <= 1) return prev
        const idx = prev.findIndex((t) => t.id === tabId)
        if (idx === -1) return prev
        const filtered = prev.filter((t) => t.id !== tabId)
        if (activeChatTabIdRef.current === tabId) {
          const pick = filtered[Math.max(0, idx - 1)] ?? filtered[0]!
          setActiveChatTabId(pick.id)
        }
        return filtered
      })
    },
    [isStreaming],
  )

  const isEmpty = messages.length === 0 && !recommendation
  const anyTabHasChat = chatTabs.some((t) => t.messages.length > 0 || t.input.trim().length > 0)
  const showReset = anyTabHasChat || Boolean(recommendation) || chatTabs.length > 1

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-2 p-4 border-b border-slate-800">
        <div className="flex flex-1 items-center gap-1.5 text-xs font-medium text-slate-300">
          <Sparkles size={12} className="text-brand-400" aria-hidden />
          Chat with AI
        </div>
        {showReset && (
          <button
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition-all"
            title="Start over"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      {(() => {
        const scrollAreaClassName =
          'min-h-0 overflow-y-auto overscroll-y-contain flex-1'

        const inner = (
          <>
          <div className="p-4">
            <div className="flex items-stretch gap-1.5 mb-3 -mt-0.5 min-h-0">
              <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pb-0.5 [scrollbar-width:thin]">
                {chatTabs.map((tab) => {
                  const isActive = tab.id === activeChatTabId
                  return (
                    <div
                      key={tab.id}
                      className={`flex shrink-0 items-stretch rounded-lg border text-left text-xs font-medium transition-colors ${
                        isActive
                          ? 'border-slate-600 bg-slate-700 text-white shadow-sm'
                          : 'border-slate-700/80 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        disabled={isStreaming}
                        onClick={() => setActiveChatTabId(tab.id)}
                        className="max-w-[9rem] truncate px-2.5 py-1.5 text-left disabled:opacity-50"
                        title={tab.title}
                      >
                        {tab.title}
                      </button>
                      {chatTabs.length > 1 && (
                        <button
                          type="button"
                          disabled={isStreaming}
                          onClick={() => handleCloseChatTab(tab.id)}
                          className="flex items-center border-l border-slate-600/60 px-1.5 text-slate-500 hover:bg-slate-600/40 hover:text-slate-200 disabled:opacity-40 rounded-r-lg"
                          aria-label={`Close ${tab.title}`}
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  )
                })}
                <button
                  type="button"
                  disabled={isStreaming}
                  onClick={handleNewChatTab}
                  title="New chat tab"
                  className="flex shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/40 px-2 py-1.5 text-slate-400 hover:border-brand-500/50 hover:bg-brand-500/10 hover:text-brand-200 disabled:opacity-40"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                disabled={isStreaming || (messages.length === 0 && !input.trim())}
                onClick={handleClearChat}
                title="Clear messages in this tab"
                className="flex shrink-0 items-center gap-1 self-center rounded-lg border border-slate-700 bg-slate-800/50 px-2 py-1.5 text-[11px] font-medium text-slate-400 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <Eraser size={12} />
                <span className="hidden sm:inline">Clear chat</span>
              </button>
            </div>
            {isEmpty && !isStreaming && (
              <div className={`text-center ${embedded ? 'py-5' : 'py-8'}`}>
                {!embedded && (
                  <>
                    <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={24} className="text-brand-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Work Zone AI Planner</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                      Describe the road, speeds, lane impact, how long you will be set up, and day or night work — add distances in feet if you know them. Then send to get quantities and a cart-ready list.
                    </p>
                  </>
                )}
                {embedded && (
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-4 leading-relaxed">
                    Include road type, speed, lane closure, duration, and day vs night. Linear feet of closure or taper help tune counts.
                  </p>
                )}
                <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
                  {[
                    'Paving crew, one lane closed, 45 mph road, 5 days',
                    'Water main repair on arterial, night work, need lights',
                    'Tree trimming on residential street shoulder',
                    'Full road closure for 2 weeks, bridge deck work',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt).catch(() => {})}
                      className="text-left px-3 py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 text-xs rounded-lg transition-all duration-150"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg, i) => {
                if (msg.role === 'user') {
                  return (
                    <div key={i} className="flex gap-3 flex-row-reverse animate-slide-up">
                      <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-brand-500/20 border border-brand-500/30 text-white rounded-tr-sm whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  )
                }

                // Assistant message
                const isLast = i === messages.length - 1
                if (isStreaming && isLast) {
                  const cartIdx = msg.content.indexOf('[CART_START]')
                  const lead = cartIdx === -1 ? msg.content : msg.content.slice(0, cartIdx)
                  const visibleText = lead
                    .replace(/\[Q:[^\]]*\]/g, '')
                    .replace(/\[A:[^\]]*\]/g, '')
                    .replace(/\n{3,}/g, '\n\n')
                    .trim()
                  const afterCart =
                    cartIdx === -1 ? '' : msg.content.slice(cartIdx + '[CART_START]'.length)
                  const streamingCart = afterCart ? tryParseTailAfterCartStart(afterCart, undefined)?.rec : undefined
                  return (
                    <div key={i} className="space-y-2 animate-slide-up">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={12} className="text-brand-400" />
                        </div>
                        <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-sm">
                          {visibleText ? (
                            <>
                              <span className="whitespace-pre-wrap">{visibleText}</span>
                              <span
                                className="inline-block w-0.5 h-4 bg-brand-400 ml-0.5 align-middle animate-pulse"
                                aria-hidden
                              />
                            </>
                          ) : (
                            <ThinkingIndicator />
                          )}
                        </div>
                      </div>
                      {streamingCart && (
                        <div className="flex gap-3">
                          <div className="w-7 flex-shrink-0" aria-hidden />
                          <div className="min-h-0 flex-1 min-w-0">
                            <CartWidget recommendation={streamingCart} layout="modal" />
                          </div>
                        </div>
                      )}
                      {cartIdx !== -1 && !streamingCart && (
                        <div className="flex gap-3">
                          <div className="w-7 flex-shrink-0" aria-hidden />
                          <p className="text-xs text-slate-500 py-1">Finishing equipment list…</p>
                        </div>
                      )}
                    </div>
                  )
                }

                // Parse segments for completed assistant messages
                const segments = parseSegments(msg.content, undefined)
                const nonCartSegs = segments.filter((s) => s.type !== 'cart')
                const cartSegs = segments.filter((s) => s.type === 'cart') as { type: 'cart'; recommendation: AIRecommendation }[]
                const choiceSegIndices = nonCartSegs
                  .map((seg, si) => ({ seg, si }))
                  .filter((x): x is { seg: Extract<Segment, { type: 'choices' }>; si: number } => x.seg.type === 'choices')
                const allChoicesPicked =
                  choiceSegIndices.length > 0 &&
                  choiceSegIndices.every(({ si }) => {
                    const v = choiceSelections.get(`${i}-${si}`)
                    return typeof v === 'string' && v.trim().length > 0
                  })
                const showBatchSubmit =
                  choiceSegIndices.length > 1 && !lockedQuestionMessages.has(i) && !isStreaming

                return (
                  <div key={i} className="animate-slide-up space-y-2">
                    {/* Bubble for text/choice segments */}
                    {nonCartSegs.length > 0 && (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={12} className="text-brand-400" />
                        </div>
                        <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-sm">
                          <div className="space-y-3">
                            {nonCartSegs.map((seg, si) =>
                              seg.type === 'text' ? (
                                seg.content.trim() ? <p key={si} className="whitespace-pre-wrap leading-relaxed">{seg.content.trim()}</p> : null
                              ) : seg.type === 'choices' ? (
                                <ChoiceChipsWithCustom
                                  key={si}
                                  question={seg.question}
                                  options={seg.options}
                                  picked={choiceSelections.get(`${i}-${si}`)}
                                  locked={lockedQuestionMessages.has(i)}
                                  disabled={isStreaming}
                                  onPickPreset={(opt) => {
                                    if (choiceSegIndices.length === 1) {
                                      void submitSingleChoiceAnswer(i, si, seg.question, opt)
                                    } else {
                                      selectChoiceOption(i, si, opt)
                                    }
                                  }}
                                  onApplyCustom={(text) => {
                                    if (choiceSegIndices.length === 1) {
                                      void submitSingleChoiceAnswer(i, si, seg.question, text)
                                    } else {
                                      selectChoiceOption(i, si, text)
                                    }
                                  }}
                                />
                              ) : null
                            )}
                            {showBatchSubmit && (
                              <div className="pt-2 border-t border-slate-700/60 space-y-2">
                                <p className="text-[11px] text-slate-500">
                                  Pick one option per question (or Custom for your own wording), then send them together.
                                </p>
                                <button
                                  type="button"
                                  onClick={() => submitChoiceBatch(i, nonCartSegs)}
                                  disabled={!allChoicesPicked}
                                  className="w-full btn-primary py-2.5 text-xs justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                                >
                                  Send answers to AI
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cart widget(s) — full width with avatar offset */}
                    {cartSegs.map((seg, si) => (
                      <div key={`cart-${i}-${si}`} className="flex gap-3">
                        {nonCartSegs.length === 0 && (
                          <div className="w-7 h-7 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles size={12} className="text-brand-400" />
                          </div>
                        )}
                        {nonCartSegs.length > 0 && <div className="w-7 flex-shrink-0" />}
                        <div className="min-h-0 flex-1 min-w-0">
                          <CartWidget key={`cart-${i}-${si}`} recommendation={seg.recommendation} layout="modal" />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}

              {isStreaming && messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles size={12} className="text-brand-400" />
                  </div>
                  <div className="max-w-[85%] px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl rounded-tl-sm">
                    <ThinkingIndicator />
                  </div>
                </div>
              )}

            </div>
          </div>

            {/* Recommendation result (legacy session from older guided form) */}
            {recommendation && (
              <div className="p-4 border-t border-slate-800">
                <CartWidget key="cart-form" recommendation={recommendation} layout="modal" />
              </div>
            )}
          </>
        )

        const composerBlock = (
          <>
            <div className="flex flex-col gap-1.5 shrink-0">
              <div className="flex items-center gap-1.5 px-0.5">
                <MessageSquare size={12} className="shrink-0 text-brand-400/90" aria-hidden />
                <label
                  htmlFor="job-assistant-composer"
                  className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-brand-400/90"
                >
                  Message
                </label>
                <span className="hidden min-[380px]:inline text-[10px] text-slate-500">
                  Road, speed, lanes, duration, day or night — distances in feet if you have them
                </span>
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative rounded-2xl border border-brand-500/25 bg-slate-950/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/20 transition-colors">
                  <textarea
                    id="job-assistant-composer"
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Example: one lane closed, 45 mph county road, 400 ft closure, 5 days, day work…"
                    rows={4}
                    className="w-full rounded-2xl px-3.5 py-3 pr-11 bg-transparent text-sm leading-relaxed text-slate-100 placeholder-slate-500 outline-none resize-none min-h-[6.25rem] max-h-44"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        void sendMessage(input).catch(() => {})
                      }
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-2.5 bottom-2.5 p-1.5 text-slate-500 hover:text-slate-300 rounded-xl hover:bg-slate-800/90 transition-all"
                    title="Upload job site photo"
                  >
                    <Upload size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => void sendMessage(input).catch(() => {})}
                  disabled={!input.trim() || isStreaming}
                  className="flex-shrink-0 w-10 h-10 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-brand-500/25"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            {imagePreview && (
              <div className="relative inline-block shrink-0">
                <img src={imagePreview} alt="Job site" className="h-16 w-auto rounded-lg border border-slate-700 object-cover" />
                <button
                  onClick={() => {
                    imageFileRef.current = null
                    setImagePreview(null)
                  }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-700 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            )}
          </>
        )

        const fileInput = (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        )

        const errorBlock = error ? (
          <div className="mx-4 mb-2 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        ) : null

        return (
          <div className="flex min-h-0 flex-1 flex-col">
            <div ref={scrollContainerRef} className={scrollAreaClassName}>
              {inner}
            </div>
            {errorBlock}
            <div className="shrink-0 space-y-2.5 border-t border-slate-800 p-3 sm:p-4">
              {composerBlock}
              {fileInput}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
