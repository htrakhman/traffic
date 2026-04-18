import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, Upload, X, RefreshCw, AlertCircle, MapPin, ChevronDown } from 'lucide-react'
import { streamJobChat, getJobRecommendation } from '../../utils/aiClient'
import { normalizeRecommendationPricing } from '../../utils/pricing'
import type { ChatMessage, JobDetails, AIRecommendation, MapArea } from '../../types'
import CartWidget from './CartWidget'
import JobForm from './JobForm'
import MapAreaSelector from './MapAreaSelector'

type Segment =
  | { type: 'text'; content: string }
  | { type: 'choices'; question: string; options: string[] }
  | { type: 'cart'; recommendation: AIRecommendation }

function parseQASegments(content: string): Segment[] {
  const lines = content.split('\n')
  const segments: Segment[] = []
  let textLines: string[] = []
  let i = 0
  while (i < lines.length) {
    const qMatch = lines[i].match(/^\[Q:\s*(.*?)\]\s*$/)
    if (qMatch) {
      const text = textLines.join('\n').trim()
      if (text) segments.push({ type: 'text', content: text })
      textLines = []
      const options: string[] = []
      i++
      while (i < lines.length) {
        const aMatch = lines[i].match(/^\[A:\s*(.*?)\]\s*$/)
        if (aMatch) { options.push(aMatch[1]); i++ } else break
      }
      if (options.length) segments.push({ type: 'choices', question: qMatch[1], options })
    } else {
      textLines.push(lines[i])
      i++
    }
  }
  const rem = textLines.join('\n').trim()
  if (rem) segments.push({ type: 'text', content: rem })
  return segments
}

