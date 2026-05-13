import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { verifyToken } from '@/helper/jwt';

function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    // 🔒 AUTH CHECK
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        await connectDB();

        const { title, description, price, discount, category, brand, gender, sizes, images, isActive, group } = req.body;

        // validation
        if (!title || !description || !price || !category || !brand?.name || !gender || !sizes?.length || !images?.length || !group) {
            return res.status(400).json({
                message: 'Invalid data - missing required fields',
            });
        }

        // create slug
        let slug = createSlug(title);

        // جلوگیری از slug تکراری
        const existingProduct = await Product.findOne({ slug });

        if (existingProduct) {
            slug = `${slug}-${Date.now()}`;
        }

        // create product
        const product = await Product.create({
            title,
            description,
            price: Number(price),
            discount: Number(discount || 0),
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
