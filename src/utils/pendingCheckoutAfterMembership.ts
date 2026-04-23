const STORAGE_KEY = 'traffic-pending-checkout-after-membership'

export type PendingCheckoutNotifyPayload = {
  name: string
  email: string
  phone: string
  company: string
  jobSite: string
  notes: string
  deliveryNeeded: boolean
  lines: Array<{
    productId: string
    productName: string
    sku?: string
    supplierSku?: string
    quantity: number
    unitPrice: number
    lineTotal: number
  }>
  totals: {
    merchandiseSubtotal: number
    deliveryPickupCombined: number
    grandTotal: number
  }
  membershipSubscribedAtCheckout: boolean
}

export function savePendingCheckoutAfterMembership(payload: PendingCheckoutNotifyPayload): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* ignore quota / private mode */
  }
}

export function readPendingCheckoutAfterMembership(): PendingCheckoutNotifyPayload | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PendingCheckoutNotifyPayload
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.lines)) return null
    return parsed
  } catch {
    return null
  }
}

export function clearPendingCheckoutAfterMembership(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

const SUCCESS_CONTACT_KEY = 'traffic-checkout-success-contact'

export function setCheckoutSuccessContact(name: string, email: string): void {
  try {
    sessionStorage.setItem(SUCCESS_CONTACT_KEY, JSON.stringify({ name, email }))
  } catch {
    /* ignore */
  }
}

export function readCheckoutSuccessContact(): { name: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem(SUCCESS_CONTACT_KEY)
    if (!raw) return null
    const o = JSON.parse(raw) as { name?: unknown; email?: unknown }
    if (typeof o.name !== 'string' || typeof o.email !== 'string') return null
    return { name: o.name, email: o.email }
  } catch {
    return null
  }
}

export function clearCheckoutSuccessContact(): void {
  try {
    sessionStorage.removeItem(SUCCESS_CONTACT_KEY)
  } catch {
    /* ignore */
  }
}
