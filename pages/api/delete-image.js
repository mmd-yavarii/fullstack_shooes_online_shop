import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            message: 'Image url is required',
        });
    }

    try {
        const filePath = path.join(process.cwd(), 'public', url);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: 'File not found',
            });
        }

        fs.unlinkSync(filePath);

        return res.status(200).json({
            message: 'File deleted successfully',
            url,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to delete file',
        });
    }
}
