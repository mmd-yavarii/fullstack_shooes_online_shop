import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        fullName: String,
        phone: String,
        address: String,
        postalCode: String,

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

                price: {
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

        orderStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },

        totalPrice: {
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
