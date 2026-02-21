const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true, min: 0 },
        discountPrice: { type: Number, default: null },
        category: {
            type: String,
            required: true,
            enum: ["men", "women", "accessories", "footwear"],
            lowercase: true,
        },
        images: [{ type: String }],
        sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] }],
        colors: [{ type: String }],
        stock: { type: Number, required: true, default: 0 },
        badge: { type: String, default: "" }, // e.g., "New Arrival", "Trending", "Sale"
        isActive: { type: Boolean, default: true },
        ratings: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
