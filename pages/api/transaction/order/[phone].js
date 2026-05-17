import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    const { phone } = req.query;

    if (!phone) {
        return res.status(400).json({
            message: 'Phone is required',
        });
    }

    try {
        await connectDB();

        const orders = await Transaction.find({ phone })
            .populate({
                path: 'items.product',
                select: 'title images',
            })
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                message: 'No orders found',
            });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Orders API Error:', error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}
