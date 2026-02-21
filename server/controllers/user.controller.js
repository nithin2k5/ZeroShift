const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");

// @desc   Get user profile + addresses
// @route  GET /api/users/profile
const getUserProfile = async (req, res, next) => {
    try {
        const user = await pool.query(
            "SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1",
            [req.user.id]
        );
        const addresses = await pool.query(
            "SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC",
            [req.user.id]
        );
        res.json({ success: true, user: user.rows[0], addresses: addresses.rows });
    } catch (error) { next(error); }
};

// @desc   Update profile
// @route  PUT /api/users/profile
const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email, phone, currentPassword, newPassword } = req.body;
        let passwordClause = "";
        const values = [name, email, phone || ""];

        if (newPassword) {
            const userRow = await pool.query("SELECT password FROM users WHERE id = $1", [req.user.id]);
            const valid = await bcrypt.compare(currentPassword, userRow.rows[0].password);
            if (!valid) return res.status(400).json({ success: false, message: "Current password is incorrect" });
            const hashed = await bcrypt.hash(newPassword, 12);
            values.push(hashed);
            passwordClause = `, password = $${values.length}`;
        }

        values.push(req.user.id);
        const result = await pool.query(
            `UPDATE users SET name=$1, email=$2, phone=$3${passwordClause}, updated_at=NOW() WHERE id=$${values.length} RETURNING id, name, email, phone, role`,
            values
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (error) { next(error); }
};

// @desc   Add address
// @route  POST /api/users/addresses
const addAddress = async (req, res, next) => {
    try {
        const { type, name, street, city, state, zip, country, is_default } = req.body;
        if (is_default) {
            await pool.query("UPDATE addresses SET is_default = FALSE WHERE user_id = $1", [req.user.id]);
        }
        const result = await pool.query(
            "INSERT INTO addresses (user_id, type, name, street, city, state, zip, country, is_default) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
            [req.user.id, type || "Home", name || "", street, city, state, zip, country || "India", is_default || false]
        );
        res.status(201).json({ success: true, address: result.rows[0] });
    } catch (error) { next(error); }
};

// @desc   Delete address
// @route  DELETE /api/users/addresses/:addressId
const deleteAddress = async (req, res, next) => {
    try {
        await pool.query("DELETE FROM addresses WHERE id = $1 AND user_id = $2", [req.params.addressId, req.user.id]);
        res.json({ success: true, message: "Address removed" });
    } catch (error) { next(error); }
};

// @desc   All users (Admin)
// @route  GET /api/users
const getAllUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
        res.json({ success: true, count: result.rows.length, users: result.rows });
    } catch (error) { next(error); }
};

module.exports = { getUserProfile, updateUserProfile, addAddress, deleteAddress, getAllUsers };
