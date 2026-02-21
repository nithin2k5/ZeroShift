const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: { type: String, required: true },
                image: { type: String },
                price: { type: Number, required: true },
                qty: { type: Number, required: true, default: 1 },
                size: { type: String },
                color: { type: String },
            }
        ],
        shippingAddress: {
            name: String,
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true, default: "Card" },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        status: {
            type: String,
            enum: ["Processing", "Dispatched", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
        },
        totalAmount: { type: Number, required: true },
        shippingCost: { type: Number, default: 0 },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
