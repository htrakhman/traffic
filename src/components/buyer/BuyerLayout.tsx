import type { ReactNode } from 'react'
import '../../styles/site.css'
import BuyerHeader from './BuyerHeader'
import BuyerFooter from './BuyerFooter'

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tcs-site font-tcsBody">
      <BuyerHeader />
      <main>{children}</main>
      <BuyerFooter />
    </div>
  )
}
