require("dotenv").config();
const { Pool } = require("pg");

const connStr = (process.env.DATABASE_URL || "")
    .replace(/[?&]channel_binding=[^&]*/g, "")
    .replace(/[?&]$/, "");

const pool = new Pool({
    connectionString: connStr
});

const customProducts = [
    {
        name: "ZeroShift Apex Puffer",
        description: "The ultimate streetwear winter essential. Featuring ultra-lightweight synthetic down and an iridescent aesthetic finish.",
        price: 11999.00,
        discount_price: null,
        category: "men",
        images: ["/images/new-1.jpg"],
        sizes: ["M", "L", "XL"],
        colors: ["Iridescent Black"],
        stock: 50,
        badge: "Exclusive"
    },
    {
        name: "Nebula Cargo Joggers",
        description: "Tactical everyday premium joggers with hidden zipper pockets and an articulated fit.",
        price: 4599.00,
        discount_price: 3999.00,
        category: "men",
        images: ["/images/new-2.jpg"],
        sizes: ["S", "M", "L"],
        colors: ["Charcoal", "Olive"],
        stock: 120,
        badge: "Trending"
    },
    {
        name: "Monochrome Oversized Hoodie",
        description: "A 400gsm pure cotton hoodie treated for an ultra-soft vintage washed feel.",
        price: 5999.00,
        discount_price: null,
        category: "women",
        images: ["/images/new-3.jpg"],
        sizes: ["S", "M"],
        colors: ["Washed Grey"],
        stock: 35,
        badge: "Just Added"
    }
];

async function addSamples() {
    console.log("Adding ultra-new sample products...");
    try {
        let added = 0;
        for (const p of customProducts) {
            await pool.query(
                `INSERT INTO products
                 (name, description, price, discount_price, category, images, sizes, colors, stock, badge)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [p.name, p.description, p.price, p.discount_price, p.category,
                p.images, p.sizes, p.colors, p.stock, p.badge]
            );
            added++;
            console.log(`Inserted: ${p.name}`);
        }
        console.log(`Successfully added ${added} fresh items.`);
    } catch (error) {
        console.error("Failed to add samples:", error);
    } finally {
        await pool.end();
        process.exit();
    }
}

addSamples();
