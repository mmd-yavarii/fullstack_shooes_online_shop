import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

// normalize phone (very important)
const normalizePhone = (phone) => {
    if (!phone) return '';

    return phone
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .replace(/\D/g, '');
};

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

        const cleanPhone = normalizePhone(phone);

        const orders = await Transaction.find({
            'user.phone': cleanPhone,
        })
            .select('-__v') // پاکسازی اضافی
            .populate({
                path: 'items.product',
                select: 'title images price',
            })
            .sort({ createdAt: -1 });

        // بهتر از 404
        return res.status(200).json({
            data: orders,
            count: orders.length,
        });
    } catch (error) {
        console.error('Orders API Error:', error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}
