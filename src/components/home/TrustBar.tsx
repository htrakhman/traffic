import { Shield, Clock, Headphones, MapPin } from 'lucide-react'

const items = [
  {
    icon: Shield,
    title: 'MUTCD Compliant Inventory',
    description: 'All equipment meets federal and state traffic-control standards.',
  },
  {
    icon: Clock,
    title: 'Same-Day Delivery',
    description: 'Order by noon for same-day delivery to your job site.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Real traffic-control experts available by phone during business hours.',
  },
  {
    icon: MapPin,
    title: 'Local & Flexible',
    description: 'Pickup, delivery, and job-site drop and swap available.',
  },
]

export default function TrustBar() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
