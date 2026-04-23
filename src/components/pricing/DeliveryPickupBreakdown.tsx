type Variant = 'default' | 'compact' | 'inline'

type Props = {
  isMember?: boolean
  checkoutMembershipPreview?: boolean
  variant?: Variant
  className?: string
}

export default function DeliveryPickupBreakdown({ variant = 'default', className = '' }: Props) {
  const isCompact = variant === 'compact'
  const isInline = variant === 'inline'

  if (isInline) {
    return (
      <p className={`text-[10px] text-slate-500 leading-snug ${className}`}>
        Shipping: <span className="text-emerald-400/90">Free</span>
      </p>
    )
  }

  const row = isCompact ? 'text-[10px]' : 'text-xs'
  const muted = isCompact ? 'text-slate-500' : 'text-slate-400'

  return (
    <div className={`${className}`}>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>Shipping</span>
        <span className="text-emerald-400/90 font-medium">Free</span>
      </div>
    </div>
  )
}
