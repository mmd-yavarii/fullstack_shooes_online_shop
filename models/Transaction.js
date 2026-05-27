import mongoose from 'mongoose';
import Product from './Product';

const transactionSchema = new mongoose.Schema(
    {
        user: {
            fullName: String,
            phone: String,
            address: String,
            postalCode: String,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                unitPrice: {
                    type: Number,
                    required: true,
                },

                discount: {
                    type: Number,
                    default: 0,
                },

                finalPrice: {
                    type: Number,
                    required: true,
                },

                size: {
                    type: String,
                    required: true,
                },

                color: {
                    type: String,
                    required: true,
                },
            },
        ],

        pricing: {
            totalOriginalPrice: Number,
            totalDiscount: Number,
            totalFinalPrice: Number,
        },

        orderStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },

        paymentStatus: {
            type: String,
            enum: ['unpaid', 'pending', 'paid', 'failed', 'refunded'],
            default: 'unpaid',
        },

        authority: {
            type: String,
            unique: true,
            sparse: true,
        },

        refId: String,

        cardPan: String,

        paidAt: Date,
    },
    {
        timestamps: true,
    }
);

transactionSchema.index({ 'user.phone': 1 });

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
