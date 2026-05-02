import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, X, Minimize2, Send, ChevronRight } from 'lucide-react'
import { streamJobChat, recoverJobChatCart } from '../../utils/aiClient'
import { normalizeRecommendationPricing, type RecommendationFootprintGuard } from '../../utils/pricing'
import { extractChatCartRecommendation, tryParseTailAfterCartStart } from '../../utils/chatCartParse'
import { parseQASegments as parseQASegmentsFromUtil } from '../../utils/chatQAParse'
import type { AIRecommendation } from '../../types'
import CartWidget from './CartWidget'
import ChoiceChipsWithCustom from './ChoiceChipsWithCustom'

type Msg = { role: 'user' | 'assistant'; content: string }

type Segment =
  | { type: 'text'; content: string }
  | { type: 'choices'; question: string; options: string[] }
  | { type: 'cart'; recommendation: AIRecommendation }

const WELCOME =
  "Describe your job and I'll ask a few quick questions, then recommend equipment with quantities. When you're ready, add the list straight to your cart from the card below my reply."

const STARTER_PROMPTS = [
  'Road paving job, 2 lanes, 400ft',
  'Utility work in a parking lot',
  'Sidewalk closure, pedestrians nearby',
  'Overnight lane closure, 35 mph, 500ft',
  'Road milling, single lane, flaggers',
  'Bridge deck repair, narrow shoulder',
] as const

