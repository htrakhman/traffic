-- Job A: supplier lead-gen homepage signup form (supersedes nothing — additive).
-- Written only from the api/supplier-signup.ts serverless function via the
-- service role key, which bypasses RLS. No anon policies are needed or granted.

CREATE TABLE supplier_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  website text,
  territory text NOT NULL,
  products text,
  monthly_volume text,
  source text
);

CREATE INDEX supplier_signups_created_at_idx ON supplier_signups (created_at DESC);

ALTER TABLE supplier_signups ENABLE ROW LEVEL SECURITY;

-- No public policies: all access goes through the service role from the
-- serverless function, which bypasses RLS entirely. Anon and authenticated
-- roles get no access at all.
