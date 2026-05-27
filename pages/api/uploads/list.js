import Product from '@/models/Product';
import BanerImg from '@/models/BanerImg';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

        const files = fs.readdirSync(uploadsPath);

        const products = await Product.find().select('images');
        const banners = await BanerImg.find().select('image');
        const allProductImages = [...products.flatMap((p) => p.images || []), ...banners.map((b) => b.image)];

        const images = files
            .filter(
                (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp') || file.endsWith('.gif')
            )
            .map((file) => ({
                name: file,
                url: `/uploads/${file}`,
                idProductImg: allProductImages.includes(`/uploads/${file}`),
            }));

        return res.status(200).json({
            count: images.length,
            images,

            allProductImages,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error reading uploads folder',
        });
    }
}
