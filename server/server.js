// ⚠️ dotenv MUST be the very first thing — before any other require
// because db.js reads process.env.DATABASE_URL at module load time
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

// Route Imports
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/user.routes");

// Connect to Supabase PostgreSQL (with retry + no crash on failure)
connectDB();

const app = express();

// Middleware
// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5005",
    process.env.CLIENT_URL,
].filter(Boolean);

// Belt-and-suspenders: set headers on every response including OPTIONS preflight
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ZeroShift API is running", db: "Supabase PostgreSQL" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 ZeroShift API running on http://localhost:${PORT}`);
});

module.exports = app;
