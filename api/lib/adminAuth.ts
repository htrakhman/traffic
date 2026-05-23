import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminEmail } from './lib/supabaseServer.js'

export function getAdminEmailFromRequest(req: VercelRequest): string | null {
  const header = req.headers['x-admin-email']
  if (typeof header === 'string' && header.trim()) return header.trim()
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) {
    try {
      const payload = JSON.parse(Buffer.from(auth.slice(7).split('.')[1] ?? '', 'base64url').toString())
      if (typeof payload.email === 'string') return payload.email
    } catch {
      /* ignore */
    }
  }
  return null
}

export function requireAdmin(req: VercelRequest, res: VercelResponse): string | null {
  const email = getAdminEmailFromRequest(req)
  if (!email || !isAdminEmail(email)) {
    res.status(401).json({ error: 'Unauthorized admin' })
    return null
  }
  return email
}

export function parseJsonBody(req: VercelRequest): unknown {
  const b = req.body as unknown
  if (b == null) return {}
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString('utf8') || '{}')
    } catch {
      return null
    }
  }
  if (typeof b === 'string') {
    try {
      return JSON.parse(b || '{}')
    } catch {
      return null
    }
  }
  if (typeof b === 'object') return b
  return null
}
