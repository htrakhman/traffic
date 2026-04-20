import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Sparkles, Search, ExternalLink } from 'lucide-react'
import JobAssistant from '../ai/JobAssistant'

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'ai' | 'browse'>('ai')
  const [plannerMapBoost, setPlannerMapBoost] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const plannerQuery = searchParams.get('q')?.trim() || undefined

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-10">
      <div className="absolute inset-0 bg-grid-slate opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline — single line */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Rent the gear.{' '}
          <span className="gradient-text">Plan the job.</span>
        </h1>

        <p className="text-slate-400 max-w-lg mx-auto mb-6 text-sm sm:text-base leading-relaxed">
          Traffic-control equipment rental for contractors — with an AI assistant that tells you exactly what you need.
        </p>

        {/* Tabs */}
        <div className="inline-flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'ai' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={12} />
            AI Job Planner
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'browse' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search size={12} />
            Browse
          </button>
        </div>

        {/* AI panel — full chat + map on the homepage */}
        {activeTab === 'ai' && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in text-left">
            <div
              className={`card flex flex-col overflow-hidden shadow-2xl shadow-black/40 transition-[height,min-height] duration-200 ease-out ${
                plannerMapBoost
                  ? 'min-h-[460px] h-[min(90dvh,calc(100dvh-4.5rem))]'
                  : 'min-h-[420px] h-[min(680px,calc(100dvh-12rem))]'
              }`}
            >
              <JobAssistant
                key={plannerQuery ?? 'home'}
                initialPrompt={plannerQuery}
                embedded
                onMapExpandedLayoutChange={setPlannerMapBoost}
              />
            </div>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
              <Link
                to={plannerQuery ? `/assistant?q=${encodeURIComponent(plannerQuery)}` : '/assistant'}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Open full planner layout
                <ExternalLink size={12} className="opacity-80" />
              </Link>
              {plannerQuery && (
                <>
                  <span className="hidden sm:inline text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Clear topic from URL
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Browse panel */}
        {activeTab === 'browse' && (
          <div className="max-w-xl mx-auto animate-fade-in">
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search cones, signs, arrow boards, barricades..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500/50 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/browse?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`)
                }}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {(
                [
                  { label: 'Traffic Cones', category: 'cones-drums' },
                  { label: 'Arrow Boards', category: 'arrow-boards' },
                  { label: 'Roll-Up Signs', category: 'signs-sign-stands' },
                  { label: 'Barricades', category: 'barricades-barriers' },
                  { label: 'Message Boards', category: 'message-boards' },
                  { label: 'Warning Lights', category: 'safety-lighting' },
                ] as const
              ).map(({ label, category }) => (
                <Link
                  key={category}
                  to={`/browse?category=${encodeURIComponent(category)}`}
                  className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/30 text-slate-400 hover:text-brand-300 text-xs rounded-full transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
