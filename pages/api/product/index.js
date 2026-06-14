import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const page = parseInt(req.query.page || '1', 10);
        const perpage = 8;

        const category = req.query.categoryGroup || 'all';
        const subCategory = req.query.subCategory || 'all';
        const onlyDiscounts = req.query.discounts === 'true';

        const search = req.query.search?.trim();

        const filter = {};

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        if (onlyDiscounts) {
            filter.discount = { $gt: 0 };
        }

        if (category !== 'all') {
            filter.group = category;
        }

        if (subCategory !== 'all') {
            filter.category = subCategory;
        }

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .limit(perpage)
            .skip((page - 1) * perpage);

        const productsLength = await Product.countDocuments(filter);

        return res.status(200).json({
            message: 'Products fetched successfully',
            products,
            productsLength,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
