import { Navigate, useParams } from 'react-router-dom'
import { LEGACY_CATEGORY_REDIRECTS, LEGACY_PRODUCT_REDIRECTS } from '../../data/categories'

export function LegacyCategoryRedirect() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/browse" replace />
  const target = LEGACY_CATEGORY_REDIRECTS[slug]
  if (target) return <Navigate to={`/category/${target}`} replace />
  return null
}

export function LegacyProductRedirect() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/browse" replace />
  const target = LEGACY_PRODUCT_REDIRECTS[slug]
  if (target) return <Navigate to={`/product/${target}`} replace />
  return null
}
