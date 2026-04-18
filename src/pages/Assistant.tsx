import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, AlertCircle } from 'lucide-react'
import JobAssistant from '../components/ai/JobAssistant'

export default function Assistant() {
  const [searchParams] = useSearchParams()
  const initialPrompt = searchParams.get('q') ?? undefined
  const [plannerMapBoost, setPlannerMapBoost] = useState(false)

  return (
    <main className="min-h-screen pt-20 bg-slate-950">
      {/* Page header */}
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} className="text-brand-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Work Zone Planner</h1>
              <p className="text-slate-400 mt-1 max-w-xl leading-relaxed">
                Describe your job and get a customized traffic control equipment recommendation — quantities, setup notes, and a direct path to requesting a quote.
              </p>
            </div>
          </div>
          {/* Disclaimer banner */}
          <div className="flex items-start gap-2 mt-6 p-3.5 bg-amber-500/5 border border-amber-500/15 rounded-xl max-w-2xl">
            <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/60 leading-relaxed">
              Recommendations are planning guidance to help estimate rental needs. Final traffic control requirements depend on project conditions and applicable standards. A certified Traffic Control Supervisor should verify your plan before work begins.
            </p>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
          {/* Main assistant panel — capped height so chat scrolls inside the card, not the whole page */}
          <div className="lg:col-span-7 min-h-0 flex flex-col">
            <div
              className={`card flex flex-col overflow-hidden transition-[height,min-height] duration-200 ease-out ${
                plannerMapBoost
                  ? 'min-h-[520px] h-[min(90dvh,calc(100dvh-8rem))]'
                  : 'min-h-[480px] h-[min(720px,calc(100dvh-14rem))]'
              }`}
            >
              <JobAssistant initialPrompt={initialPrompt} onMapExpandedLayoutChange={setPlannerMapBoost} />
            </div>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-5 space-y-5">
            {/* What the AI considers */}
            <div className="card p-5">
              <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-brand-500/10 border border-brand-500/20 rounded flex items-center justify-center text-brand-400 text-[10px] font-bold">AI</span>
                What the planner considers
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  ['Road type & speed limit', 'Determines cone sizes, sign distances, and whether drums are needed'],
                  ['Lane impact', 'Shoulder-only vs. full lane closure changes the setup dramatically'],
                  ['Day vs. night work', 'Night work adds retroreflective drums, lights, and higher quantities'],
                  ['Job duration', 'Drives the right rate tier (daily vs. weekly vs. monthly)'],
                  ['Pedestrian exposure', 'High-ped areas may need additional channelization or barriers'],
                  ['Crew count', 'Multiple crews may need separate setups at different locations'],
                  ['Existing equipment', 'Tell the AI what you own so it only recommends what you need to rent'],
                  [
                    'Drawn work zone (map)',
                    'Optional polygon on the map gives the AI area and perimeter to tune cone counts, tapers, and barriers',
                  ],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">·</span>
                    <div>
                      <span className="text-slate-300 font-medium">{title}:</span>
                      <span className="text-slate-500 ml-1">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common job types */}
            <div className="card p-5">
              <h3 className="font-semibold text-white text-sm mb-3">Common job types</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '🔧', label: 'Utility Work' },
                  { icon: '🛣️', label: 'Paving / Asphalt' },
                  { icon: '🌳', label: 'Tree & Vegetation' },
                  { icon: '⛏️', label: 'Excavation' },
                  { icon: '🏗️', label: 'Bridge / Structure' },
                  { icon: '⚡', label: 'Signal / Electrical' },
                ].map((job) => (
                  <div key={job.label} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm text-slate-400">
                    <span>{job.icon}</span>
                    <span>{job.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="card p-5 bg-slate-900/50">
              <h3 className="font-semibold text-white text-sm mb-2">Need expert help?</h3>
              <p className="text-xs text-slate-400 mb-4">
                Our team includes experienced traffic control professionals who can help you plan your work zone.
              </p>
              <a href="tel:+18005551234" className="btn-secondary w-full justify-center text-sm py-2.5">
                Call 1-800-555-1234
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
