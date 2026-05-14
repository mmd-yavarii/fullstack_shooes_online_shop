// pages/api/baner/add-baner-img.js

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

        if (!image || !title || !description) {
            return res.status(400).json({
                message: 'image, title, description الزامی هستند',
            });
        }

        const banner = await BanerImg.create({
            image,
            title,
            description,
        });

        return res.status(201).json({
            message: 'بنر با موفقیت ایجاد شد',
            banner,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
