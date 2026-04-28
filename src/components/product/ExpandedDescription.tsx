import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Product } from '../../types'

export default function ExpandedDescription({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const long = product.longDescription
  if (!long) return null

  // Synthesize "From the manufacturer" extra paragraphs from features + tags + supplier
  const featureLines = product.features.slice(0, 4)
  const tagLine = product.tags.slice(0, 5).join(' · ')

  return (
    <section aria-labelledby="about-heading" className="mt-12">
      <h2 id="about-heading" className="text-xl font-bold text-white mb-4">
        About this {product.name}
      </h2>
      <div className="card p-6 border-slate-700/80">
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{long}</p>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? 'max-h-[1200px]' : 'max-h-0'
          }`}
        >
          <h3 className="text-sm font-semibold text-white mt-4 mb-2 uppercase tracking-wider">
            From the manufacturer
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Built by {product.supplier}, this {product.name.toLowerCase()} is engineered for the
            real-world demands of professional traffic control crews. It meets the durability,
            visibility, and field-serviceability standards that DOT contractors and municipal
            DPWs expect on bid-spec jobs. Every unit is shipped factory-new with full supplier
            documentation available on request for submittal packages.
          </p>

          {featureLines.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                What sets it apart
              </h3>
              <ul className="text-sm text-slate-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
                {featureLines.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {product.compliance && product.compliance.length > 0 && (
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              <span className="text-white font-medium">Standards & compliance:</span>{' '}
              {product.compliance.join(', ')}. Suitable for use on agency-spec work zones where
              inspector sign-off requires documented compliance.
            </p>
          )}

          {tagLine && (
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="text-slate-400 font-medium">Common applications:</span> {tagLine}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300"
        >
          {open ? 'Show less' : 'Read full product description'}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </section>
  )
}
