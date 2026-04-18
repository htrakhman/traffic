import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle, Info, ShoppingCart, ExternalLink } from 'lucide-react'
import type { AIRecommendation } from '../../types'

interface Props {
  recommendation: AIRecommendation
}

const priorityConfig = {
  required: { color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20', label: 'Required' },
  recommended: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Recommended' },
  optional: { color: 'text-slate-400', bg: 'bg-slate-700/50 border-slate-600/50', label: 'Optional' },
}

export default function RecommendationPanel({ recommendation }: Props) {
  const totalCost = recommendation.totalDailyRate * recommendation.estimatedDurationDays

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 bg-brand-500/5 border border-brand-500/20 rounded-xl">
        <CheckCircle size={18} className="text-brand-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-white text-sm mb-1">Equipment Recommendation Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{recommendation.summary}</p>
        </div>
      </div>

      {/* Cost estimate */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Daily Rate', value: `$${recommendation.totalDailyRate.toFixed(0)}/day` },
          { label: 'Est. Duration', value: `${recommendation.estimatedDurationDays} days` },
          { label: 'Est. Total', value: `~$${totalCost.toFixed(0)}` },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-800/60 rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Items list */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Equipment</h4>
        {recommendation.items.map((item, i) => {
          const pc = priorityConfig[item.priority]
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${pc.bg}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-white text-sm">{item.productName}</span>
                  <span className={`badge border ${pc.bg} ${pc.color} text-[10px]`}>{pc.label}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.rationale}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-white">×{item.quantity}</div>
                <div className="text-xs text-slate-500">${(item.dailyRate * item.quantity).toFixed(2)}/day</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Setup notes */}
      {recommendation.setupNotes.length > 0 && (
        <div className="p-3 bg-slate-800/40 border border-slate-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info size={12} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-300">Setup Notes</span>
          </div>
          <ul className="space-y-1.5">
            {recommendation.setupNotes.map((note, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="text-slate-600 mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
        <AlertCircle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-200/60 leading-relaxed">{recommendation.disclaimer}</p>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <Link
          to="/quote"
          state={{ recommendation }}
          className="btn-primary justify-center py-3"
        >
          <ShoppingCart size={16} />
          Request Quote for This Equipment
        </Link>
        <Link to="/browse" className="btn-secondary justify-center text-sm py-2.5">
          Browse & Customize
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  )
}
