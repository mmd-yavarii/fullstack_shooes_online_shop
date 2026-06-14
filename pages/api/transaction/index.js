import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    try {
        await connectDB();

        const transactions = await Transaction.find({})
            .populate({
                path: 'items.product',
                select: 'title images',
            })
            .sort({ createdAt: -1 });

        // const transactions = await Transaction.find({}).limit(20).sort({ createdAt: -1 }).select('items user createdAt');
        //         .populate({
        //   path: 'items.product',
        //   select: 'title images price',
        // })

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
