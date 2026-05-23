-- 10-product manual dropshipping store schema

CREATE TYPE product_role AS ENUM (
  'Price Leader',
  'Normal Margin',
  'High Margin',
  'Quote Only'
);

CREATE TYPE availability_status AS ENUM (
  'Active',
  'Needs Price Check',
  'Out of Stock',
  'Do Not Sell',
  'Quote Only'
);

CREATE TYPE supplier_group AS ENUM (
  'Traffic Cones',
  'Barricades',
  'Traffic Drums',
  'Signs and Stands',
  'Safety Vests',
  'Wheel Chocks',
  'Speed Control',
  'Parking Lot Safety'
);

CREATE TYPE fulfillment_status AS ENUM (
  'New Order',
  'Needs Supplier Order',
  'Supplier Order Placed',
  'Waiting For Tracking',
  'Tracking Sent To Customer',
  'Delivered',
  'Issue / Backorder',
  'Refund Needed',
  'Canceled'
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_slug text NOT NULL,
  description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  selling_price numeric(12, 2) NOT NULL DEFAULT 0,
  sale_price numeric(12, 2),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  quote_only boolean NOT NULL DEFAULT false,
  in_stock boolean NOT NULL DEFAULT true,
  unit text NOT NULL DEFAULT 'each',
  image_url text NOT NULL DEFAULT '',
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  compliance jsonb NOT NULL DEFAULT '[]'::jsonb,
  use_cases jsonb,
  faqs jsonb,
  volume_price_tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  popular boolean NOT NULL DEFAULT false,
  weight text,
  dimensions text,

  primary_supplier_name text,
  primary_supplier_url text,
  primary_supplier_sku text,
  primary_supplier_unit_cost numeric(12, 2),
  primary_supplier_shipping_estimate numeric(12, 2),
  backup_supplier_name text,
  backup_supplier_url text,
  backup_supplier_sku text,
  backup_supplier_unit_cost numeric(12, 2),
  backup_supplier_shipping_estimate numeric(12, 2),
  cheapest_competitor_url text,
  cheapest_competitor_price numeric(12, 2),
  recommended_selling_price numeric(12, 2),
  target_margin_percentage numeric(6, 2),
  product_role product_role,
  supplier_group supplier_group,
  fulfillment_notes text,
  return_notes text,
  availability_status availability_status NOT NULL DEFAULT 'Active',
  last_price_checked_date date,
  internal_notes text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_category_slug_idx ON products (category_slug);
CREATE INDEX products_status_idx ON products (status);
CREATE INDEX products_slug_idx ON products (slug);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  company text,
  job_site text,
  notes text,
  delivery_needed boolean NOT NULL DEFAULT true,
  merchandise_subtotal numeric(12, 2) NOT NULL,
  delivery_fee numeric(12, 2) NOT NULL DEFAULT 0,
  grand_total numeric(12, 2) NOT NULL,
  membership_at_checkout boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX orders_customer_email_idx ON orders (customer_email);

CREATE TABLE order_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id uuid REFERENCES products (id) ON DELETE SET NULL,
  product_purchased text NOT NULL,
  quantity_purchased integer NOT NULL CHECK (quantity_purchased > 0),
  customer_paid_per_unit numeric(12, 2) NOT NULL,
  customer_paid_total numeric(12, 2) NOT NULL,
  catalog_sku text,

  primary_supplier_name_at_order_time text,
  primary_supplier_url_at_order_time text,
  primary_supplier_sku_at_order_time text,
  primary_supplier_unit_cost_at_order_time numeric(12, 2),
  primary_supplier_shipping_estimate_at_order_time numeric(12, 2),
  primary_supplier_landed_cost_at_order_time numeric(12, 2),
  backup_supplier_name_at_order_time text,
  backup_supplier_url_at_order_time text,
  backup_supplier_sku_at_order_time text,
  backup_supplier_unit_cost_at_order_time numeric(12, 2),
  expected_gross_margin numeric(12, 4),
  expected_gross_profit numeric(12, 2),

  supplier_order_number text,
  supplier_tracking_number text,
  supplier_order_date date,
  tracking_received_date date,
  tracking_sent_to_customer_date date,
  internal_fulfillment_status fulfillment_status NOT NULL DEFAULT 'Needs Supplier Order',
  internal_fulfillment_notes text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX order_line_items_order_id_idx ON order_line_items (order_id);

CREATE TABLE quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  company text,
  job_site text,
  notes text,
  lines jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Public-safe view (no supplier fields)
CREATE VIEW products_public AS
SELECT
  id,
  sku,
  name,
  slug,
  category_slug,
  description,
  long_description,
  selling_price,
  sale_price,
  status,
  quote_only,
  in_stock,
  unit,
  image_url,
  images,
  specs,
  features,
  tags,
  compliance,
  use_cases,
  faqs,
  volume_price_tiers,
  meta_title,
  meta_description,
  popular,
  weight,
  dimensions,
  availability_status,
  created_at,
  updated_at
FROM products
WHERE status = 'active';

-- Admin allowlist (emails that can access admin APIs)
CREATE TABLE admin_users (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Anon can read active products via view only (service role used from API for writes)
CREATE POLICY products_public_read ON products
  FOR SELECT
  USING (status = 'active');

-- Orders/line items: no public access (API uses service role)
CREATE POLICY orders_no_public ON orders FOR ALL USING (false);
CREATE POLICY order_line_items_no_public ON order_line_items FOR ALL USING (false);
CREATE POLICY quote_requests_insert ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY quote_requests_no_select ON quote_requests FOR SELECT USING (false);
CREATE POLICY admin_users_no_public ON admin_users FOR ALL USING (false);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER order_line_items_updated_at BEFORE UPDATE ON order_line_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