function parseSegments(content: string): Segment[] {
  const cartRegex = /\[CART_START\]([\s\S]*?)\[CART_END\]/g
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = cartRegex.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index).trim()
    if (before) segments.push(...parseQASegments(before))
    try {
      const rec = normalizeRecommendationPricing(JSON.parse(match[1].trim()) as AIRecommendation)
      segments.push({ type: 'cart', recommendation: rec })
    } catch {
      segments.push({ type: 'text', content: match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  const remaining = content.slice(lastIndex).trim()
  if (remaining) segments.push(...parseQASegments(remaining))
  return segments
}

interface Props {
  initialPrompt?: string
}

type Mode = 'chat' | 'form'

export default function JobAssistant({ initialPrompt }: Props) {
  const [mode, setMode] = useState<Mode>('chat')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState(initialPrompt ?? '')
  const [isStreaming, setIsStreaming] = useState(false)
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null)
  const imageFileRef = useRef<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mapArea, setMapArea] = useState<MapArea | undefined>()
  const [mapSectionOpen, setMapSectionOpen] = useState(false)
  /** `${assistantMsgIndex}-${segmentIndex}` → selected option (batch-sent together per assistant message) */
  const [choiceSelections, setChoiceSelections] = useState<Map<string, string>>(new Map())
  /** Assistant message indices whose Q&A batch was already submitted */
  const [lockedQuestionMessages, setLockedQuestionMessages] = useState<Set<number>>(new Set())
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      void sendMessage(initialPrompt).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return
    setError(null)

    const userMsg: ChatMessage = { role: 'user', content: text.trim(), timestamp: new Date() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsStreaming(true)

    // Add empty assistant message for streaming
    const assistantMsg: ChatMessage = { role: 'assistant', content: '', timestamp: new Date() }
    setMessages([...newMessages, assistantMsg])
    scheduleScrollPanelToBottom()

    try {
      await streamJobChat(
        newMessages.map((m) => ({ role: m.role, content: m.content })),
        (chunk) => {
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last.role === 'assistant') {
              updated[updated.length - 1] = { ...last, content: last.content + chunk }
            }
            return updated
          })
        },
        () => {
          setIsStreaming(false)
        },
        { mapArea },
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsStreaming(false)
      throw err
    }
  }

  const handleFormSubmit = async (jobDetails: JobDetails) => {
    setError(null)
    setIsStreaming(true)
    try {
      const rec = await getJobRecommendation(jobDetails)
      setRecommendation(rec)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate recommendation')
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
    const allChosen = choiceBlocks.every(({ si }) => choiceSelections.has(`${msgIndex}-${si}`))
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

  const handleReset = () => {
    setMessages([])
    setInput('')
    setRecommendation(null)
    imageFileRef.current = null
    setImagePreview(null)
    setError(null)
    setChoiceSelections(new Map())
    setLockedQuestionMessages(new Set())
    setMapArea(undefined)
    setMapSectionOpen(false)
  }

  const isEmpty = messages.length === 0 && !recommendation
  const showReset = !isEmpty || mapArea !== undefined

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Mode toggle */}
      <div className="flex items-center gap-2 p-4 border-b border-slate-800">
        <div className="flex items-center bg-slate-800/60 rounded-lg p-0.5 flex-1">
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium transition-all duration-150 ${
              mode === 'chat' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={12} />
            Chat with AI
          </button>
          <button
            onClick={() => setMode('form')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium transition-all duration-150 ${
              mode === 'form' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guided Form
          </button>
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

      {/* Content — scroll stays here; no scrollIntoView (avoids scrolling the whole page on each token) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain"
      >
        {/* Guided form */}
        {mode === 'form' && (
          <div className="p-4">
            <JobForm
              onSubmit={handleFormSubmit}
              isLoading={isStreaming}
              mapArea={mapArea}
              onMapAreaChange={setMapArea}
            />
          </div>
        )}

        {/* Chat mode */}
        {mode === 'chat' && (
          <div className="p-4">
            {isEmpty && !isStreaming && (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Work Zone AI Planner</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                  Describe your job in plain English and I'll recommend the traffic control equipment and quantities you'll likely need.
                </p>
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
                  const visibleText = msg.content
                    .replace(/\[CART_START\][\s\S]*?(\[CART_END\]|$)/g, '')
                    .replace(/\[Q:[^\]]*\]/g, '')
                    .replace(/\[A:[^\]]*\]/g, '')
                    .replace(/\n{3,}/g, '\n\n')
                    .trim()
                  return (
                    <div key={i} className="flex gap-3 animate-slide-up">
                      <div className="w-7 h-7 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles size={12} className="text-brand-400" />
                      </div>
                      <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-sm">
                        <span className="whitespace-pre-wrap">{visibleText}</span>
                        <span className="inline-block w-0.5 h-4 bg-brand-400 ml-0.5 animate-pulse" />
                      </div>
                    </div>
                  )
                }

                // Parse segments for completed assistant messages
                const segments = parseSegments(msg.content)
                const nonCartSegs = segments.filter((s) => s.type !== 'cart')
                const cartSegs = segments.filter((s) => s.type === 'cart') as { type: 'cart'; recommendation: AIRecommendation }[]
                const choiceSegIndices = nonCartSegs
                  .map((seg, si) => ({ seg, si }))
                  .filter((x): x is { seg: Extract<Segment, { type: 'choices' }>; si: number } => x.seg.type === 'choices')
                const allChoicesPicked =
                  choiceSegIndices.length > 0 &&
                  choiceSegIndices.every(({ si }) => choiceSelections.has(`${i}-${si}`))
                const showBatchSubmit =
                  choiceSegIndices.length > 0 && !lockedQuestionMessages.has(i) && !isStreaming

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
                                <div key={si} className="pt-0.5">
                                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{seg.question}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {seg.options.map((opt) => {
                                      const mapKey = `${i}-${si}`
                                      const picked = choiceSelections.get(mapKey)
                                      const isSelected = picked === opt
                                      const locked = lockedQuestionMessages.has(i)
                                      const isDisabled = locked || isStreaming
                                      return (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() => !isDisabled && selectChoiceOption(i, si, opt)}
                                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-150 ${
                                            isSelected
                                              ? 'bg-brand-500/30 border-brand-500/60 text-brand-200 font-medium'
                                              : isDisabled
                                              ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-default'
                                              : 'bg-slate-700/60 hover:bg-brand-500/20 border-slate-600 hover:border-brand-500/50 text-slate-300 hover:text-white cursor-pointer'
                                          }`}
                                        >
                                          {opt}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              ) : null
                            )}
                            {showBatchSubmit && (
                              <div className="pt-2 border-t border-slate-700/60 space-y-2">
                                <p className="text-[11px] text-slate-500">
                                  Pick one option for each question, then send them together.
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
                        <div className="flex-1 min-w-0">
                          <CartWidget key={`cart-${i}-${si}`} recommendation={seg.recommendation} />
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
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl rounded-tl-sm">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Recommendation result (from form mode) */}
        {recommendation && (
          <div className="p-4 border-t border-slate-800">
            <CartWidget key="cart-form" recommendation={recommendation} />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}

      {/* Input area — only show in chat mode */}
      {mode === 'chat' && (
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div>
            <button
              type="button"
              onClick={() => setMapSectionOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-left text-xs font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800/70 transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-400 flex-shrink-0" />
                Work zone on map
                {mapArea ? <span className="text-brand-400/90 font-normal">· drawn</span> : <span className="text-slate-500 font-normal">(optional)</span>}
              </span>
              <ChevronDown size={16} className={`text-slate-500 flex-shrink-0 transition-transform ${mapSectionOpen ? 'rotate-180' : ''}`} />
            </button>
            {mapSectionOpen && (
              <div className="mt-2">
                <MapAreaSelector value={mapArea} onChange={setMapArea} />
              </div>
            )}
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="relative inline-block mb-2">
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

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative bg-slate-800 border border-slate-700 rounded-xl focus-within:border-brand-500/50 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your job or ask a question..."
                rows={1}
                className="w-full px-3 py-3 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none resize-none max-h-32"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void sendMessage(input).catch(() => {})
                  }
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-2 bottom-2.5 p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                title="Upload job site photo"
              >
                <Upload size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => void sendMessage(input).catch(() => {})}
              disabled={!input.trim() || isStreaming}
              className="flex-shrink-0 w-10 h-10 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-brand-500/25"
            >
              <Send size={16} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  )
}
