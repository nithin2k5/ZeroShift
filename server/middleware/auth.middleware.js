const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

// Protect — requires valid JWT
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, no token" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query(
            "SELECT id, name, email, phone, role FROM users WHERE id = $1",
            [decoded.id]
        );
        if (!result.rows.length) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.user = result.rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
};

// Admin Only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") return next();
    return res.status(403).json({ success: false, message: "Admin access required" });
};

module.exports = { protect, adminOnly };
