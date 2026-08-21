import { getSupabaseService, isSupabaseConfigured } from './supabaseServer.js'

export type SupplierSignupInput = {
  name: string
  company: string
  email: string
  phone?: string
  website?: string
  territory: string
  products?: string[]
  otherProducts?: string
  monthlyVolume?: string
  source?: string
}

export async function insertSupplierSignup(input: SupplierSignupInput): Promise<void> {
  if (!isSupabaseConfigured()) return
  const sb = getSupabaseService()
  const { error } = await sb.from('supplier_signups').insert({
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone || null,
    website: input.website || null,
    territory: input.territory,
    products: input.products?.length ? input.products.join(', ') : null,
    other_products: input.otherProducts || null,
    monthly_volume: input.monthlyVolume || null,
    source: input.source || null,
  })
  if (error) {
    throw new Error(error.message)
  }
}
