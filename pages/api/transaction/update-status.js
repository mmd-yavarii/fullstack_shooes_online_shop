import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const { id, orderStatus } = req.body;

        if (!id || !orderStatus) {
            return res.status(400).json({
                message: 'اطلاعات ناقص است',
            });
        }

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: 'تراکنش پیدا نشد',
            });
        }

        transaction.orderStatus = orderStatus;

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: 'وضعیت سفارش بروزرسانی شد',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
