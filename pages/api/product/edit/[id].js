import { verifyToken } from '@/helper/jwt';

import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    const { id } = req.query;

    // 🔒 auth
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    // method check
    if (req.method !== 'PUT') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const { title, price, description, images, group, category, gender, brand, sizes, discount, isActive } = req.body;

        // validation
        if (
            !title ||
            !description ||
            price === undefined ||
            !category ||
            !group ||
            !gender ||
            !brand?.name ||
            !Array.isArray(images) ||
            !Array.isArray(sizes)
        ) {
            return res.status(400).json({
                message: 'Missing or invalid fields',
            });
        }

        // validate price
        if (Number(price) < 0) {
            return res.status(400).json({
                message: 'Invalid price',
            });
        }

        // validate sizes
        const invalidSize = sizes.some((s) => !s.size || s.stock < 0 || !s.color);

        if (invalidSize) {
            return res.status(400).json({
                message: 'Invalid sizes data',
            });
        }

        // update product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                title,

                description,

                price: Number(price),

                discount: Number(discount || 0),

                images,

                group,

                category,

                gender,

                brand,

                sizes,

                isActive,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            message: 'Updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Update failed',
        });
    }
}
