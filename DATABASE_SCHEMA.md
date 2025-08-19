# Esquema de Base de Datos para MercadoLibre México

## Tablas Principales

### `products`
Tabla principal de productos

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  variant VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id),
  images TEXT[],
  buy_link VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `categories`
Tabla de categorías de productos

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `seo_settings`
Tabla de configuración SEO

```sql
CREATE TABLE seo_settings (
  id SERIAL PRIMARY KEY,
  home_title VARCHAR(255),
  product_title_template VARCHAR(255),
  category_title_template VARCHAR(255),
  default_title VARCHAR(255),
  site_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Datos de Ejemplo

### Categorías
```sql
INSERT INTO categories (name, slug) VALUES
('Tecnología', 'tecnologia'),
('Celulares y Teléfonos', 'celulares-telefonos'),
('Electrodomésticos', 'electrodomesticos'),
('Hogar y Jardín', 'hogar-jardin'),
('Deportes y Fitness', 'deportes-fitness'),
('Moda', 'moda');
```

### Configuración SEO Inicial
```sql
INSERT INTO seo_settings (home_title, product_title_template, category_title_template, default_title, site_name) VALUES
('MercadoLibre México - Envíos Gratis en el día',
 '{productName} - {siteName}',
 '{categoryName} en {siteName}',
 'MercadoLibre México',
 'MercadoLibre México');
```

## Índices Recomendados

```sql
-- Índice para productos activos
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;

-- Índice para productos destacados
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;

-- Índice para productos fijados
CREATE INDEX idx_products_pinned ON products(is_pinned) WHERE is_pinned = true;

-- Índice para categorías
CREATE INDEX idx_products_category ON products(category_id);

-- Índice para búsqueda de texto
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));
```

## Políticas RLS (Row Level Security)

```sql
-- Habilitar RLS en las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública de productos activos
CREATE POLICY "Productos públicos" ON products
  FOR SELECT USING (is_active = true);

-- Permitir lectura pública de categorías
CREATE POLICY "Categorías públicas" ON categories
  FOR SELECT USING (true);

-- Permitir lectura pública de configuración SEO
CREATE POLICY "SEO público" ON seo_settings
  FOR SELECT USING (true);
```