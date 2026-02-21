const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

// ─── Singleton Pool ────────────────────────────────────────────────────────────
// Node's module cache ensures this is created only ONCE per process lifetime.
// ALL modules that require this file share the exact same pool instance.
let pool;

function getPool() {
    if (pool) return pool;

    // Strip any unsupported parameters pg-pool can't parse
    let connStr = process.env.DATABASE_URL || "";
    connStr = connStr
        .replace(/[?&]channel_binding=[^&]*/g, "")  // Remove channel_binding
        .replace(/[?&]$/, "");                        // Clean trailing ? or &

    pool = new Pool({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        max: 10,
        min: 2,
        idleTimeoutMillis: 60000,
        connectionTimeoutMillis: 8000,
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
    });

    pool.on("connect", (client) => {
        client.query("SET statement_timeout = 30000").catch(() => { });
    });

    pool.on("error", (err) => {
        console.error("⚠️  DB pool error (recovering):", err.message);
        // pg-pool auto-creates a replacement — no crash needed
    });

    // ─── Keep-alive ping every 25 seconds ─────────────────────────────────────
    // Supabase drops idle connections — keep the pool warm with a ping.
    // A lightweight SELECT 1 keeps at least one connection warm.
    const timer = setInterval(async () => {
        try {
            await pool.query("SELECT 1");
        } catch (err) {
            console.warn("⚠️  Keep-alive ping failed:", err.message);
        }
    }, 25_000);
    timer.unref(); // Don't block clean process exit

    console.log("✅ DB singleton pool created");
    return pool;
}

// ─── Connect + auto-run schema ─────────────────────────────────────────────────
const connectDB = async (retries = 5, delay = 2000) => {
    const p = getPool();

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const client = await p.connect();
            try {
                await client.query("SELECT 1");
                console.log("✅ Supabase DB connection verified");

                const schemaPath = path.join(__dirname, "schema.sql");
                if (fs.existsSync(schemaPath)) {
                    await client.query(fs.readFileSync(schemaPath, "utf8"));
                    console.log("✅ DB schema verified / tables ready");
                }
                return; // success
            } finally {
                client.release();
            }
        } catch (err) {
            console.error(`❌ DB connect attempt ${attempt}/${retries}:`, err.message);
            if (attempt < retries) {
                console.log(`   Retrying in ${delay / 1000}s...`);
                await new Promise((r) => setTimeout(r, delay));
                delay *= 1.5; // Exponential back-off
            } else {
                // Don't crash the server — API will return 503 until DB recovers
                console.error("❌ Could not connect to DB after all retries. Server running without DB.");
            }
        }
    }
};

// Export the singleton — module cache ensures this runs only once
module.exports = { pool: getPool(), connectDB };
