import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseJsonBody, requireAdmin } from './lib/adminAuth.js'
import { listAllProductsAdmin, upsertProduct } from './lib/catalogDb.js'
import { enrichProduct } from './lib/productMetrics.js'
import type { DbProduct } from './lib/dropshipTypes.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return

  if (req.method === 'GET') {
    try {
      const products = await listAllProductsAdmin()
      return res.status(200).json({ products })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const body = parseJsonBody(req)
    if (body === null || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON' })
    }
    try {
      const row = body as Partial<DbProduct> & { sku: string; slug: string; name: string }
      const saved = await upsertProduct(row)
      return res.status(200).json({ product: enrichProduct(saved) })
    } catch (e: unknown) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  }

  res.setHeader('Allow', 'GET, PUT, PATCH')
  return res.status(405).json({ error: 'Method not allowed' })
}
