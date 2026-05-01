import { useState, useRef, useEffect, useCallback } from 'react'
import { Sparkles, X, Minimize2, Send, ChevronRight } from 'lucide-react'
import { streamJobChat } from '../../utils/aiClient'

type Msg = { role: 'user' | 'assistant'; content: string }

const WELCOME = "Describe your job and I'll tell you exactly what equipment you need — quantities included."

export default function AIPlannerWidget() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')

    const userMsg: Msg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setStreaming(true)

    const history = [...messages, userMsg]
    let assistantContent = ''
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      await streamJobChat(
        history,
        (chunk: string) => {
          assistantContent += chunk
          setMessages((prev) => {
            const next = [...prev]
            next[next.length - 1] = { role: 'assistant', content: assistantContent }
            return next
          })
        },
        () => {},
      )
    } catch {
      // swallow errors silently in widget context
    } finally {
      setStreaming(false)
    }
  }, [input, messages, streaming])

  if (dismissed) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {open && (
        <div className="w-[340px] sm:w-[380px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden animate-fade-in"
          style={{ height: '480px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-brand-400" />
              <span className="text-sm font-semibold text-white">AI Job Planner</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 size={13} />
              </button>
              <button
                onClick={() => { setOpen(false); setDismissed(true) }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Subheader */}
          <div className="px-4 py-2 bg-brand-500/8 border-b border-slate-800 flex-shrink-0">
            <p className="text-[11px] text-brand-300 font-medium">
              Stop over-ordering. Get the right list before you buy.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {/* Welcome message */}
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={11} className="text-brand-400" />
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 text-slate-300 text-xs leading-relaxed max-w-[85%]">
                {WELCOME}
              </div>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-brand-400" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand-500 text-white rounded-tr-sm'
                      : 'bg-slate-800 text-slate-300 rounded-tl-sm'
                  }`}
                >
                  {msg.content || (streaming && i === messages.length - 1 ? (
                    <span className="inline-flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  ) : '')}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts (only before any user message) */}
          {messages.filter((m) => m.role === 'user').length === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {[
                'Road paving job, 2 lanes, 400ft',
                'Utility work in a parking lot',
                'Sidewalk closure, pedestrians nearby',
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); setTimeout(() => inputRef.current?.focus(), 0) }}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-400 hover:text-brand-300 hover:border-brand-500/30 text-[10px] rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* After conversation: link to full planner */}
          {messages.filter((m) => m.role === 'user').length > 0 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <a
                href="/planner"
                className="inline-flex items-center gap-1 text-[10px] text-brand-400 hover:text-brand-300 transition-colors"
              >
                Open full site map planner
                <ChevronRight size={10} />
              </a>
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 flex-shrink-0 border-t border-slate-800 pt-2">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                }}
                placeholder="Describe your job..."
                rows={2}
                className="flex-1 resize-none bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
              <button
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

      {/* Trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-2xl shadow-lg shadow-brand-500/30 font-semibold text-sm transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={15} />
          Plan your job free
        </button>
      )}
    </div>
  )
}
