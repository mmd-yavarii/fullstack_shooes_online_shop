import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { user, items } = req.body;

        console.log('RECEIVED:', req.body);

        if (!user || !items?.length) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const formattedItems = items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
            discount: item.discount || 0,
            finalPrice: item.price - (item.price * (item.discount || 0)) / 100,
            size: item.size,
            color: item.color,
        }));

        const totalOriginalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const totalDiscount = items.reduce((sum, item) => {
            const discount = item.discount || 0;
            return sum + ((item.price * discount) / 100) * item.quantity;
        }, 0);

        const totalPrice = totalOriginalPrice - totalDiscount;

        const transaction = await Transaction.create({
            user: {
                fullName: `${user.firstName} ${user.lastName}`,
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

            paymentStatus: 'pending',
        });

        console.log('CREATED:', transaction);

        return res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error('TRANSACTION ERROR:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
