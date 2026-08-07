import type { ReactNode } from 'react'
import BlogHeader from './BlogHeader'
import BlogFooter from './BlogFooter'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <BlogHeader />
      <div className="flex-1">{children}</div>
      <BlogFooter />
    </div>
  )
}
