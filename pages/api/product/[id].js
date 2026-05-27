import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            await connectDB();

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: 'محصول یافت نشد' });
            }

            return res.status(200).json({ product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'خطای سرور' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
