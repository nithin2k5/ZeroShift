-- ZeroShift Database Schema
-- Run this once against your Neon PostgreSQL instance

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(150) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    phone       VARCHAR(30) DEFAULT '',
    password    TEXT NOT NULL,
    role        VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- User Addresses
CREATE TABLE IF NOT EXISTS addresses (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(30) DEFAULT 'Home',
    name        VARCHAR(150),
    street      TEXT NOT NULL,
    city        VARCHAR(100) NOT NULL,
    state       VARCHAR(100) NOT NULL,
    zip         VARCHAR(20) NOT NULL,
    country     VARCHAR(100) NOT NULL DEFAULT 'India',
    is_default  BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(255) NOT NULL,
    description    TEXT DEFAULT '',
    price          NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2),
    category       VARCHAR(50) NOT NULL CHECK (category IN ('men', 'women', 'accessories', 'footwear')),
    images         TEXT[]   DEFAULT '{}',
    sizes          TEXT[]   DEFAULT '{}',
    colors         TEXT[]   DEFAULT '{}',
    stock          INTEGER  DEFAULT 0,
    badge          VARCHAR(100) DEFAULT '',
    is_active      BOOLEAN  DEFAULT TRUE,
    ratings        NUMERIC(3,2) DEFAULT 0,
    num_reviews    INTEGER  DEFAULT 0,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    shipping_name   VARCHAR(150),
    shipping_street TEXT NOT NULL,
    shipping_city   VARCHAR(100) NOT NULL,
    shipping_state  VARCHAR(100) NOT NULL,
    shipping_zip    VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL DEFAULT 'India',
    payment_method  VARCHAR(50) DEFAULT 'Card',
    payment_status  VARCHAR(30) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    status          VARCHAR(30) DEFAULT 'Processing' CHECK (status IN ('Processing', 'Dispatched', 'Shipped', 'Delivered', 'Cancelled')),
    total_amount    NUMERIC(10,2) NOT NULL,
    shipping_cost   NUMERIC(10,2) DEFAULT 0,
    delivered_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
    name        VARCHAR(255) NOT NULL,
    image       TEXT DEFAULT '',
    price       NUMERIC(10,2) NOT NULL,
    qty         INTEGER NOT NULL DEFAULT 1,
    size        VARCHAR(20) DEFAULT '',
    color       VARCHAR(50) DEFAULT ''
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id    ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
