import { randomUUID } from 'node:crypto'
import type { DbProduct, DbOrder, DbOrderLineItem } from './dropshipTypes.js'
import { enrichProduct, landedCost } from './productMetrics.js'
import { getSupabaseService, isSupabaseConfigured } from './supabaseServer.js'
import { CATALOG_SEED_PRODUCTS } from '../../src/data/catalogSeed.js'

export function getSeedProducts(): DbProduct[] {
  return CATALOG_SEED_PRODUCTS.map((p) => ({ ...p, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }))
}

export async function listPublicProducts(): Promise<DbProduct[]> {
  if (!isSupabaseConfigured()) {
    return getSeedProducts().filter((p) => p.status === 'active')
  }
  const sb = getSupabaseService()
  const { data, error } = await sb
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('name')
  if (error) throw new Error(error.message)
  if (!data?.length) return getSeedProducts().filter((p) => p.status === 'active')
  return data as DbProduct[]
}

export async function listAllProductsAdmin(): Promise<ReturnType<typeof enrichProduct>[]> {
  if (!isSupabaseConfigured()) {
    return getSeedProducts().map(enrichProduct)
  }
  const sb = getSupabaseService()
  const { data, error } = await sb.from('products').select('*').order('name')
  if (error) throw new Error(error.message)
  const rows = (data?.length ? data : getSeedProducts()) as DbProduct[]
  return rows.map(enrichProduct)
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  const all = await listPublicProducts()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getProductById(id: string): Promise<DbProduct | null> {
  if (isSupabaseConfigured()) {
    const sb = getSupabaseService()
    const { data } = await sb.from('products').select('*').eq('id', id).maybeSingle()
    if (data) return data as DbProduct
  }
  return getSeedProducts().find((p) => p.id === id) ?? null
}

export async function getProductByIdAdmin(id: string): Promise<ReturnType<typeof enrichProduct> | null> {
  const all = await listAllProductsAdmin()
  return all.find((p) => p.id === id) ?? null
}

export async function upsertProduct(row: Partial<DbProduct> & { sku: string; slug: string; name: string }): Promise<DbProduct> {
  const sb = getSupabaseService()
  const { data, error } = await sb.from('products').upsert(row, { onConflict: 'sku' }).select('*').single()
  if (error) throw new Error(error.message)
  return data as DbProduct
}

export function generateOrderNumber(): string {
  const d = new Date()
  const y = d.getUTCFullYear().toString().slice(-2)
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `TCS-${y}${m}${day}-${rand}`
}

export type CreateOrderInput = {
  customer_name: string
  customer_email: string
  customer_phone?: string
  company?: string
  job_site?: string
  notes?: string
  delivery_needed: boolean
  merchandise_subtotal: number
  delivery_fee: number
  grand_total: number
  membership_at_checkout?: boolean
  lines: {
    product_id: string
    quantity: number
    unit_price: number
    line_total: number
  }[]
}

export async function createOrderWithSnapshots(input: CreateOrderInput): Promise<{ order: DbOrder; lines: DbOrderLineItem[] }> {
  const orderNumber = generateOrderNumber()
  const orderRow = {
    order_number: orderNumber,
    customer_name: input.customer_name,
    customer_email: input.customer_email,
    customer_phone: input.customer_phone ?? null,
    company: input.company ?? null,
    job_site: input.job_site ?? null,
    notes: input.notes ?? null,
    delivery_needed: input.delivery_needed,
    merchandise_subtotal: input.merchandise_subtotal,
    delivery_fee: input.delivery_fee,
    grand_total: input.grand_total,
    membership_at_checkout: input.membership_at_checkout ?? false,
  }

  const lineRows: Omit<DbOrderLineItem, 'id' | 'created_at' | 'updated_at'>[] = []

  for (const line of input.lines) {
    const product = await getProductById(line.product_id)
    if (!product) throw new Error(`Product not found: ${line.product_id}`)
    const lc = landedCost(product.primary_supplier_unit_cost, product.primary_supplier_shipping_estimate)
    const profit = lc != null ? line.line_total - lc * line.quantity : null
    const margin =
      lc != null && line.line_total > 0
        ? Math.round(((line.line_total - lc * line.quantity) / line.line_total) * 10000) / 100
        : null

    lineRows.push({
      order_id: '',
      product_id: product.id,
      product_purchased: product.name,
      quantity_purchased: line.quantity,
      customer_paid_per_unit: line.unit_price,
      customer_paid_total: line.line_total,
      catalog_sku: product.sku,
      primary_supplier_name_at_order_time: product.primary_supplier_name,
      primary_supplier_url_at_order_time: product.primary_supplier_url,
      primary_supplier_sku_at_order_time: product.primary_supplier_sku,
      primary_supplier_unit_cost_at_order_time: product.primary_supplier_unit_cost,
      primary_supplier_shipping_estimate_at_order_time: product.primary_supplier_shipping_estimate,
      primary_supplier_landed_cost_at_order_time: lc,
      backup_supplier_name_at_order_time: product.backup_supplier_name,
      backup_supplier_url_at_order_time: product.backup_supplier_url,
      backup_supplier_sku_at_order_time: product.backup_supplier_sku,
      backup_supplier_unit_cost_at_order_time: product.backup_supplier_unit_cost,
      expected_gross_margin: margin,
      expected_gross_profit: profit,
      supplier_order_number: null,
      supplier_tracking_number: null,
      supplier_order_date: null,
      tracking_received_date: null,
      tracking_sent_to_customer_date: null,
      internal_fulfillment_status: 'Needs Supplier Order',
      internal_fulfillment_notes: null,
    })
  }

  if (!isSupabaseConfigured()) {
    const order: DbOrder = {
      id: randomUUID(),
      ...orderRow,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    const lines: DbOrderLineItem[] = lineRows.map((l) => ({
      id: randomUUID(),
      ...l,
      order_id: order.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
    return { order, lines }
  }

  const sb = getSupabaseService()
  const { data: order, error: orderErr } = await sb.from('orders').insert(orderRow).select('*').single()
  if (orderErr) throw new Error(orderErr.message)

  const withOrderId = lineRows.map((l) => ({ ...l, order_id: (order as DbOrder).id }))
  const { data: lines, error: lineErr } = await sb.from('order_line_items').insert(withOrderId).select('*')
  if (lineErr) throw new Error(lineErr.message)

  return { order: order as DbOrder, lines: lines as DbOrderLineItem[] }
}

export async function listOrdersAdmin(): Promise<(DbOrder & { line_count: number })[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseService()
  const { data, error } = await sb.from('orders').select('*, order_line_items(count)').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map((o: Record<string, unknown>) => ({
    ...(o as DbOrder),
    line_count: Array.isArray(o.order_line_items) ? (o.order_line_items[0] as { count: number })?.count ?? 0 : 0,
  }))
}

export async function getOrderAdmin(orderId: string): Promise<{ order: DbOrder; lines: DbOrderLineItem[] } | null> {
  if (!isSupabaseConfigured()) return null
  const sb = getSupabaseService()
  const { data: order, error } = await sb.from('orders').select('*').eq('id', orderId).maybeSingle()
  if (error) throw new Error(error.message)
  if (!order) return null
  const { data: lines, error: lineErr } = await sb
    .from('order_line_items')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at')
  if (lineErr) throw new Error(lineErr.message)
  return { order: order as DbOrder, lines: (lines ?? []) as DbOrderLineItem[] }
}

export async function updateOrderLineItem(
  lineId: string,
  patch: Partial<DbOrderLineItem>,
): Promise<DbOrderLineItem> {
  const sb = getSupabaseService()
  const { data, error } = await sb.from('order_line_items').update(patch).eq('id', lineId).select('*').single()
  if (error) throw new Error(error.message)
  return data as DbOrderLineItem
}

export async function insertQuoteRequest(payload: Record<string, unknown>): Promise<void> {
  if (!isSupabaseConfigured()) return
  const sb = getSupabaseService()
  const { error } = await sb.from('quote_requests').insert(payload)
  if (error) throw new Error(error.message)
}
