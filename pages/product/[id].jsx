import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Button, Card, CardMedia } from '@mui/material';

function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/product/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'خطا در دریافت محصول');
                }

                setProduct(data.product);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-gray-500">محصولی پیدا نشد</div>;
    }

    return (
        <div className="max-w-[900px] mx-auto p-4 flex flex-col gap-6">
            {/* IMAGE */}
            <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                <CardMedia component="img" height="400" image={product.image} alt={product.title} />
            </Card>

            {/* INFO */}
            <div className="flex flex-col gap-3">
                <Typography variant="h4" fontWeight={700}>
                    {product.title}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {product.description}
                </Typography>

                {product.price && (
                    <Typography variant="h6" color="primary">
                        {product.price.toLocaleString()} تومان
                    </Typography>
                )}
            </div>

            {/* ACTION */}
            <Button variant="contained" size="large" sx={{ borderRadius: '12px' }}>
                افزودن به سبد خرید
            </Button>
        </div>
    );
}

export default ProductPage;
