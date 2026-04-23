/** One-time service fees for non-members (not multiplied by rental days). */
export const NON_MEMBER_DELIVERY_FEE_USD = 150
export const NON_MEMBER_PICKUP_FEE_USD = 150

// Shipping/delivery/pickup is currently hidden — platform is drop-ship only.
// Always return $0 so cart/checkout totals are rental-only. Restore original
// isMember-aware logic when re-enabling delivery/pickup + membership.
export function getDeliveryPickupFees(_isMember: boolean): {
  delivery: number
  pickup: number
  /** Sum of delivery + pickup (0 while delivery/pickup is hidden). */
  combined: number
} {
  return { delivery: 0, pickup: 0, combined: 0 }
}
