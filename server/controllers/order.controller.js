const { pool } = require("../config/db");
const { sendEmail, orderConfirmationEmail } = require("../config/mailer");

// @desc   Create new order
// @route  POST /api/orders
const createOrder = async (req, res, next) => {
    const client = await pool.connect();
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        if (!items || !items.length) {
            return res.status(400).json({ success: false, message: "No order items" });
        }

        const totalAmount = items.reduce((acc, i) => acc + i.price * i.qty, 0);

        await client.query("BEGIN");

        const orderResult = await client.query(
            `INSERT INTO orders (user_id, shipping_name, shipping_street, shipping_city, shipping_state, shipping_zip, shipping_country, payment_method, total_amount)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [
                req.user.id,
                shippingAddress.name || req.user.name,
                shippingAddress.street,
                shippingAddress.city,
                shippingAddress.state,
                shippingAddress.zip,
                shippingAddress.country || "India",
                paymentMethod || "Card",
                totalAmount,
            ]
        );
        const order = orderResult.rows[0];

        // Insert line items
        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, product_id, name, image, price, qty, size, color)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [order.id, item.product_id || null, item.name, item.image || "", item.price, item.qty, item.size || "", item.color || ""]
            );
        }

        await client.query("COMMIT");

        // Send order confirmation email (non-blocking)
        sendEmail({ to: req.user.email, ...orderConfirmationEmail(order, items) }).catch(console.error);

        res.status(201).json({ success: true, order: { ...order, items } });
    } catch (error) {
        await client.query("ROLLBACK");
        next(error);
    } finally {
        client.release();
    }
};

// @desc   Get current user's orders
// @route  GET /api/orders/my-orders
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await pool.query(
            `SELECT o.*,
                json_agg(json_build_object('id', oi.id, 'name', oi.name, 'image', oi.image, 'price', oi.price, 'qty', oi.qty, 'size', oi.size, 'color', oi.color)) AS items
             FROM orders o
             LEFT JOIN order_items oi ON oi.order_id = o.id
             WHERE o.user_id = $1
             GROUP BY o.id
             ORDER BY o.created_at DESC`,
            [req.user.id]
        );
        res.json({ success: true, orders: orders.rows });
    } catch (error) { next(error); }
};

// @desc   Get single order
// @route  GET /api/orders/:id
const getOrderById = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT o.*, u.name AS user_name, u.email AS user_email,
                json_agg(json_build_object('id', oi.id, 'name', oi.name, 'image', oi.image, 'price', oi.price, 'qty', oi.qty, 'size', oi.size)) AS items
             FROM orders o
             LEFT JOIN users u ON u.id = o.user_id
             LEFT JOIN order_items oi ON oi.order_id = o.id
             WHERE o.id = $1
             GROUP BY o.id, u.name, u.email`,
            [req.params.id]
        );
        if (!result.rows.length) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        const order = result.rows[0];
        if (order.user_id !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        res.json({ success: true, order });
    } catch (error) { next(error); }
};

// @desc   All orders (Admin)
// @route  GET /api/orders
const getAllOrders = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT o.*, u.name AS user_name, u.email AS user_email
             FROM orders o
             LEFT JOIN users u ON u.id = o.user_id
             ORDER BY o.created_at DESC`
        );
        res.json({ success: true, count: result.rows.length, orders: result.rows });
    } catch (error) { next(error); }
};

// @desc   Update order status (Admin)
// @route  PUT /api/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const deliveredAt = status === "Delivered" ? new Date() : null;
        const result = await pool.query(
            `UPDATE orders SET status = $1, delivered_at = COALESCE($2, delivered_at), updated_at = NOW() WHERE id = $3 RETURNING *`,
            [status, deliveredAt, req.params.id]
        );
        if (!result.rows.length) return res.status(404).json({ success: false, message: "Order not found" });
        res.json({ success: true, order: result.rows[0] });
    } catch (error) { next(error); }
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
