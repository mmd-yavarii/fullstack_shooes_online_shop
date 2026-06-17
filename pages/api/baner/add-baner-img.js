import connectDB from '@/lib/db';
import BanerImg from '@/models/BanerImg';
import { verifyToken } from '@/helper/jwt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await connectDB();

        const { image, title, description } = req.body;

        // 🔴 VALIDATION سخت‌گیرانه (مهم‌ترین بخش)
        if (!image || !title || !description) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }

        if (typeof image !== 'object' || typeof image.url !== 'string' || typeof image.publicId !== 'string') {
            return res.status(400).json({
                message: 'Image format is invalid',
                expected: {
                    url: 'string',
                    publicId: 'string',
                },
            });
        }

        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).json({
                message: 'title and description must be strings',
            });
        }

        // 🔵 Clean data (important)
        const cleanData = {
            image: {
                url: image.url.trim(),
                publicId: image.publicId.trim(),
            },
            title: title.trim(),
            description: description.trim(),
        };

        const banner = await BanerImg.create(cleanData);

        return res.status(201).json({
            message: 'Banner created successfully',
            banner,
        });
    } catch (error) {
        console.error('ADD BANNER ERROR:', error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
