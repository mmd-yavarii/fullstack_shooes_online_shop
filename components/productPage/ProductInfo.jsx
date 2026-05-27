import React from 'react';
import { Typography } from '@mui/material';

function ProductInfo({ product, finalPrice }) {
    if (!product) return null;

    return (
        <div className="flex flex-col gap-2">
            <Typography variant="h4">{product.title}</Typography>

            <Typography color="text.secondary">{product.description}</Typography>

            <div className="flex items-center gap-3 mt-2">
                {product.discount > 0 && (
                    <Typography
                        sx={{
                            textDecoration: 'line-through',
                            color: '#888',
                        }}
                    >
                        {product.price.toLocaleString()} ریال
                    </Typography>
                )}

                <Typography color="primary" variant="h6">
                    {finalPrice.toLocaleString()} ریال
                </Typography>

                {product.discount > 0 && (
                    <Typography
                        sx={{
                            background: 'red',
                            color: 'white',
                            px: 1,
                            borderRadius: 1,
                            fontSize: 12,
                        }}
                    >
                        -{product.discount}%
                    </Typography>
                )}
            </div>
        </div>
    );
}

export default ProductInfo;
