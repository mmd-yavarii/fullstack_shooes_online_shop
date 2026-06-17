import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                return res.status(500).json({ message: 'Form parsing failed' });
            }

            const file = Array.isArray(files.image) ? files.image[0] : files.image;

            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            if (!file.mimetype || !file.mimetype.startsWith('image/')) {
                return res.status(400).json({ message: 'Invalid file type' });
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                folder: 'products',
                resource_type: 'image',
            });

            return res.status(200).json({
                message: 'Upload successful',
                url: result.secure_url,
                publicId: result.public_id,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Upload failed',
                error: error.message,
            });
        }
    });
}
