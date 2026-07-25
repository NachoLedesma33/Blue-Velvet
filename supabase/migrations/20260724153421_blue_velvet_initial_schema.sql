
/*
# Blue Velvet Pastry House — Initial Schema

## Summary
Creates the full database for a pastry e-commerce store with admin role management.

## Tables
1. `profiles` — Extends auth.users with a role field (super_admin, admin, viewer).
2. `products` — The pastry catalog with pricing, stock, images, and toppings/components.

## Security
- Profiles: authenticated users read their own profile only; service role handles inserts via trigger.
- Products: public read (anon + authenticated); admin/super_admin can write.

## Notes
1. A trigger auto-creates a profile row on every new user sign-up with role 'viewer'.
2. Products can be read without signing in (the storefront is public).
3. Only users with role 'admin' or 'super_admin' can create, edit, or delete products.
4. The `images` column is a JSONB array of URL strings.
5. The `toppings` column is a JSONB array of objects: {name, included, extra_price}.
*/

-- === PROFILES ===
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'viewer')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- === PRODUCTS ===
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_description text,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  category text NOT NULL DEFAULT 'torta' CHECK (category IN ('torta', 'tarta', 'postre', 'cupcake', 'otro')),
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  toppings jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read
DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Admin write
DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- === SEED DATA ===
INSERT INTO products (name, short_description, description, price, stock, available, category, images, toppings, tags, featured)
VALUES
(
  'Torta Blue Velvet',
  'Nuestra torta emblema: capas de bizcocho azul con crema de queso',
  'La estrella de nuestra pastelería. Bizcocho húmedo teñido de azul profundo, relleno y cubierto con una sedosa crema de queso y vainilla. Una experiencia visual y gustativa única, perfecta para celebraciones especiales.',
  18000,
  5,
  true,
  'torta',
  '["https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Crema de queso","included":true,"extra_price":0},{"name":"Flores comestibles",	"included":false,"extra_price":1500},{"name":"Glitter comestible","included":false,"extra_price":800},{"name":"Personalización de texto","included":true,"extra_price":0}]'::jsonb,
  ARRAY['featured','signature','personalizable'],
  true
),
(
  'Torta de Chocolate Belga',
  'Intenso bizcocho de cacao con ganache y frutos rojos',
  'Para los amantes del chocolate. Cuatro capas de bizcocho húmedo de cacao, rellenas con ganache de chocolate belga 70% y compota de frutos rojos. Cubierta con una capa de ganache espejo y decoración artesanal.',
  16500,
  4,
  true,
  'torta',
  '["https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Ganache de chocolate belga","included":true,"extra_price":0},{"name":"Compota de frutos rojos","included":true,"extra_price":0},{"name":"Frambuesas frescas","included":false,"extra_price":1200},{"name":"Hoja de oro comestible","included":false,"extra_price":2000}]'::jsonb,
  ARRAY['chocolate','intenso'],
  true
),
(
  'Tarta de Frutos del Bosque',
  'Base crocante con crema pastelera y frutos del bosque frescos',
  'Una tarta clásica y elegante. Base de masa sablée artesanal, rellena con cremosa crema pastelera de vainilla, cubierta con una generosa selección de frutos del bosque frescos de temporada. Ideal para cualquier ocasión.',
  12000,
  6,
  true,
  'tarta',
  '["https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Crema pastelera de vainilla","included":true,"extra_price":0},{"name":"Frutos del bosque frescos","included":true,"extra_price":0},{"name":"Crema chantilly extra","included":false,"extra_price":600},{"name":"Glaseado espejo","included":false,"extra_price":800}]'::jsonb,
  ARRAY['clasica','fruta','temporada'],
  false
),
(
  'Cheesecake New York',
  'El clásico cheesecake cremoso con base de galleta y coulis de frutos rojos',
  'Una receta de autor inspirada en el clásico neoyorkino. Base de galleta mantecada, relleno ultra cremoso de queso Philadelphia, horneado en baño maría para una textura perfecta. Servido con coulis casero de frutos rojos.',
  14000,
  3,
  true,
  'postre',
  '["https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Coulis de frutos rojos","included":true,"extra_price":0},{"name":"Base de galleta","included":true,"extra_price":0},{"name":"Caramelo salado","included":false,"extra_price":700},{"name":"Fresas frescas en la superficie","included":false,"extra_price":1000}]'::jsonb,
  ARRAY['cremoso','clasico','newyork'],
  false
),
(
  'Naked Cake Romántico',
  'Torta descubierta con capas visibles, crema y flores naturales',
  'La tendencia que conquista corazones. Capas alternadas de bizcocho de vainilla y limón, crema de mantequilla suiza, con flores naturales y frutos cuidadosamente seleccionados. Perfecta para bodas, cumpleaños y momentos especiales.',
  22000,
  2,
  true,
  'torta',
  '["https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Flores naturales","included":true,"extra_price":0},{"name":"Crema de mantequilla suiza","included":true,"extra_price":0},{"name":"Frutas frescas de temporada","included":false,"extra_price":1500},{"name":"Personalización temática","included":false,"extra_price":2500},{"name":"Pisos adicionales","included":false,"extra_price":8000}]'::jsonb,
  ARRAY['boda','romantico','personalizable','premium'],
  true
),
(
  'Cupcakes Artesanales',
  'Caja de 6 cupcakes con frosting de colores y decoración artesanal',
  'Mini joyas de pastelería. Bizcochos esponjosos en distintos sabores (vainilla, chocolate, limón, red velvet) coronados con frosting de mantequilla suiza en colores pasteles y decoración artesanal. Cada caja es única.',
  8500,
  10,
  true,
  'cupcake',
  '["https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
  '[{"name":"Frosting de mantequilla suiza","included":true,"extra_price":0},{"name":"Sabor vainilla","included":true,"extra_price":0},{"name":"Sabor chocolate","included":true,"extra_price":0},{"name":"Sabor red velvet","included":false,"extra_price":300},{"name":"Toppers personalizados","included":false,"extra_price":1200},{"name":"Caja de 12 unidades","included":false,"extra_price":8500}]'::jsonb,
  ARRAY['caja','surtido','regalo'],
  false
)
ON CONFLICT DO NOTHING;
