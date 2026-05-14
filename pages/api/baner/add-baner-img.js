// pages/api/baner/add-baner-img.js

import connectDB from '@/lib/db';
import BanerImg from '@/models/BanerImg';

import { verifyToken } from '@/helper/jwt';

export default async function handler(req, res) {
    // فقط POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    // 🔒 AUTH
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        await connectDB();

        const { images } = req.body;

        if (!images || !Array.isArray(images) || !images.length) {
            return res.status(400).json({
                message: 'تصاویر بنر الزامی هستند',
            });
        }

        const formattedImages = images.map((item) => ({
            image: item,
        }));

        const baners = await BanerImg.insertMany(formattedImages);

        return res.status(201).json({
            message: 'بنر ها با موفقیت ایجاد شدند',
            baners,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
