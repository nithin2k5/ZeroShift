require("dotenv").config();
const { Pool } = require("pg");

// Strip unsupported parameters that break pg DNS resolution
const connStr = (process.env.DATABASE_URL || "")
    .replace(/[?&]channel_binding=[^&]*/g, "")
    .replace(/[?&]$/, "");

const pool = new Pool({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
});


const products = [
    // ──── MEN ────
    {
        name: "Canvas Field Jacket",
        description: "A rugged yet refined field jacket in washed canvas. Features four front pockets and a relaxed fit designed for all-day wear.",
        price: 7499,
        discount_price: null,
        category: "men",
        images: ["/images/new-1.jpg", "/images/prod-1.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Olive", "Beige", "Black"],
        stock: 42,
        badge: "Just Added",
    },
    {
        name: "Linen Blend Overshirt",
        description: "Lightweight linen-cotton blend overshirt. Relaxed fit with a dropped shoulder and double chest pockets.",
        price: 4999,
        discount_price: 3999,
        category: "men",
        images: ["/images/prod-2.jpg", "/images/new-2.jpg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Off-White", "Slate Blue", "Dusty Rose"],
        stock: 38,
        badge: "Trending",
    },
    {
        name: "Tailored Chino Trousers",
        description: "Clean-cut chino trousers crafted with stretch fabric for unrestricted movement. Perfect for both casual and smart-casual settings.",
        price: 3999,
        discount_price: null,
        category: "men",
        images: ["/images/prod-3.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Camel", "Charcoal", "Navy"],
        stock: 55,
        badge: "",
    },
    {
        name: "Heavyweight Graphic Tee",
        description: "230gsm premium cotton tee with a vintage-inspired oversized graphic print. Garment-washed for a lived-in feel.",
        price: 1999,
        discount_price: null,
        category: "men",
        images: ["/images/prod-4.jpg", "/images/new-3.jpg"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Faded Black", "Vintage White", "Washed Grey"],
        stock: 100,
        badge: "Bestseller",
    },
    {
        name: "Relaxed Denim Shirt",
        description: "Dark indigo denim shirt with a relaxed fit and minimal branding. Versatile enough to wear as a jacket or tucked in.",
        price: 4499,
        discount_price: null,
        category: "men",
        images: ["/images/new-4.jpg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Dark Indigo", "Light Wash"],
        stock: 29,
        badge: "",
    },

    // ──── WOMEN ────
    {
        name: "Wrap Midi Skirt",
        description: "Fluid wrap midi skirt in a satin-touch fabric. Adjustable tie waist for a custom fit. Effortlessly transitions from day to night.",
        price: 3499,
        discount_price: null,
        category: "women",
        images: ["/images/cat-2.jpg", "/images/prod-1.jpg"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Terracotta", "Sage Green", "Ivory"],
        stock: 31,
        badge: "New Season",
    },
    {
        name: "Cropped Utility Jacket",
        description: "A structured utility jacket with a cropped silhouette and four functional pockets. Wear it open as a layering piece.",
        price: 5999,
        discount_price: 4999,
        category: "women",
        images: ["/images/new-2.jpg", "/images/cat-1.jpg"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Stone", "Army Green", "Black"],
        stock: 18,
        badge: "Sale",
    },
    {
        name: "Wide Leg Trousers",
        description: "High-rise wide leg trousers in a crepe fabric. Tailored to perfection with side seam pockets and a hook-and-eye closure.",
        price: 4299,
        discount_price: null,
        category: "women",
        images: ["/images/prod-2.jpg"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Ecru", "Black", "Cobalt"],
        stock: 24,
        badge: "",
    },

    // ──── FOOTWEAR ────
    {
        name: "Classic White Leather Sneakers",
        description: "Minimalist leather sneakers with a cupsole construction and tonal stitching. A wardrobe essential that pairs with everything.",
        price: 6999,
        discount_price: null,
        category: "footwear",
        images: ["/images/cat-3.jpg", "/images/prod-3.jpg"],
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["White", "Off-White", "Black"],
        stock: 47,
        badge: "Bestseller",
    },
    {
        name: "Suede Chelsea Boots",
        description: "Genuine suede Chelsea boots with an elastic gusset and stacked leather heel. Made for all-day comfort.",
        price: 9999,
        discount_price: 8499,
        category: "footwear",
        images: ["/images/prod-4.jpg"],
        sizes: ["6", "7", "8", "9", "10"],
        colors: ["Tan", "Dark Brown", "Black"],
        stock: 16,
        badge: "Premium",
    },
    {
        name: "Canvas Low-Top Sneakers",
        description: "Timeless canvas low-tops with a rubber vulcanised outsole and metal eyelet lacing. Available in a range of elevated colours.",
        price: 3499,
        discount_price: null,
        category: "footwear",
        images: ["/images/new-3.jpg"],
        sizes: ["6", "7", "8", "9", "10", "11", "12"],
        colors: ["Black", "Ecru", "Navy"],
        stock: 60,
        badge: "",
    },

    // ──── ACCESSORIES ────
    {
        name: "Woven Leather Belt",
        description: "Handcrafted woven leather belt with a brushed silver buckle. 3.5cm width. Available in three richly tanned shades.",
        price: 2599,
        discount_price: null,
        category: "accessories",
        images: ["/images/prod-1.jpg"],
        sizes: [],
        colors: ["Tan", "Black", "Chocolate"],
        stock: 35,
        badge: "Low Stock",
    },
    {
        name: "Structured Tote Bag",
        description: "A structured open-top tote in full-grain vegetable leather. Spacious enough for a laptop, features an interior zip pocket.",
        price: 8999,
        discount_price: 7499,
        category: "accessories",
        images: ["/images/cat-4.jpg", "/images/new-4.jpg"],
        sizes: [],
        colors: ["Sand", "Black", "Olive"],
        stock: 12,
        badge: "Staff Pick",
    },
    {
        name: "Ribbed Beanie",
        description: "Fine-knit merino wool beanie with a snug cuffed fit. Naturally temperature-regulating and itch-free.",
        price: 1499,
        discount_price: null,
        category: "accessories",
        images: ["/images/prod-2.jpg"],
        sizes: [],
        colors: ["Cream", "Charcoal", "Forest Green", "Burgundy"],
        stock: 80,
        badge: "Just Added",
    },
];

const adminUser = {
    name: "ZeroShift Admin",
    email: "admin@zeroshift.com",
    password: "Admin@123", // will be hashed
};

async function seed() {
    const bcrypt = require("bcryptjs");
    const client = await pool.connect();
    try {
        console.log("🌱 Starting seed...\n");

        // ─── Admin user ───
        const exists = await client.query("SELECT id FROM users WHERE email = $1", [adminUser.email]);
        if (!exists.rows.length) {
            const hashed = await bcrypt.hash(adminUser.password, 12);
            await client.query(
                "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'admin')",
                [adminUser.name, adminUser.email, hashed]
            );
            console.log(`✅ Admin user created: ${adminUser.email} / ${adminUser.password}`);
        } else {
            console.log(`ℹ️  Admin user already exists — skipped`);
        }

        // ─── Products ───
        let created = 0, skipped = 0;
        for (const p of products) {
            const exists = await client.query("SELECT id FROM products WHERE name = $1", [p.name]);
            if (exists.rows.length) { skipped++; continue; }

            await client.query(
                `INSERT INTO products
                 (name, description, price, discount_price, category, images, sizes, colors, stock, badge)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [p.name, p.description, p.price, p.discount_price, p.category,
                p.images, p.sizes, p.colors, p.stock, p.badge]
            );
            created++;
        }
        console.log(`✅ Products: ${created} created, ${skipped} already existed\n`);
        console.log("🎉 Seed complete!\n");

    } catch (err) {
        console.error("❌ Seed error:", err.message);
    } finally {
        client.release();
        pool.end();
    }
}

seed();
