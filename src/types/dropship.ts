export type ProductRole = 'Price Leader' | 'Normal Margin' | 'High Margin' | 'Quote Only'
export type AvailabilityStatus =
  | 'Active'
  | 'Needs Price Check'
  | 'Out of Stock'
  | 'Do Not Sell'
  | 'Quote Only'
export type SupplierGroup =
  | 'Traffic Cones'
  | 'Barricades'
  | 'Traffic Drums'
  | 'Signs and Stands'
  | 'Safety Vests'
  | 'Wheel Chocks'
  | 'Speed Control'
  | 'Parking Lot Safety'
export type FulfillmentStatus =
  | 'New Order'
  | 'Needs Supplier Order'
  | 'Supplier Order Placed'
  | 'Waiting For Tracking'
  | 'Tracking Sent To Customer'
  | 'Delivered'
  | 'Issue / Backorder'
  | 'Refund Needed'
  | 'Canceled'

export type PriceStatus =
  | 'Cheapest'
  | 'Within 5 Percent'
  | 'Within 10 Percent'
  | 'Overpriced'
  | 'Needs Review'

export type DbProduct = {
  id: string
  sku: string
  name: string
  slug: string
  category_slug: string
  description: string
  long_description: string
  selling_price: number
  sale_price: number | null
  status: 'active' | 'draft'
  quote_only: boolean
  in_stock: boolean
  unit: string
  image_url: string
  images: string[]
  specs: Record<string, string>
  features: string[]
  tags: string[]
  compliance: string[]
  use_cases?: { title: string; description: string }[] | null
  faqs?: { question: string; answer: string }[] | null
  volume_price_tiers: { minQty: number; maxQty: number | null; supplierReferenceUnitPrice: number }[]
  meta_title: string | null
  meta_description: string | null
  popular: boolean
  weight: string | null
  dimensions: string | null
  availability_status: AvailabilityStatus
  primary_supplier_name: string | null
  primary_supplier_url: string | null
  primary_supplier_sku: string | null
  primary_supplier_unit_cost: number | null
  primary_supplier_shipping_estimate: number | null
  backup_supplier_name: string | null
  backup_supplier_url: string | null
  backup_supplier_sku: string | null
  backup_supplier_unit_cost: number | null
  backup_supplier_shipping_estimate: number | null
  cheapest_competitor_url: string | null
  cheapest_competitor_price: number | null
  recommended_selling_price: number | null
  target_margin_percentage: number | null
  product_role: ProductRole | null
  supplier_group: SupplierGroup | null
  fulfillment_notes: string | null
  return_notes: string | null
  last_price_checked_date: string | null
  internal_notes: string | null
  created_at?: string
  updated_at?: string
}

export type DbOrder = {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  company: string | null
  job_site: string | null
  notes: string | null
  delivery_needed: boolean
  merchandise_subtotal: number
  delivery_fee: number
  grand_total: number
  membership_at_checkout: boolean
  created_at: string
  updated_at: string
}

export type DbOrderLineItem = {
  id: string
  order_id: string
  product_id: string | null
  product_purchased: string
  quantity_purchased: number
  customer_paid_per_unit: number
  customer_paid_total: number
  catalog_sku: string | null
  primary_supplier_name_at_order_time: string | null
  primary_supplier_url_at_order_time: string | null
  primary_supplier_sku_at_order_time: string | null
  primary_supplier_unit_cost_at_order_time: number | null
  primary_supplier_shipping_estimate_at_order_time: number | null
  primary_supplier_landed_cost_at_order_time: number | null
  backup_supplier_name_at_order_time: string | null
  backup_supplier_url_at_order_time: string | null
  backup_supplier_sku_at_order_time: string | null
  backup_supplier_unit_cost_at_order_time: number | null
  expected_gross_margin: number | null
  expected_gross_profit: number | null
  supplier_order_number: string | null
  supplier_tracking_number: string | null
  supplier_order_date: string | null
  tracking_received_date: string | null
  tracking_sent_to_customer_date: string | null
  internal_fulfillment_status: FulfillmentStatus
  internal_fulfillment_notes: string | null
  created_at?: string
  updated_at?: string
}

export type ProductWithMetrics = DbProduct & {
  primary_supplier_landed_cost: number | null
  actual_margin_percentage: number | null
  price_status: PriceStatus
  margin_warning: boolean
  admin_warnings: string[]
}
