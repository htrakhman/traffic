import { Link } from 'react-router-dom'
import { SITE_LOGO_PATH, SITE_NAME } from '../../config/site'

type Props = {
  /** Header nav uses a shorter mark; footer uses a slightly larger mark. */
  size: 'header' | 'footer'
  className?: string
}

export default function BrandLogoLink({ size, className = '' }: Props) {
  const imgClass =
    size === 'header'
      ? 'h-12 w-auto sm:h-14 max-w-[min(320px,calc(100vw-6rem))]'
      : 'h-11 w-auto sm:h-12 max-w-[min(280px,100%)]'
  const frameClass =
    size === 'header'
      ? 'rounded-md bg-white ring-1 ring-white/20 shadow-sm shadow-black/25'
      : 'rounded-md bg-white px-1 py-0.5 ring-1 ring-white/20 shadow-sm shadow-black/25'

  return (
    <Link
      to="/"
      className={`flex items-center shrink-0 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:rounded-lg ${className}`}
    >
      <img
        src={SITE_LOGO_PATH}
        alt=""
        className={`${imgClass} object-contain object-left ${frameClass}`}
        decoding="async"
      />
      <span className="sr-only">{SITE_NAME}</span>
    </Link>
  )
}
