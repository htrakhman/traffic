import { Link } from 'react-router-dom'
import { Sparkles, Package, Truck, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Describe your job',
    description:
      'Tell our AI about the job — road type, speed limit, lane impact, duration, and crew size. Or just write a quick description in plain English.',
    color: 'brand',
  },
  {
    number: '02',
    icon: Package,
    title: 'Get a recommendation',
    description:
      'The AI recommends equipment types and estimated quantities based on your job details. You can adjust before you book.',
    color: 'amber',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Place your order',
    description:
      'Pricing is already on the site. Review your list, send job details, and we confirm availability and final paperwork—typically within a few hours.',
    color: 'green',
  },
  {
    number: '04',
    icon: Truck,
    title: 'We deliver and pick up',
    description:
      "Equipment is delivered to your job site on your start date and picked up when you're done. No trips to a yard, no loading.",
    color: 'blue',
  },
]

const colorMap = {
  brand: {
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/20',
    icon: 'text-brand-400',
    num: 'text-brand-500',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    num: 'text-amber-500',
  },
  green: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    num: 'text-emerald-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    num: 'text-blue-500',
  },
}

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            From job description to delivered equipment in a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const c = colorMap[step.color as keyof typeof colorMap]
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[-50%] h-px bg-gradient-to-r from-slate-700 to-transparent z-0" />
                )}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 ${c.bg} border ${c.border} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon size={22} className={c.icon} />
                    </div>
                    <span className={`text-2xl font-black ${c.num} opacity-40`}>{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/assistant" className="btn-primary">
            <Sparkles size={16} />
            Start with the AI Planner
          </Link>
          <p className="text-xs text-slate-500 mt-3">No account required to get a recommendation</p>
        </div>
      </div>
    </section>
  )
}
