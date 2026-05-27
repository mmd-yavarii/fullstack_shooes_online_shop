import React from 'react';
import { Typography, Box, Chip } from '@mui/material';

function ProductInfo({ product, finalPrice }) {
    if (!product) return null;

    const hasDiscount = product.discount > 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
            }}
        >
            {/* TITLE */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: '#111',
                }}
            >
                {product.title}
            </Typography>

            {/* DESCRIPTION */}
            <Typography
                variant="body2"
                sx={{
                    color: '#666',
                    lineHeight: 1.8,
                    maxWidth: 600,
                }}
            >
                {product.description}
            </Typography>

            {/* PRICE SECTION */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mt: 1,
                    flexWrap: 'wrap',
                }}
            >
                {hasDiscount && (
                    <Typography
                        sx={{
                            textDecoration: 'line-through',
                            color: '#999',
                            fontSize: 15,
                        }}
                    >
                        {product.price.toLocaleString()} ریال
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: '#111',
                    }}
                >
                    {finalPrice.toLocaleString()} ریال
                </Typography>

                {hasDiscount && (
                    <Chip
                        label={`٪${product.discount} تخفیف`}
                        size="small"
                        sx={{
                            backgroundColor: '#ff3b30',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 12,
                            height: 24,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;
