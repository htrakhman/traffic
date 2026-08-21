-- Free-text write-in for product lines the chip list doesn't cover. Kept in
-- its own column rather than appended to products so the catalog picks stay
-- clean and the write-ins can be read on their own — they are the signal for
-- which categories the chip list is missing.

ALTER TABLE supplier_signups ADD COLUMN other_products text;
