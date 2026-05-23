import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireAdmin } from './lib/adminAuth.js'
import { listAllProductsAdmin, upsertProduct } from './lib/catalogDb.js'
import { enrichProduct, landedCost, actualMarginPercentage, computePriceStatus } from './lib/productMetrics.js'
import type { DbProduct } from './lib/dropshipTypes.js'

export const config = { runtime: 'nodejs' }

const CSV_HEADERS = [
  'sku',
  'product_name',
  'slug',
  'category',
  'selling_price',
  'sale_price',
  'status',
  'quote_only',
  'product_role',
  'supplier_group',
  'primary_supplier_name',
  'primary_supplier_url',
  'primary_supplier_sku',
  'primary_supplier_unit_cost',
  'primary_supplier_shipping_estimate',
  'primary_supplier_landed_cost',
  'backup_supplier_name',
  'backup_supplier_url',
  'backup_supplier_sku',
  'backup_supplier_unit_cost',
  'backup_supplier_shipping_estimate',
  'backup_supplier_landed_cost',
  'cheapest_competitor_url',
  'cheapest_competitor_price',
  'recommended_selling_price',
  'target_margin',
  'actual_margin',
  'price_status',
  'availability_status',
  'last_price_checked',
  'fulfillment_notes',
  'return_notes',
  'internal_notes',
] as const

function escapeCsv(v: unknown): string {
  const s = v == null ? '' : String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function rowToCsv(p: ReturnType<typeof enrichProduct>): string {
  const backupLanded = landedCost(p.backup_supplier_unit_cost, p.backup_supplier_shipping_estimate)
  return CSV_HEADERS.map((h) => {
    switch (h) {
      case 'product_name':
        return escapeCsv(p.name)
      case 'category':
        return escapeCsv(p.category_slug)
      case 'target_margin':
        return escapeCsv(p.target_margin_percentage)
      case 'actual_margin':
        return escapeCsv(p.actual_margin_percentage)
      case 'price_status':
        return escapeCsv(p.price_status)
      case 'last_price_checked':
        return escapeCsv(p.last_price_checked_date)
      case 'primary_supplier_landed_cost':
        return escapeCsv(p.primary_supplier_landed_cost)
      case 'backup_supplier_landed_cost':
        return escapeCsv(backupLanded)
      default: {
        const key = h as keyof DbProduct
        if (h === 'quote_only') return escapeCsv(p.quote_only)
        if (key in p) return escapeCsv((p as Record<string, unknown>)[key as string])
        return ''
      }
    }
  }).join(',')
}

function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"'
        i++
      } else if (c === '"') inQ = false
      else cur += c
    } else if (c === '"') inQ = true
    else if (c === ',') {
      out.push(cur)
      cur = ''
    } else cur += c
  }
  out.push(cur)
  return out
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return

  if (req.method === 'GET') {
    try {
      const products = await listAllProductsAdmin()
      const csv = [CSV_HEADERS.join(','), ...products.map(rowToCsv)].join('\n')
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=supplier-source-map.csv')
      return res.status(200).send(csv)
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  if (req.method === 'POST') {
    const text = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})
    let csvText = text
    try {
      const parsed = JSON.parse(text) as { csv?: string }
      if (parsed.csv) csvText = parsed.csv
    } catch {
      /* raw csv body */
    }
    const lines = csvText.trim().split(/\r?\n/)
    if (lines.length < 2) return res.status(400).json({ error: 'CSV must have header + rows' })
    const headers = parseCsvLine(lines[0]!)
    const idx = (name: string) => headers.indexOf(name)
    const imported: string[] = []
    try {
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]!)
        if (!cols.length || !cols[idx('sku')]) continue
        const selling = parseFloat(cols[idx('selling_price')] || '0')
        const unitCost = parseFloat(cols[idx('primary_supplier_unit_cost')] || '') || null
        const shipEst = parseFloat(cols[idx('primary_supplier_shipping_estimate')] || '') || null
        const row: Partial<DbProduct> & { sku: string; slug: string; name: string } = {
          sku: cols[idx('sku')]!,
          slug: cols[idx('slug')]!,
          name: cols[idx('product_name')]!,
          category_slug: cols[idx('category')]!,
          selling_price: selling,
          sale_price: parseFloat(cols[idx('sale_price')] || '') || null,
          status: (cols[idx('status')] as 'active' | 'draft') || 'active',
          quote_only: cols[idx('quote_only')] === 'true',
          product_role: (cols[idx('product_role')] as DbProduct['product_role']) || null,
          supplier_group: (cols[idx('supplier_group')] as DbProduct['supplier_group']) || null,
          primary_supplier_name: cols[idx('primary_supplier_name')] || null,
          primary_supplier_url: cols[idx('primary_supplier_url')] || null,
          primary_supplier_sku: cols[idx('primary_supplier_sku')] || null,
          primary_supplier_unit_cost: unitCost,
          primary_supplier_shipping_estimate: shipEst,
          backup_supplier_name: cols[idx('backup_supplier_name')] || null,
          backup_supplier_url: cols[idx('backup_supplier_url')] || null,
          backup_supplier_sku: cols[idx('backup_supplier_sku')] || null,
          backup_supplier_unit_cost: parseFloat(cols[idx('backup_supplier_unit_cost')] || '') || null,
          backup_supplier_shipping_estimate:
            parseFloat(cols[idx('backup_supplier_shipping_estimate')] || '') || null,
          cheapest_competitor_url: cols[idx('cheapest_competitor_url')] || null,
          cheapest_competitor_price: parseFloat(cols[idx('cheapest_competitor_price')] || '') || null,
          recommended_selling_price: parseFloat(cols[idx('recommended_selling_price')] || '') || null,
          target_margin_percentage: parseFloat(cols[idx('target_margin')] || '') || null,
          availability_status: (cols[idx('availability_status')] as DbProduct['availability_status']) || 'Active',
          last_price_checked_date: cols[idx('last_price_checked')] || null,
          fulfillment_notes: cols[idx('fulfillment_notes')] || null,
          return_notes: cols[idx('return_notes')] || null,
          internal_notes: cols[idx('internal_notes')] || null,
          description: '',
          long_description: '',
          in_stock: true,
          unit: 'each',
          image_url: '',
          images: [],
        }
        await upsertProduct(row)
        imported.push(row.sku)
      }
      return res.status(200).json({ ok: true, imported })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
