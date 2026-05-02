import { useEffect, useState } from 'react'

export interface ChoiceChipsWithCustomProps {
  question: string
  options: string[]
  picked: string | undefined
  locked: boolean
  disabled: boolean
  onPickPreset: (option: string) => void
  /** Called with trimmed custom text; parent updates selection and may submit. */
  onApplyCustom: (trimmedAnswer: string) => void
  variant?: 'default' | 'compact'
}

export default function ChoiceChipsWithCustom({
  question,
  options,
  picked,
  locked,
  disabled,
  onPickPreset,
  onApplyCustom,
  variant = 'default',
}: ChoiceChipsWithCustomProps) {
  const [customOpen, setCustomOpen] = useState(false)
  const [customDraft, setCustomDraft] = useState('')
  const isCustomSelected = Boolean(picked && !options.includes(picked))

  useEffect(() => {
    if (picked && options.includes(picked)) {
      setCustomOpen(false)
      setCustomDraft('')
    }
  }, [picked, options])

  const isCompact = variant === 'compact'
  const qClass = isCompact
    ? 'text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5'
    : 'text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2'
  const chipClass = (isSelected: boolean) =>
    isCompact
      ? `px-2 py-1 text-[10px] rounded-lg border transition-colors ${
          isSelected
            ? 'bg-brand-500/30 border-brand-500/60 text-brand-200 font-medium'
            : disabled
              ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-default'
              : 'bg-slate-800 hover:bg-brand-500/15 border-slate-600 hover:border-brand-500/40 text-slate-300'
        }`
      : `px-3 py-1.5 text-xs rounded-lg border transition-all duration-150 ${
          isSelected
            ? 'bg-brand-500/30 border-brand-500/60 text-brand-200 font-medium'
            : disabled
              ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-default'
              : 'bg-slate-700/60 hover:bg-brand-500/20 border-slate-600 hover:border-brand-500/50 text-slate-300 hover:text-white cursor-pointer'
        }`

  const openCustom = () => {
    if (disabled || locked) return
    setCustomOpen(true)
    setCustomDraft(isCustomSelected && picked ? picked : '')
  }

  const applyCustom = () => {
    const t = customDraft.trim()
    if (!t) return
    onApplyCustom(t)
    setCustomOpen(false)
  }

  return (
    <div className={isCompact ? '' : 'pt-0.5'}>
      <p className={qClass}>{question}</p>
      <div className={`flex flex-wrap ${isCompact ? 'gap-1.5' : 'gap-2'}`}>
        {options.map((opt) => {
          const isSelected = picked === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                if (disabled || locked) return
                onPickPreset(opt)
              }}
              className={chipClass(isSelected)}
            >
              {opt}
            </button>
          )
        })}
        <button
          type="button"
          onClick={openCustom}
          disabled={disabled || locked}
          className={chipClass(isCustomSelected)}
          title="Answer in your own words"
        >
          Custom…
        </button>
      </div>
      {customOpen && !locked && (
        <div
          className={`mt-2 flex flex-col gap-2 rounded-lg border border-slate-600 bg-slate-900/70 ${
            isCompact ? 'p-2' : 'p-2.5'
          }`}
        >
          <input
            type="text"
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customDraft.trim()) {
                e.preventDefault()
                applyCustom()
              }
            }}
            placeholder="Type your answer…"
            autoFocus
            className={`w-full rounded-md border border-slate-600 bg-slate-950/90 px-2.5 py-2 text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/25 ${
              isCompact ? 'text-[11px]' : 'text-sm'
            }`}
          />
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setCustomOpen(false)
                setCustomDraft('')
              }}
              className={`rounded-md border border-slate-600 px-2.5 py-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 ${
                isCompact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => applyCustom()}
              disabled={!customDraft.trim()}
              className={`rounded-md bg-brand-500 px-2.5 py-1.5 font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 ${
                isCompact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              Use answer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
