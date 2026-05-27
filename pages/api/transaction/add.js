import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { user, items, pricing } = req.body;

        if (!user || !items?.length) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const formattedItems = items.map((item) => {
            const quantity = item.quantity || 1;
            const price = item.price;

            const discount = item.discount || 0;

            const finalUnitPrice = price - (price * discount) / 100;

            return {
                product: item.productId,
                quantity,
                unitPrice: price,
                discount,
                finalPrice: finalUnitPrice * quantity,
                size: item.size,
                color: item.color,
            };
        });

        const totalOriginalPrice = formattedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

        const totalDiscount = formattedItems.reduce((sum, item) => {
            const original = item.unitPrice * item.quantity;
            const discounted = item.finalPrice;
            return sum + (original - discounted);
        }, 0);

        const totalPrice = totalOriginalPrice - totalDiscount;

        const transaction = await Transaction.create({
            user: {
                fullName: user.fullName, // 👈 بهتر و تمیزتر
                phone: user.phone,
                address: user.address,
                postalCode: user.postalCode,
            },

            items: formattedItems,

            pricing: {
                totalOriginalPrice,
                totalDiscount,
                totalFinalPrice: totalPrice,
            },

            orderStatus: 'pending',
            paymentStatus: 'unpaid',
        });

        return res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
