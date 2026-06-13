import React from 'react';
import { Typography, Box } from '@mui/material';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';

export default function CartList({ cart, removeFromCart }) {
    const router = useRouter();

    const goToProduct = (id) => {
        router.push(`/product/${id}`);
    };

    const getDiscountedPrice = (item) => {
        const discount = item.discount || 0;
        return item.price - (item.price * discount) / 100;
    };

    return (
        <div className="flex flex-col gap-6 bg-[#f5f7fb] p-4 py-6 rounded-[15px] my-4 border border-[#00000013]">
            {cart.map((item) => {
                const finalPrice = getDiscountedPrice(item);

                return (
                    <div key={`${item.productId}-${item.size}-${item.color}`}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            {/* IMAGE + DELETE */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 85,
                                    height: 85,
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.image}
                                    onClick={() => goToProduct(item.productId)}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                    }}
                                />

                                <button
                                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                                    className="absolute -top-2 -right-2 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-red-100 transition"
                                >
                                    <MdOutlineDeleteForever color="#850000" size="1.6rem" />
                                </button>
                            </Box>

                            {/* INFO */}
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={700} fontSize={15}>
                                    {item.title}
                                </Typography>

                                {/* PRICE (DISCOUNTED) */}
                                <Typography color="primary" fontWeight={600} fontSize={14} mt={0.5}>
                                    {finalPrice.toLocaleString()} ریال
                                </Typography>

                                {/* SHOW DISCOUNT IF EXISTS */}
                                {item.discount > 0 && (
                                    <Typography
                                        fontSize={12}
                                        color="text.secondary"
                                        sx={{
                                            textDecoration: 'line-through',
                                        }}
                                    >
                                        {item.price.toLocaleString()} ریال
                                    </Typography>
                                )}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        mt: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Typography fontSize={13} color="text.secondary">
                                        سایز: {item.size}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography fontSize={13} color="text.secondary">
                                            رنگ:
                                        </Typography>

                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: '50%',
                                                backgroundColor: item.color,
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    </Box>

                                    <Typography fontSize={13} fontWeight={600} color="text.secondary">
                                        تعداد: {item.quantity}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </div>
                );
            })}
        </div>
    );
}
