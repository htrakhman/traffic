import { ShieldCheck, Zap, Layers, Hammer, Eye, Wind, Box, Wrench } from 'lucide-react'
import type { Product } from '../../types'

const ICONS = [ShieldCheck, Zap, Layers, Hammer, Eye, Wind, Box, Wrench]

export default function HighlightsBlock({ product }: { product: Product }) {
  const features = product.features.slice(0, 6)
  if (features.length === 0) return null
  return (
    <section aria-labelledby="highlights-heading" className="mt-12">
      <h2 id="highlights-heading" className="text-xl font-bold text-white mb-4">
        Product Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((f, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <div
              key={f}
              className="card p-4 flex items-start gap-3 border border-slate-700/80"
            >
              <span className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
                <Icon size={16} />
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">{f}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
