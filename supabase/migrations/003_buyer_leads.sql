-- Job B: buyer product pages' quote form. This table is the actual product —
-- every row is a lead sold to a supplier. Written only from
-- api/buyer-lead-submit.ts via the service role key, which bypasses RLS.

CREATE TABLE buyer_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  product_category text NOT NULL,
  quantity text,
  delivery_city text,
  delivery_state text NOT NULL,
  timeline text,
  notes text,
  landing_page text,
  status text NOT NULL DEFAULT 'new'
);

CREATE INDEX buyer_leads_created_at_idx ON buyer_leads (created_at DESC);
CREATE INDEX buyer_leads_status_idx ON buyer_leads (status);
CREATE INDEX buyer_leads_product_category_idx ON buyer_leads (product_category);

ALTER TABLE buyer_leads ENABLE ROW LEVEL SECURITY;

-- No public policies: all access goes through the service role from the
-- serverless function, which bypasses RLS entirely.
