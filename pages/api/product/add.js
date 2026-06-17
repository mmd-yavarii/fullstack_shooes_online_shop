import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { verifyToken } from '@/helper/jwt';

function createSlug(title) {
    return title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    // AUTH
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        await connectDB();

        let { title, description, price, discount = 0, category, brand, gender, sizes, images, isActive = true, group } = req.body;

        // VALIDATION
        if (!title || !description || price === undefined || !category || !group || !brand?.name || !gender) {
            return res.status(400).json({
                message: 'Missing required fields',
            });
        }

        if (Number(price) < 0) {
            return res.status(400).json({
                message: 'Invalid price',
            });
        }

        if (Number(discount) < 0 || Number(discount) > 100) {
            return res.status(400).json({
                message: 'Discount must be between 0 and 100',
            });
        }

        if (!Array.isArray(sizes) || sizes.length === 0) {
            return res.status(400).json({
                message: 'At least one size is required',
            });
        }

        // 🔥 FIXED IMAGES HANDLING (IMPORTANT PART)
        if (!Array.isArray(images)) {
            images = [];
        }

        images = images
            .filter(Boolean)
            .map((img) => {
                if (typeof img === 'string') {
                    return {
                        url: img,
                        publicId: null,
                    };
                }

                return {
                    url: img?.url || '',
                    publicId: img?.publicId || null,
                };
            })
            .filter((img) => img.url);

        if (images.length === 0) {
            return res.status(400).json({
                message: 'At least one image is required',
            });
        }

        // SLUG
        const baseSlug = createSlug(title);
        let slug = baseSlug || `product-${Date.now()}`;

        const existingProduct = await Product.findOne({ slug });

        if (existingProduct) {
            slug = `${slug}-${Date.now()}`;
        }

        // CREATE PRODUCT
        const product = await Product.create({
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            discount: Number(discount),
            category,
            group,
            gender,
            brand,
            sizes,
            images,
            isActive,
            slug,
        });

        return res.status(201).json({
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
}
