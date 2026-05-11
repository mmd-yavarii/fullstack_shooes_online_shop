import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    const { id } = req.query;

    console.log('METHOD =>', req.method);

    try {
        await connectDB();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

    if (req.method === 'PUT') {
        try {
            const { title, price, description, images, group, category, gender, brand, sizes, discount, isActive } = req.body;

            // ساده‌ترین validation
            if (!title || !price) {
                return res.status(400).json({ message: 'Missing fields' });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    title,
                    price,
                    description,
                    images,
                    group,
                    category,
                    gender,
                    brand,
                    sizes,
                    discount,
                    isActive,
                },
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.status(200).json({
                message: 'Updated successfully',
                product: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Update failed' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
