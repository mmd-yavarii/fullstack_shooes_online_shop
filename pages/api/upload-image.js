import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // ساخت پوشه اگر وجود نداشت
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        filename: (name, ext, part) => {
            return `${Date.now()}-${part.originalFilename}`;
        },
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({
                message: 'Upload failed',
            });
        }

        const file = files.image?.[0] || files.image;

        if (!file) {
            return res.status(400).json({
                message: 'No file uploaded',
            });
        }

        const fileName = path.basename(file.filepath);

        const fileUrl = `/uploads/${fileName}`;

        return res.status(200).json({
            message: 'File uploaded successfully',
            url: fileUrl,
        });
    });
}
