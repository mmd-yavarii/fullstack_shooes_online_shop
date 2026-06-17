import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const images = product.images || [];

        if (images.length > 0) {
            await Promise.all(
                images.map((img) =>
                    cloudinary.uploader.destroy(img.publicId, {
                        resource_type: 'image',
                    })
                )
            );
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Product and images deleted successfully',
            deletedImages: images.length,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}
