import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
        },

        category: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        images: [String],

        brand: {
            id: String,
            name: String,
            slug: String,
        },

        group: {
            type: String,
            enum: ['shoes', 'accessory', 'clothes', 'bag', 'box'],
            required: true,
        },

        gender: {
            type: String,
            enum: ['male', 'female', 'boy_kids', 'girl_kids', 'none'],
            required: true,
        },

        sizes: [
            {
                size: { type: String, required: true },
                stock: { type: Number, required: true, min: 0 },
                color: { type: String, required: true },
            },
        ],

        soldCount: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

ProductSchema.index({ group: 1, category: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ category: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
