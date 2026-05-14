import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

        // read folder
        const files = fs.readdirSync(uploadsPath);

        // فقط عکس‌ها
        const images = files
            .filter(
                (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp') || file.endsWith('.gif')
            )
            .map((file) => ({
                name: file,
                url: `/uploads/${file}`,
            }));

        return res.status(200).json({
            count: images.length,
            images,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error reading uploads folder',
        });
    }
}
