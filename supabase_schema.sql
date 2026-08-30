-- supabase_schema.sql
-- Idempotent schema setup for CrewBrew

-- 1. Create tables
CREATE TABLE IF NOT EXISTS brands (
  id text PRIMARY KEY,
  name text NOT NULL,
  image text,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  brand_id text REFERENCES brands(id) ON DELETE RESTRICT,
  category_id text REFERENCES categories(id) ON DELETE RESTRICT,
  name text NOT NULL,
  price text NOT NULL,
  stock_status text NOT NULL,
  description text,
  image text,
  specs jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_variants (
  id text PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text,
  size text,
  spout_type text,
  price text NOT NULL,
  stock_status text NOT NULL,
  image text,
  linked_product_id text REFERENCES products(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Apply triggers to all tables
DROP TRIGGER IF EXISTS set_updated_at ON brands;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON categories;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON products;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON product_variants;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- 5. Drop Existing Policies for Idempotency
DROP POLICY IF EXISTS "brands_public_select" ON public.brands;
DROP POLICY IF EXISTS "brands_authenticated_all" ON public.brands;

DROP POLICY IF EXISTS "categories_public_select" ON public.categories;
DROP POLICY IF EXISTS "categories_authenticated_all" ON public.categories;

DROP POLICY IF EXISTS "products_public_select" ON public.products;
DROP POLICY IF EXISTS "products_authenticated_all" ON public.products;

DROP POLICY IF EXISTS "product_variants_public_select" ON public.product_variants;
DROP POLICY IF EXISTS "product_variants_authenticated_all" ON public.product_variants;

-- 6. Create RLS Policies
-- Anon (Public) access: SELECT only
CREATE POLICY "brands_public_select" ON brands FOR SELECT TO anon USING (true);
CREATE POLICY "categories_public_select" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "products_public_select" ON products FOR SELECT TO anon USING (true);
CREATE POLICY "product_variants_public_select" ON product_variants FOR SELECT TO anon USING (true);

-- Authenticated (Admin) access: ALL CRUD
CREATE POLICY "brands_authenticated_all" ON brands FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "categories_authenticated_all" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_authenticated_all" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "product_variants_authenticated_all" ON product_variants FOR ALL TO authenticated USING (true) WITH CHECK (true);
