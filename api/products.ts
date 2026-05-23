import type { VercelRequest, VercelResponse } from '@vercel/node'
import { listPublicProducts } from './lib/catalogDb.js'
import { dbProductToStorefront } from './lib/storefrontMapper.js'

export const config = { runtime: 'nodejs' }

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const products = await listPublicProducts()
    return res.status(200).json({ products: products.map(dbProductToStorefront) })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/products]', msg)
    return res.status(500).json({ error: msg })
  }
}
