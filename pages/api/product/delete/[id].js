import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectDB();

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Product id is required' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            id: deletedProduct._id,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}
