/** One-time service fees for non-members (not multiplied by rental days). */
export const NON_MEMBER_DELIVERY_FEE_USD = 150
export const NON_MEMBER_PICKUP_FEE_USD = 150

export function getDeliveryPickupFees(isMember: boolean): {
  delivery: number
  pickup: number
  /** Sum of delivery + pickup (0 for members). */
  combined: number
} {
  if (isMember) {
    return { delivery: 0, pickup: 0, combined: 0 }
  }
  return {
    delivery: NON_MEMBER_DELIVERY_FEE_USD,
    pickup: NON_MEMBER_PICKUP_FEE_USD,
    combined: NON_MEMBER_DELIVERY_FEE_USD + NON_MEMBER_PICKUP_FEE_USD,
  }
}
