import { v2 as cloudinary } from 'cloudinary';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import BanerImg from '@/models/BanerImg';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const result = await cloudinary.search.expression('folder:products').max_results(200).execute();

        const products = await Product.find().select('images');
        const banners = await BanerImg.find().select('image');

        // فقط publicId واقعی و تمیز
        const usedPublicIds = new Set(
            [
                ...products.flatMap((p) => p.images || []).map((img) => img.publicId),
                ...banners.map((b) => b.image), // اگر banner هم publicId نیست، باید اصلاحش کنی
            ].filter(Boolean)
        );

        const images = result.resources.map((img) => {
            const isUsed = usedPublicIds.has(img.public_id);

            return {
                url: img.secure_url,
                publicId: img.public_id,
                usedInApp: isUsed,
            };
        });

        return res.status(200).json({ images });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
