import type { ReactNode } from 'react'
import '../../styles/site.css'
import SiteHeader from '../SiteHeader'
import BuyerFooter from '../buyer/BuyerFooter'

/** Blog and article pages share the site's light theme, header and footer. */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tcs-site flex min-h-screen flex-col font-tcsBody">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <BuyerFooter />
    </div>
  )
}
