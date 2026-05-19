import React, { useState } from 'react';

import { Box, Typography, Chip, Button, Stack } from '@mui/material';

import Link from 'next/link';

function TransactionCard({ data }) {
    const { fullName, phone, nationalCode, address, postalCode, totalPrice, orderStatus, items = [] } = data;

    console.log(data);

    const [status, setStatus] = useState(orderStatus);
    const [loading, setLoading] = useState(false);

    const getStatus = (status) => {
        const map = {
            confirmed: 'تایید شده',
            pending: 'در انتظار تایید',
            cancelled: 'لغو شده',
        };

        return map[status] || status;
    };

    const getStyle = (status) => {
        const map = {
            confirmed: {
                bg: '#16a34a26',
                color: '#16a34a',
            },

            pending: {
                bg: '#f59f0b31',
                color: '#ca8000',
            },

            cancelled: {
                bg: '#dc26262b',
                color: '#dc2626',
            },
        };

        return (
            map[status] || {
                bg: '#6b7280',
                color: '#fff',
            }
        );
    };

    const updateStatus = async (newStatus) => {
        try {
            setLoading(true);

            const res = await fetch('/api/transaction/update-status', {
                method: 'PATCH',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: data._id,
                    orderStatus: newStatus,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'خطا');
            }

            setStatus(newStatus);
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const style = getStyle(status);

    const isFinal = status !== 'pending';

    return (
        <Box
            sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 3,
                p: 2,
                mb: 2,
                backgroundColor: '#fff',
                transition: '0.2s',

                '&:hover': {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            {/* HEADER */}
            <Typography variant="h6">{fullName}</Typography>

            {/* INFO */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5,
                    mt: 1,
                }}
            >
                <Typography variant="body2">شماره: {data.user.phone}</Typography>

                <Typography variant="body2"> نام و نام خانوادگی {data.user.fullName}</Typography>

                <Typography variant="body2">کد پستی: {data.user.postalCode}</Typography>

                <Box
                    sx={{
                        gridColumn: '1 / -1',
                        p: 1.5,
                        bgcolor: '#f9fafb',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="caption">آدرس</Typography>

                    <Typography variant="body2">{data.user.address}</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    gridColumn: '1 / -1',
                    p: 1.5,
                    bgcolor: '#f9fafb',
                    borderRadius: 2,
                    marginTop: '10px',
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    قیمت کل: {(data.pricing?.totalOriginalPrice || 0).toLocaleString()} تومان
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ color: 'red', margin: '10px 0' }}>
                    مجموع تخفیف: {(data.pricing?.totalDiscount || 0).toLocaleString()} تومان
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    مبلغ نهایی: {(data.pricing?.totalFinalPrice || 0).toLocaleString()} تومان
                </Typography>
            </Box>

            {/* ITEMS */}
            <Box
                sx={{
                    mt: 2,
                    p: 1.5,
                    border: '1px solid #eee',
                    borderRadius: 2,
                    bgcolor: '#fcfcfc',
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    محصولات خریداری شده
                </Typography>

                {items?.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        محصولی ثبت نشده
                    </Typography>
                ) : (
                    <Stack spacing={1}>
                        {items.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 1,
                                    border: '1px solid #eee',
                                    borderRadius: 1,
                                }}
                            >
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        محصول: {item?.product?.title || 'نامشخص'}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mt: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: '50%',
                                                backgroundColor: item?.color || '#ccc',
                                                border: '1px solid #ddd',
                                            }}
                                        />

                                        <Typography variant="caption" color="text.secondary">
                                            سایز: {item?.size}
                                        </Typography>

                                        <Link href={`/product/${item?.product?._id}`} className="text-blue-600">
                                            دیدن محصول
                                        </Link>
                                    </Box>
                                </Box>

                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2">تعداد: {item?.quantity}</Typography>

                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {(item?.finalPrice || 0).toLocaleString()} تومان
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>

            {/* ACTIONS */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    alignItems: 'center',
                }}
            >
                <Chip
                    label={getStatus(status)}
                    sx={{
                        backgroundColor: style.bg,
                        color: style.color,
                        fontWeight: 700,
                    }}
                />

                {!isFinal && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="success" disabled={loading} onClick={() => updateStatus('confirmed')}>
                            تایید
                        </Button>

                        <Button variant="outlined" color="error" disabled={loading} onClick={() => updateStatus('cancelled')} sx={{ color: 'red' }}>
                            لغو
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default TransactionCard;
