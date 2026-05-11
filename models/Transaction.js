import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        postalCode: {
            type: String,
            required: true,
            trim: true,
        },

        nationalCode: {
            type: String,
            required: true,
            trim: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },

        orderStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },

        finalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.index({ phone: 1 });

transactionSchema.index({ nationalCode: 1 });

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