function parseSegments(content: string, mapFootprint?: RecommendationFootprintGuard): Segment[] {
  const cartRegex = /\[CART_START\]([\s\S]*?)\[CART_END\]/g
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = cartRegex.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index).trim()
    if (before) segments.push(...(parseQASegmentsFromUtil(before) as Segment[]))
    try {
      const rec = normalizeRecommendationPricing(JSON.parse(match[1].trim()) as AIRecommendation, mapFootprint)
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
    if (beforeMarker) segments.push(...(parseQASegmentsFromUtil(beforeMarker) as Segment[]))
    const afterOpen = remaining.slice(openIdx + '[CART_START]'.length)
    const parsedOpen = tryParseTailAfterCartStart(afterOpen, mapFootprint)
    if (parsedOpen) {
      segments.push({ type: 'cart', recommendation: parsedOpen.rec })
      if (parsedOpen.remainder.trim()) segments.push(...(parseQASegmentsFromUtil(parsedOpen.remainder.trim()) as Segment[]))
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
  if (remaining) segments.push(...(parseQASegmentsFromUtil(remaining) as Segment[]))
  return segments
}

function ThinkingDots() {
  return (
    <span className="inline-flex gap-0.5">
      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
    </span>
  )
}

export default function AIPlannerWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [choiceSelections, setChoiceSelections] = useState<Map<string, string>>(() => new Map())
  const [lockedQuestionMessages, setLockedQuestionMessages] = useState<Set<number>>(() => new Set())
  const [starterPromptsDismissed, setStarterPromptsDismissed] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || streaming) return

      const userMsg: Msg = { role: 'user', content: trimmed }
      const newMessages = [...messages, userMsg]
      setMessages(newMessages)
      setInput('')
      setStreaming(true)

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      let streamedAssistant = ''
      try {
        await streamJobChat(
          newMessages.map((m) => ({ role: m.role, content: m.content })),
          (chunk: string) => {
            streamedAssistant += chunk
            setMessages((prev) => {
              const next = [...prev]
              const last = next[next.length - 1]
              if (last?.role === 'assistant') {
                next[next.length - 1] = { ...last, content: last.content + chunk }
              }
              return next
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
            const next = [...prev]
            const last = next[next.length - 1]
            if (last?.role === 'assistant') next[next.length - 1] = { ...last, content: merged }
            return next
          })
        }
      } catch {
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant' && !last.content.trim()) {
            next[next.length - 1] = {
              ...last,
              content: 'Something went wrong. Try again in a moment.',
            }
          }
          return next
        })
      } finally {
        setStreaming(false)
      }
    },
    [messages, streaming],
  )

  const selectChoiceOption = useCallback((msgIndex: number, segIndex: number, option: string) => {
    if (streaming || lockedQuestionMessages.has(msgIndex)) return
    const key = `${msgIndex}-${segIndex}`
    setChoiceSelections((prev) => new Map(prev).set(key, option))
  }, [streaming, lockedQuestionMessages])

  const submitChoiceBatch = useCallback(
    async (msgIndex: number, nonCartSegs: Segment[]) => {
      if (streaming || lockedQuestionMessages.has(msgIndex)) return
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
    },
    [streaming, lockedQuestionMessages, choiceSelections, sendMessage],
  )

  /** One Q&A block: send immediately on chip click (no extra Send step). */
  const submitSingleChoiceAnswer = useCallback(
    async (msgIndex: number, segIndex: number, question: string, option: string) => {
      if (streaming || lockedQuestionMessages.has(msgIndex)) return
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
    },
    [streaming, lockedQuestionMessages, sendMessage],
  )

  const send = useCallback(() => {
    void sendMessage(input)
  }, [input, sendMessage])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[340px] sm:w-[380px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden animate-fade-in"
          style={{ height: '480px' }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-brand-400" />
              <span className="text-sm font-semibold text-white">AI Job Planner</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 size={13} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <div className="px-4 py-2 bg-brand-500/8 border-b border-slate-800 flex-shrink-0">
            <p className="text-[11px] text-brand-300 font-medium">
              Chat-only planner — I recommend SKUs and you add them to your cart. Draw a work zone anytime in Site Map Planner.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm min-h-0">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={11} className="text-brand-400" />
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 text-slate-300 text-xs leading-relaxed max-w-[90%]">
                {WELCOME}
              </div>
            </div>

            {messages.map((msg, i) => {
              if (msg.role === 'user') {
                return (
                  <div key={i} className="flex gap-2 justify-end">
                    <div className="rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap bg-brand-500 text-white rounded-tr-sm">
                      {msg.content}
                    </div>
                  </div>
                )
              }

              const isLast = i === messages.length - 1
              if (streaming && isLast) {
                const cartIdx = msg.content.indexOf('[CART_START]')
                const lead = cartIdx === -1 ? msg.content : msg.content.slice(0, cartIdx)
                const visibleText = lead
                  .replace(/\[Q:[^\]]*\]/g, '')
                  .replace(/\[A:[^\]]*\]/g, '')
                  .replace(/\n{3,}/g, '\n\n')
                  .trim()
                const afterCart =
                  cartIdx === -1 ? '' : msg.content.slice(cartIdx + '[CART_START]'.length)
                const streamingCart = afterCart
                  ? tryParseTailAfterCartStart(afterCart, undefined)?.rec
                  : undefined
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles size={11} className="text-brand-400" />
                      </div>
                      <div className="max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed bg-slate-800 text-slate-300 rounded-tl-sm">
                        {visibleText ? (
                          <>
                            <span className="whitespace-pre-wrap">{visibleText}</span>
                            <span
                              className="inline-block w-0.5 h-3.5 bg-brand-400 ml-0.5 align-middle animate-pulse"
                              aria-hidden
                            />
                          </>
                        ) : (
                          <ThinkingDots />
                        )}
                      </div>
                    </div>
                    {streamingCart && (
                      <div className="flex gap-2 pl-8 min-w-0">
                        <div className="min-w-0 flex-1">
                          <CartWidget recommendation={streamingCart} layout="inline" />
                        </div>
                      </div>
                    )}
                    {cartIdx !== -1 && !streamingCart && (
                      <p className="text-[10px] text-slate-500 pl-8">Finishing equipment list…</p>
                    )}
                  </div>
                )
              }

              const segments = parseSegments(msg.content, undefined)
              const nonCartSegs = segments.filter((s) => s.type !== 'cart')
              const cartSegs = segments.filter((s): s is Extract<Segment, { type: 'cart' }> => s.type === 'cart')
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
                choiceSegIndices.length > 1 && !lockedQuestionMessages.has(i) && !streaming

              return (
                <div key={i} className="space-y-2">
                  {nonCartSegs.length > 0 && (
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles size={11} className="text-brand-400" />
                      </div>
                      <div className="max-w-[90%] min-w-0 flex-1 rounded-2xl px-3 py-2 text-xs leading-relaxed bg-slate-800 text-slate-300 rounded-tl-sm">
                        <div className="space-y-2">
                          {nonCartSegs.map((seg, si) =>
                            seg.type === 'text' ? (
                              seg.content.trim() ? (
                                <p key={si} className="whitespace-pre-wrap leading-relaxed">
                                  {seg.content.trim()}
                                </p>
                              ) : null
                            ) : seg.type === 'choices' ? (
                              <ChoiceChipsWithCustom
                                key={si}
                                variant="compact"
                                question={seg.question}
                                options={seg.options}
                                picked={choiceSelections.get(`${i}-${si}`)}
                                locked={lockedQuestionMessages.has(i)}
                                disabled={streaming}
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
                            ) : null,
                          )}
                          {showBatchSubmit && (
                            <div className="pt-2 border-t border-slate-700/60 space-y-1.5">
                              <p className="text-[10px] text-slate-500">
                                Pick one answer per question (or Custom), then send.
                              </p>
                              <button
                                type="button"
                                onClick={() => void submitChoiceBatch(i, nonCartSegs)}
                                disabled={!allChoicesPicked}
                                className="w-full rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-semibold py-2"
                              >
                                Send answers
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {cartSegs.map((seg, si) => (
                    <div key={`cart-${i}-${si}`} className="flex gap-2 pl-8 min-w-0">
                      <div className="min-w-0 flex-1">
                        <CartWidget recommendation={seg.recommendation} layout="inline" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {messages.filter((m) => m.role === 'user').length === 0 && !starterPromptsDismissed && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0 border-t border-slate-800/80 pt-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setStarterPromptsDismissed(true)
                    void sendMessage(prompt)
                  }}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-400 hover:text-brand-300 hover:border-brand-500/30 text-[10px] rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {messages.filter((m) => m.role === 'user').length > 0 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <Link
                to="/planner"
                className="inline-flex items-center gap-1 text-[10px] text-brand-400 hover:text-brand-300 transition-colors"
              >
                Open Site Map Planner to draw your zone
                <ChevronRight size={10} />
              </Link>
            </div>
          )}

          <div className="px-3 pb-3 flex-shrink-0 border-t border-slate-800 pt-2">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="Describe your job..."
                rows={2}
                className="flex-1 resize-none bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={send}
                disabled={!input.trim() || streaming}
                className="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors"
                aria-label="Send"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-2xl shadow-lg shadow-brand-500/30 font-semibold text-sm transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={15} />
          Plan your job with AI
        </button>
      )}
    </div>
  )
}
