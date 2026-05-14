// pages/api/baner/delete-baner-img/[id].js

import connectDB from '@/lib/db';
import BanerImg from '@/models/BanerImg';

import { verifyToken } from '@/helper/jwt';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        await connectDB();

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                message: 'شناسه بنر ارسال نشده',
            });
        }

        const baner = await BanerImg.findById(id);

        if (!baner) {
            return res.status(404).json({
                message: 'بنر پیدا نشد',
            });
        }

        await BanerImg.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'بنر با موفقیت حذف شد',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
