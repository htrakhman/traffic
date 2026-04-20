import { getDeliveryPickupFees } from '../../constants/deliveryPickup'

type Variant = 'default' | 'compact' | 'inline'

type Props = {
  isMember: boolean
  /** Checkout: user checked “join membership” — show waived delivery/pickup like a member, with copy for not-yet-subscribed. */
  checkoutMembershipPreview?: boolean
  variant?: Variant
  className?: string
}

/**
 * Delivery & pickup fee lines for quote/cart/product summaries.
 * Members: $0 with explanatory copy. Guests: $150 + $150 one-time.
 */
function MemberFeeValue({
  guestAmount,
  isCompact,
  label,
  benefitPhrase,
}: {
  guestAmount: number
  isCompact: boolean
  label: 'delivery' | 'pickup'
  benefitPhrase: string
}) {
  const strikeSize = isCompact ? 'text-[9px]' : 'text-xs'
  const freeSize = isCompact ? 'text-[10px]' : 'text-sm'
  const membershipHint = isCompact ? 'text-[9px]' : 'text-[11px]'
  return (
    <span className="tabular-nums flex flex-col items-end gap-0.5 text-right">
      <span className="flex items-center justify-end gap-1.5 flex-wrap">
        <span className={`${strikeSize} font-normal text-slate-500 line-through decoration-slate-500`}>
          ${guestAmount}
        </span>
        <span className={`${freeSize} font-semibold text-emerald-400 tabular-nums`}>Free</span>
        <span className={`${membershipHint} font-medium text-emerald-400/85`}>{benefitPhrase}</span>
      </span>
      <span className="sr-only">
        {label === 'delivery' ? 'Delivery' : 'Pickup'}: standard fee waived for members, no charge
      </span>
    </span>
  )
}

/** Guest estimate: show standard fee struck through + member benefit; actual fee still applies to this quote. */
function GuestFeeWithMembershipHint({
  guestAmount,
  isCompact,
  label,
  strongClass,
}: {
  guestAmount: number
  isCompact: boolean
  label: 'delivery' | 'pickup'
  strongClass: string
}) {
  const strikeSize = isCompact ? 'text-[9px]' : 'text-xs'
  const hintSize = isCompact ? 'text-[9px]' : 'text-[11px]'
  return (
    <span className="tabular-nums flex flex-col items-end gap-0.5 text-right">
      <span className="flex items-center justify-end gap-1.5 flex-wrap">
        <span className={`${strikeSize} font-normal text-slate-500 line-through decoration-slate-500`}>
          ${guestAmount}
        </span>
        <span className={`${isCompact ? 'text-[10px]' : 'text-sm'} font-semibold text-emerald-400 tabular-nums`}>
          Free
        </span>
        <span className={`${hintSize} font-medium text-emerald-400/85`}>with membership</span>
      </span>
      <span className={`${hintSize} text-slate-500`}>
        This estimate:{' '}
        <span className={`tabular-nums ${strongClass}`}>${guestAmount}</span>
      </span>
      <span className="sr-only">
        {label === 'delivery' ? 'Delivery' : 'Pickup'}: ${guestAmount} included on this guest estimate; waived for members
      </span>
    </span>
  )
}

export default function DeliveryPickupBreakdown({
  isMember,
  checkoutMembershipPreview = false,
  variant = 'default',
  className = '',
}: Props) {
  const guestFees = getDeliveryPickupFees(false)
  const isCompact = variant === 'compact'
  const isInline = variant === 'inline'
  const row = isCompact ? 'text-[10px]' : 'text-xs'
  const muted = isCompact ? 'text-slate-500' : 'text-slate-400'
  const strong = isCompact ? 'text-[10px] font-semibold text-slate-200' : 'text-sm font-medium text-slate-200'

  const waivedFeesDisplay = isMember || checkoutMembershipPreview
  const benefitPhrase = checkoutMembershipPreview && !isMember ? 'with $150/mo membership' : 'with membership'
  const labelSuffix =
    checkoutMembershipPreview && !isMember ? (
      <span className="text-emerald-400/80"> · waived if you join</span>
    ) : isMember ? (
      <span className="text-emerald-400/80"> · membership</span>
    ) : null

  const deliveryGuestText = `$${guestFees.delivery}`
  const pickupGuestText = `$${guestFees.pickup}`

  if (isInline) {
    return (
      <p className={`text-[10px] text-slate-500 leading-snug ${className}`}>
        {waivedFeesDisplay ? (
          <>
            <span className="line-through decoration-slate-500 text-slate-500">
              ${guestFees.delivery} delivery + ${guestFees.pickup} pickup
            </span>{' '}
            <span className="text-emerald-400/90">waived</span> — included with membership (one-time fees, not per
            day).
          </>
        ) : (
          <>
            <span className="line-through decoration-slate-500 text-slate-500">
              {deliveryGuestText} delivery + {pickupGuestText} pickup
            </span>{' '}
            <span className="text-emerald-400/90">Free with membership</span>
            <span className="text-slate-500">
              {' '}
              — this estimate includes {deliveryGuestText} + {pickupGuestText} (one-time, not per day).
            </span>
          </>
        )}
      </p>
    )
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>
          Delivery
          {labelSuffix}
        </span>
        {waivedFeesDisplay ? (
          <MemberFeeValue
            guestAmount={guestFees.delivery}
            isCompact={isCompact}
            label="delivery"
            benefitPhrase={benefitPhrase}
          />
        ) : (
          <GuestFeeWithMembershipHint
            guestAmount={guestFees.delivery}
            isCompact={isCompact}
            label="delivery"
            strongClass={strong}
          />
        )}
      </div>
      <div className={`flex justify-between gap-3 ${row}`}>
        <span className={muted}>
          Pickup
          {labelSuffix}
        </span>
        {waivedFeesDisplay ? (
          <MemberFeeValue
            guestAmount={guestFees.pickup}
            isCompact={isCompact}
            label="pickup"
            benefitPhrase={benefitPhrase}
          />
        ) : (
          <GuestFeeWithMembershipHint
            guestAmount={guestFees.pickup}
            isCompact={isCompact}
            label="pickup"
            strongClass={strong}
          />
        )}
      </div>
      {isMember && (
        <p className={`${isCompact ? 'text-[9px]' : 'text-[11px]'} text-emerald-400/90 leading-snug`}>
          Standard one-time delivery & pickup fees are waived with your membership ($0).
        </p>
      )}
      {checkoutMembershipPreview && !isMember && (
        <p className={`${isCompact ? 'text-[9px]' : 'text-[11px]'} text-emerald-400/90 leading-snug`}>
          Estimate shows $0 delivery & pickup after you complete the $150/month subscription on Stripe. Membership is
          billed monthly; rental charges are still arranged separately.
        </p>
      )}
      {!waivedFeesDisplay && (
        <p className={`${isCompact ? 'text-[9px]' : 'text-[11px]'} ${muted} leading-snug`}>
          One-time fees; not multiplied by rental days. Active members pay $0 for delivery & pickup (waived).
        </p>
      )}
    </div>
  )
}
