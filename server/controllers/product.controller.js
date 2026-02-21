const { pool } = require("../config/db");

// @desc   Get all products (with filters + pagination)
// @route  GET /api/products
const getProducts = async (req, res, next) => {
    try {
        const { category, search, sort, minPrice, maxPrice, limit = 20, page = 1 } = req.query;
        const conditions = ["is_active = TRUE"];
        const values = [];
        let idx = 1;

        if (category) { conditions.push(`category = $${idx++}`); values.push(category); }
        if (search) { conditions.push(`name ILIKE $${idx++}`); values.push(`%${search}%`); }
        if (minPrice) { conditions.push(`price >= $${idx++}`); values.push(Number(minPrice)); }
        if (maxPrice) { conditions.push(`price <= $${idx++}`); values.push(Number(maxPrice)); }

        const where = `WHERE ${conditions.join(" AND ")}`;
        const orderMap = { "price-asc": "price ASC", "price-desc": "price DESC", newest: "created_at DESC" };
        const orderBy = `ORDER BY ${orderMap[sort] || "created_at DESC"}`;

        const offset = (Number(page) - 1) * Number(limit);
        const countResult = await pool.query(`SELECT COUNT(*) FROM products ${where}`, values);
        const total = parseInt(countResult.rows[0].count, 10);

        const queryValues = [...values, Number(limit), offset];
        const result = await pool.query(
            `SELECT * FROM products ${where} ${orderBy} LIMIT $${idx++} OFFSET $${idx++}`,
            queryValues
        );

        res.json({
            success: true,
            count: result.rows.length,
            total,
            pages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            products: result.rows,
        });
    } catch (error) { next(error); }
};

// @desc   Get single product
// @route  GET /api/products/:id
const getProductById = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1 AND is_active = TRUE", [req.params.id]);
        if (!result.rows.length) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product: result.rows[0] });
    } catch (error) { next(error); }
};

// @desc   Create product
// @route  POST /api/products
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, discount_price, category, images, sizes, colors, stock, badge } = req.body;
        const result = await pool.query(
            `INSERT INTO products (name, description, price, discount_price, category, images, sizes, colors, stock, badge)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [name, description || "", price, discount_price || null, category, images || [], sizes || [], colors || [], stock || 0, badge || ""]
        );
        res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) { next(error); }
};

// @desc   Update product
// @route  PUT /api/products/:id
const updateProduct = async (req, res, next) => {
    try {
        const fields = [];
        const values = [];
        let idx = 1;
        const allowed = ["name", "description", "price", "discount_price", "category", "images", "sizes", "colors", "stock", "badge", "is_active"];
        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                fields.push(`${key} = $${idx++}`);
                values.push(req.body[key]);
            }
        }
        if (!fields.length) return res.status(400).json({ success: false, message: "No fields to update" });
        values.push(req.params.id);
        const result = await pool.query(
            `UPDATE products SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
            values
        );
        if (!result.rows.length) return res.status(404).json({ success: false, message: "Product not found" });
        res.json({ success: true, product: result.rows[0] });
    } catch (error) { next(error); }
};

// @desc   Soft-delete product
// @route  DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
    try {
        const result = await pool.query(
            "UPDATE products SET is_active = FALSE WHERE id = $1 RETURNING id",
            [req.params.id]
        );
        if (!result.rows.length) return res.status(404).json({ success: false, message: "Product not found" });
        res.json({ success: true, message: "Product removed" });
    } catch (error) { next(error); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
