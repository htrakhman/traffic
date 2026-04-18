import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Search, Zap } from 'lucide-react'

const quickPrompts = [
  'Paving crew, one lane closed, 45 mph road',
  'Utility trench, arterial, day + night work',
  'Tree crew on residential street shoulder',
  'Full closure, bridge repair, 2 weeks',
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'ai' | 'browse'>('ai')
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      navigate(`/assistant?q=${encodeURIComponent(prompt.trim())}`)
    } else {
      navigate('/assistant')
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-10">
      <div className="absolute inset-0 bg-grid-slate opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-4">
          <Zap size={10} className="fill-current" />
          AI-Powered Work Zone Planning
        </div>

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

        {/* AI panel */}
        {activeTab === 'ai' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <form onSubmit={handleAISubmit} className="mb-3">
              <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/40 overflow-hidden focus-within:border-brand-500/50 transition-all duration-300">
                <div className="flex items-start gap-2.5 px-4 pt-3 pb-2">
                  <Sparkles size={14} className="text-brand-400 mt-0.5 flex-shrink-0" />
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your job... e.g. 'Utility crew, water main repair, 35 mph arterial, one lane closed, 3 days'"
                    className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm leading-snug resize-none outline-none min-h-[52px] max-h-[52px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAISubmit(e) }
                    }}
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800">
                  <span className="text-xs text-slate-600">Enter to plan</span>
                  <button type="submit" className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-brand-500/25">
                    Plan my job <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </form>
            <div className="flex flex-wrap justify-center gap-1.5">
              {quickPrompts.map((qp) => (
                <button
                  key={qp}
                  onClick={() => navigate(`/assistant?q=${encodeURIComponent(qp)}`)}
                  className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 text-xs rounded-full transition-all"
                >
                  {qp}
                </button>
              ))}
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
              {['Traffic Cones', 'Arrow Boards', 'Roll-Up Signs', 'Barricades', 'Message Boards', 'Warning Lights'].map((cat) => (
                <Link key={cat} to={`/browse?q=${encodeURIComponent(cat)}`} className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/30 text-slate-400 hover:text-brand-300 text-xs rounded-full transition-all">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
