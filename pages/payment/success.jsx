import React, { useEffect } from 'react';
import Link from 'next/link';

import { Box, Typography, Paper, Button, Stack, Chip } from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

function Success() {
    const { clearCart } = useCart();
    const searchParams = useSearchParams();

    const status = searchParams.get('status');
    const pay = searchParams.get('pay');

    async function reduceProductQty() {
        const response = await fetch(`/api/product/reduce-bue-qty/${pay}`);
        await response.data;
    }

    useEffect(() => {
        if (status === 'success') {
            reduceProductQty();
            clearCart();
        }
    }, [status, clearCart]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 35%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden',
                p: 2,
            }}
        >
            {/* BACKGROUND BLUR */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: '#22c55e20',
                    filter: 'blur(100px)',
                    top: -50,
                    left: -50,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: '#16a34a20',
                    filter: 'blur(100px)',
                    bottom: -60,
                    right: -60,
                }}
            />

            <Paper
                elevation={0}
                sx={{
                    position: 'relative',
                    maxWidth: 560,
                    width: '100%',
                    borderRadius: 6,
                    overflow: 'hidden',
                    backdropFilter: 'blur(14px)',
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                }}
            >
                {/* TOP SECTION */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                        color: 'white',
                        textAlign: 'center',
                        px: 4,
                        py: 6,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            mb: 3,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                        }}
                    >
                        <CheckCircleRoundedIcon
                            sx={{
                                fontSize: 70,
                            }}
                        />
                    </Box>

                    <Chip
                        label="پرداخت تایید شد"
                        sx={{
                            mb: 2,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            fontWeight: 700,
                            backdropFilter: 'blur(6px)',
                        }}
                    />

                    <Typography
                        variant="h3"
                        fontWeight={900}
                        sx={{
                            mb: 1,
                            fontSize: {
                                xs: '2rem',
                                sm: '2.5rem',
                            },
                        }}
                    >
                        پرداخت موفق
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight={900}
                        sx={{
                            mb: 1,
                            fontSize: {
                                xs: '1rem',
                                sm: '1.2rem',
                            },
                        }}
                    >
                        شماره پیگیری پرداخت :‌ {pay}
                    </Typography>

                    <Typography
                        sx={{
                            opacity: 0.9,
                            fontSize: 15,
                            maxWidth: 380,
                            mx: 'auto',
                            lineHeight: 2,
                        }}
                    >
                        سفارش شما با موفقیت ثبت شد و پرداخت با موفقیت انجام گردید.
                    </Typography>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        p: {
                            xs: 3,
                            sm: 5,
                        },
                    }}
                >
                    {/* INFO BOX */}
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            border: '1px solid #e2e8f0',
                            mb: 4,
                        }}
                    >
                        <Typography fontWeight={800} mb={1}>
                            اطلاعات پرداخت
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 2,
                                fontSize: 14,
                            }}
                        >
                            وضعیت سفارش شما در حال پردازش است. جزئیات و وضعیت سفارش از طریق پیگیری با شماره تلفن قابل مشاهده است.{' '}
                        </Typography>
                    </Box>

                    {/* ACTIONS */}
                    <Stack spacing={2}>
                        <Link
                            href="/"
                            style={{
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                startIcon={<HomeRoundedIcon className="ml-4" />}
                                sx={{
                                    py: 1.7,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    fontSize: 15,
                                    borderWidth: 2,
                                    color: 'black',
                                    boxShadow: 'none',
                                    borderColor: '#00000025',

                                    '&:hover': {
                                        borderWidth: 2,
                                        transform: 'translateY(-2px)',
                                    },

                                    transition: 'all 0.25s ease',
                                }}
                            >
                                بازگشت به صفحه اصلی
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default Success;
