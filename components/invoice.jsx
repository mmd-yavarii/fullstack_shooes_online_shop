import React from 'react';
import { Box, Typography, Paper, Divider, Stack, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';
import { applyDiscount } from '@/helper/help';

function Invoice({ data, info, products }) {
    if (!data) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box
            sx={{
                maxWidth: 900,
                mx: 'auto',
                mt: 5,
                px: 2,
                '@media print': {
                    maxWidth: '100%',
                    mt: 0,
                    px: 0,
                },
            }}
        >
            <Paper
                sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                    border: '1px solid #e5e7eb',
                    '@media print': {
                        boxShadow: 'none',
                        border: 'none',
                    },
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                        color: 'white',
                        p: 4,
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 80 }} />

                    <p className="text-bold text-2xl my-4">کد رهگیری سفارش : {data._id}</p>

                    <Typography fontSize={22} fontWeight={800}>
                        سفارش با موفقیت ثبت شد
                    </Typography>

                    <Typography fontSize={13} sx={{ opacity: 0.9 }}>
                        رسید خرید شما صادر شد
                    </Typography>

                    {/* PRINT BUTTON */}
                    <Button
                        onClick={handlePrint}
                        // startIcon={<PrintIcon />}
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: 15,
                            right: 15,
                            backgroundColor: '#0d7533',
                        }}
                    >
                        چاپ رسید
                    </Button>
                </Box>

                {/* CONTENT */}
                <Box sx={{ p: 3 }}>
                    {/* USER INFO */}
                    <Typography fontWeight={800} mb={1}>
                        اطلاعات مشتری
                    </Typography>

                    <Stack spacing={0.5} sx={{ mb: 2 }}>
                        <Typography>نام: {info.firstName + ' ' + info.lastName || 'نام ثبت نشده'}</Typography>

                        <Typography>شماره: {info.phone || '---'}</Typography>

                        <Typography>آدرس: {info.address || '---'}</Typography>

                        <Typography>کد پستی: {info.postalCode}</Typography>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    {/* ITEMS */}
                    <Typography fontWeight={800} mb={2}>
                        محصولات سفارش
                    </Typography>

                    <Stack spacing={1}>
                        {products?.map((item, i) => (
                            <Box
                                key={i}
                                sx={{
                                    p: 2,
                                    border: '1px solid #eee',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#fafafa',
                                }}
                            >
                                <Box>
                                    <Typography fontWeight={700}>{item.title || 'محصول نامشخص'}</Typography>

                                    <Typography variant="caption" color="text.secondary">
                                        سایز: {item.size} | تعداد: {item.quantity}
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                marginRight: 6,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </Typography>
                                </Box>

                                <Typography fontWeight={700}>{applyDiscount(item.price, item.discount)?.toLocaleString()} تومان</Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* PRICING */}
                    <Box
                        sx={{
                            backgroundColor: '#f9fafb',
                            borderRadius: 2,
                            p: 2,
                        }}
                    >
                        <Typography fontWeight={700} mb={1}>
                            خلاصه پرداخت
                        </Typography>

                        <Stack spacing={0.5}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>قیمت کل</Typography>
                                <Typography>{data.pricing?.totalOriginalPrice?.toLocaleString() || 0}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography color="success.main">تخفیف</Typography>
                                <Typography color="success.main">{data.pricing?.totalDiscount?.toLocaleString() || 0}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 1,
                                }}
                            >
                                <Typography fontWeight={900}>مبلغ نهایی</Typography>
                                <Typography fontWeight={900}>{data.pricing?.totalFinalPrice?.toLocaleString() || 0} تومان</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    {/* FOOTER */}
                    <Typography
                        sx={{
                            mt: 3,
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'text.secondary',
                        }}
                    >
                        این رسید به صورت خودکار تولید شده است
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Invoice;
