import connectDB from '@/lib/db';
import { verifyToken } from '@/helper/jwt';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await connectDB();

        const { paymentid } = req.query;

        if (!paymentid) {
            return res.status(400).json({
                message: 'paymentid الزامی است',
            });
        }

        const transaction = await Transaction.findById(paymentid);

        if (!transaction) {
            return res.status(404).json({
                message: 'تراکنش پیدا نشد',
            });
        }

        if (transaction.paymentStatus !== 'paid') {
            return res.status(400).json({
                message: 'فقط پرداخت موفق قابل بازگشت است',
            });
        }

        transaction.paymentStatus = 'refunded';
        await transaction.save();

        return res.status(200).json({
            message: 'بازگشت وجه با موفقیت انجام شد',
            paymentStatus: transaction.paymentStatus,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
