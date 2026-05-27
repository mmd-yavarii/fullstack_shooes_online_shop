import React from 'react';
import { Typography, Box, Chip, Button } from '@mui/material';

const primary = '#6d071a';
const primaryDark = '#4a0411';

function ProductActions({
    colors,
    sizes,
    selectedColor,
    setSelectedColor,
    setSizeId,
    selectedSize,
    setSelectedSize,
    totalStock,
    cartItem,
    decreaseQuantity,
    handleAdd,
    product,
}) {
    const isOutOfStock = totalStock === 0 || sizes.reduce((sum, item) => sum + (item.stock || 0), 0) <= 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* COLORS */}
            <Box>
                <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: 14, color: primary }}>رنگ</Typography>

                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {colors.map((color) => {
                        const isSelected = selectedColor === color;

                        return (
                            <Box
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                title={color}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    cursor: 'pointer',
                                    border: '2px solid #fff',
                                    outline: isSelected ? `2px solid ${primary}` : '2px solid transparent',
                                    boxShadow: isSelected ? `0 0 0 4px rgba(109,7,26,0.15)` : 'none',
                                    transition: 'all 0.25s ease',
                                    position: 'relative',
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* SIZES */}
            <Box>
                <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: 14, color: primary }}>سایز</Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {sizes.map((size) => {
                        const isSelected = selectedSize === size.size;
                        const isOut = size.stock === 0;

                        return (
                            <Chip
                                key={size.size}
                                label={size.size}
                                onClick={() => !isOut && setSelectedSize(size.size)}
                                disabled={isOut}
                                sx={{
                                    height: 40,
                                    minWidth: 44,
                                    borderRadius: 2,
                                    fontWeight: 700,

                                    backgroundColor: isOut ? '#f3f4f6' : isSelected ? primary : '#fff',

                                    color: isOut ? '#9ca3af' : isSelected ? '#fff' : primary,

                                    border: '1px solid #e5e7eb',
                                    cursor: isOut ? 'not-allowed' : 'pointer',
                                    opacity: isOut ? 0.5 : 1,
                                    transition: 'all 0.2s ease',

                                    '&:hover': {
                                        backgroundColor: isOut ? '#f3f4f6' : isSelected ? primaryDark : '#fbeaec',
                                        transform: isOut ? 'none' : 'translateY(-2px)',
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* OUT OF STOCK */}
            {isOutOfStock && (
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: primaryDark,
                        fontWeight: 600,
                        fontSize: 14,
                    }}
                >
                    این گزینه در حال حاضر موجود نیست، لطفاً رنگ یا سایز دیگری را انتخاب کنید
                </Typography>
            )}

            {/* CART BAR */}
            {!isOutOfStock && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 18,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 999,
                        px: 2,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 1100, display: 'flex', justifyContent: 'center' }}>
                        {cartItem ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    px: 2.5,
                                    py: 1.2,
                                    borderRadius: '999px',

                                    background: 'rgba(109,7,26,0.92)',
                                    backdropFilter: 'blur(14px)',

                                    color: '#fff',
                                    boxShadow: `0 12px 35px rgba(109,7,26,0.25)`,
                                    border: '1px solid rgba(109,7,26,0.25)',

                                    transition: 'all 0.25s ease',

                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 18px 45px rgba(109,7,26,0.35)`,
                                    },
                                }}
                            >
                                <Button
                                    onClick={() => decreaseQuantity(product._id, selectedSize, selectedColor)}
                                    sx={{
                                        minWidth: 38,
                                        width: 38,
                                        height: 38,
                                        borderRadius: '50%',
                                        color: '#fff',
                                        fontSize: 22,
                                        fontWeight: 700,
                                        background: 'rgba(255,255,255,0.12)',

                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.2)',
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    −
                                </Button>

                                <Typography sx={{ fontWeight: 800, minWidth: 30, textAlign: 'center' }}>{cartItem.quantity}</Typography>

                                <Button
                                    onClick={handleAdd}
                                    sx={{
                                        minWidth: 38,
                                        width: 38,
                                        height: 38,
                                        borderRadius: '50%',
                                        color: '#fff',
                                        fontSize: 22,
                                        fontWeight: 700,
                                        background: 'rgba(255,255,255,0.12)',

                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.2)',
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    +
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleAdd}
                                sx={{
                                    width: '100%',
                                    maxWidth: 420,
                                    py: 1.6,
                                    borderRadius: '999px',

                                    fontWeight: 800,
                                    fontSize: 15,

                                    background: primary,
                                    color: '#fff',

                                    boxShadow: `0 12px 30px rgba(109,7,26,0.35)`,

                                    transition: 'all 0.25s ease',

                                    '&:hover': {
                                        background: primaryDark,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 18px 40px rgba(109,7,26,0.45)`,
                                    },
                                }}
                            >
                                افزودن به سبد خرید
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ProductActions;
