import { Truck } from 'lucide-react'

export default function DeliveryTrustBar() {
  return (
    <div className="bg-brand-500 text-white text-xs font-semibold text-center py-2 px-4 flex items-center justify-center gap-2">
      <Truck size={13} className="flex-shrink-0" />
      Free Delivery on Every Order — No Minimum Order Required
    </div>
  )
}
