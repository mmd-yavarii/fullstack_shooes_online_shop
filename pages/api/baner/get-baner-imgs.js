// pages/api/baner/get-baner-imgs.js

import connectDB from '@/lib/db';
import BanerImg from '@/models/BanerImg';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const baners = await BanerImg.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'بنر ها دریافت شدند',
            baners,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
