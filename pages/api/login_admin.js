import jwt from 'jsonwebtoken';

import connectDB from '@/lib/db';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'متد مجاز نیست' });
    }

    try {
        await connectDB();

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'نام کاربری و رمز عبور الزامی است',
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: 'نام کاربری یا رمز عبور اشتباه است',
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                message: 'نام کاربری یا رمز عبور اشتباه است',
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.setHeader(
            'Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 2}; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
        );

        return res.status(200).json({
            message: 'ورود موفقیت‌آمیز بود',
        });
    } catch (error) {
        console.error('خطای سرور:', error);

        return res.status(500).json({
            message: 'خطای داخلی سرور',
        });
    }
}
