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

        const userCount = await User.countDocuments();

        // حداکثر 3 نفر
        if (userCount >= 3) {
            return res.status(403).json({
                message: 'ظرفیت ثبت‌نام تکمیل شده است',
            });
        }

        const newUser = await User.create({
            username,
            password,
        });

        return res.status(201).json({
            message: 'ادمین با موفقیت ساخته شد',
            user: {
                id: newUser._id,
                username: newUser.username,
            },
        });
    } catch (err) {
        console.error('خطای سرور:', err);

        return res.status(500).json({
            message: 'خطای داخلی سرور',
        });
    }
}
