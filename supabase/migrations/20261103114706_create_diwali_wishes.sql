/*
# Create diwali_wishes table

1. New Tables
- `diwali_wishes`
  - `id` (uuid, primary key)
  - `name` (text, required, up to 60 characters)
  - `message` (text, required, up to 280 characters)
  - `created_at` (timestamp, defaults to now)
2. Security
- Enable RLS on `diwali_wishes`.
- Grant SELECT and INSERT to `anon` and `authenticated` (the site has no sign-in, so visitors use the public key).
- Anyone can read wishes and post a new one. Wishes cannot be edited or deleted from the site.
3. Notes
- Length limits are enforced in the database so oversized input is rejected even if the page is bypassed.
*/

CREATE TABLE IF NOT EXISTS diwali_wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 60),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 280),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS diwali_wishes_created_at_idx ON diwali_wishes (created_at DESC);

ALTER TABLE diwali_wishes ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON diwali_wishes TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_diwali_wishes" ON diwali_wishes;
CREATE POLICY "anon_select_diwali_wishes" ON diwali_wishes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_diwali_wishes" ON diwali_wishes;
CREATE POLICY "anon_insert_diwali_wishes" ON diwali_wishes FOR INSERT
  TO anon, authenticated WITH CHECK (true);
