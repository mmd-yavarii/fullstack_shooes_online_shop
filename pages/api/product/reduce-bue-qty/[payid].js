import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { payid } = req.query;

    try {
        await connectDB();

        const transaction = await Transaction.findOne({ refId: payid });

        if (!transaction) {
            return res.status(404).json({ message: 'تراکنش یافت نشد' });
        }

        if (transaction.inventory_updated) {
            return res.status(409).json({
                message: 'تراکنش قبلاً پردازش شده',
            });
        }

        const updatePromises = transaction.items.map(async (item) => {
            const { product: productId, size, color, quantity } = item;

            if (!productId || !size || !color || !quantity) {
                console.warn(`Invalid item data in transaction: ${payid}`);
                return null;
            }

            const result = await Product.updateOne(
                {
                    _id: productId,
                    'sizes.size': size,
                    'sizes.color': color,
                },
                {
                    $inc: {
                        'sizes.$.stock': -quantity,
                    },
                }
            );

            return result;
        });

        await Promise.all(updatePromises);

        await Transaction.updateOne({ refId: payid }, { status: 'paid', inventory_updated: true });

        return res.status(200).json({ message: 'موجودی کسر و تراکنش تایید شد' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'خطای سرور در بروزرسانی موجودی' });
    }
}
