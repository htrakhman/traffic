type Variant = 'default' | 'compact' | 'inline'

type Props = {
  isMember?: boolean
  checkoutMembershipPreview?: boolean
  variant?: Variant
  className?: string
}

// Delivery/pickup is hidden — platform is drop-ship only. We show a simple
// "Shipping: To be determined" line in place of the previous breakdown so
// every consumer (Cart, Checkout, Product, Quote) stays consistent.
export default function DeliveryPickupBreakdown({ variant = 'default', className = '' }: Props) {
  const isCompact = variant === 'compact'
  const isInline = variant === 'inline'

  if (isInline) {
    return (
      <p className={`text-[10px] text-slate-500 leading-snug ${className}`}>
        Shipping: <span className="text-slate-300">To be determined</span>
      </p>
    )
  }

  const row = isCompact ? 'text-[10px]' : 'text-xs'
  const muted = isCompact ? 'text-slate-500' : 'text-slate-400'

  return (
    <div className={`${className}`}>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>Shipping</span>
        <span className="text-slate-300">To be determined</span>
      </div>
    </div>
  )
}
