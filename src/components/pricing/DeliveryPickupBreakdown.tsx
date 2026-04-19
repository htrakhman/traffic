import { getDeliveryPickupFees } from '../../constants/deliveryPickup'

type Variant = 'default' | 'compact' | 'inline'

type Props = {
  isMember: boolean
  variant?: Variant
  className?: string
}

/**
 * Delivery & pickup fee lines for quote/cart/product summaries.
 * Members: $0 with explanatory copy. Guests: $150 + $150 one-time.
 */
export default function DeliveryPickupBreakdown({ isMember, variant = 'default', className = '' }: Props) {
  const { delivery, pickup } = getDeliveryPickupFees(isMember)
  const isCompact = variant === 'compact'
  const isInline = variant === 'inline'
  const row = isCompact ? 'text-[10px]' : 'text-xs'
  const muted = isCompact ? 'text-slate-500' : 'text-slate-400'
  const strong = isCompact ? 'text-[10px] font-semibold text-slate-200' : 'text-sm font-medium text-slate-200'

  const deliveryText = isMember ? 'Free' : `$${delivery}`
  const pickupText = isMember ? 'Free' : `$${pickup}`

  if (isInline) {
    return (
      <p className={`text-[10px] text-slate-500 leading-snug ${className}`}>
        {isMember ? (
          <>Delivery & pickup included at no charge with membership.</>
        ) : (
          <>
            Delivery {deliveryText} + pickup {pickupText} (one-time, not per day), in addition to rental.
          </>
        )}
      </p>
    )
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>Delivery {isMember ? '(member)' : ''}</span>
        <span className={`tabular-nums ${strong}`}>{deliveryText}</span>
      </div>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>Pickup {isMember ? '(member)' : ''}</span>
        <span className={`tabular-nums ${strong}`}>{pickupText}</span>
      </div>
      {isMember && (
        <p className={`${isCompact ? 'text-[9px]' : 'text-[11px]'} text-emerald-400/90 leading-snug`}>
          Delivery and pickup are free with your membership.
        </p>
      )}
      {!isMember && (
        <p className={`${isCompact ? 'text-[9px]' : 'text-[11px]'} ${muted} leading-snug`}>
          One-time delivery and pickup fees; not multiplied by rental days.
        </p>
      )}
    </div>
  )
}
