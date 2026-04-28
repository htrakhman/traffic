import { Star } from 'lucide-react'

interface Props {
  rating: number
  size?: number
  className?: string
}

export default function StarRating({ rating, size = 14, className = '' }: Props) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    const fill = Math.max(0, Math.min(1, rating - (i - 1)))
    return { i, fill }
  })
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {stars.map(({ i, fill }) => (
        <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} className="text-slate-700 absolute inset-0" />
          {fill > 0 && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="text-amber-400 fill-amber-400" />
            </span>
          )}
        </span>
      ))}
    </span>
  )
}
