import { getSupabaseService, isSupabaseConfigured } from './supabaseServer.js'

export type BuyerLeadInput = {
  name: string
  email: string
  phone?: string
  organization?: string
  productCategory: string
  quantity?: string
  deliveryCity?: string
  deliveryState: string
  timeline?: string
  notes?: string
  landingPage?: string
}

export async function insertBuyerLead(input: BuyerLeadInput): Promise<void> {
  if (!isSupabaseConfigured()) return
  const sb = getSupabaseService()
  const { error } = await sb.from('buyer_leads').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    organization: input.organization || null,
    product_category: input.productCategory,
    quantity: input.quantity || null,
    delivery_city: input.deliveryCity || null,
    delivery_state: input.deliveryState,
    timeline: input.timeline || null,
    notes: input.notes || null,
    landing_page: input.landingPage || null,
  })
  if (error) {
    throw new Error(error.message)
  }
}
