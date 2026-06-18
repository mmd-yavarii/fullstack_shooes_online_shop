import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, Paper, Button, Stack, Chip, Divider } from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

function Success() {
    const { clearCart } = useCart();
    const searchParams = useSearchParams();

    const status = searchParams.get('status');
    const pay = searchParams.get('pay');

    const ran = useRef(false);

    async function reduceProductQty() {
        try {
            const res = await fetch(`/api/product/reduce-bue-qty/${pay}`);

            if (!res.ok) return;

            await res.json();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (status !== 'success' || !pay || ran.current) return;

        ran.current = true;

        (async () => {
            await reduceProductQty();
            clearCart();
        })();
    }, [status, pay, clearCart]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top, #ecfdf5 0%, #ffffff 60%)',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 520,
                    borderRadius: 5,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                        color: 'white',
                        p: 5,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: 110,
                            height: 110,
                            borderRadius: '50%',
                            mx: 'auto',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <CheckCircleRoundedIcon sx={{ fontSize: 60 }} />
                    </Box>

                    <Chip
                        label="پرداخت موفق"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            fontWeight: 700,
                            mb: 2,
                        }}
                    />

                    <Typography variant="h4" fontWeight={900}>
                        سفارش ثبت شد
                    </Typography>

                    <Typography sx={{ mt: 1, opacity: 0.9 }}>پرداخت شما با موفقیت انجام شد</Typography>
                </Box>

                {/* BODY */}
                <Box sx={{ p: 4 }}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: 'text.secondary',
                            mb: 2,
                        }}
                    >
                        کد پیگیری پرداخت:
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 800,
                            letterSpacing: 1,
                            mb: 3,
                        }}
                    >
                        {pay}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            marginBottom: 2,
                        }}
                    >
                        سفارش شما در حال پردازش است. به‌زودی وضعیت ارسال برای شما نمایش داده خواهد شد.
                    </Typography>

                    <Stack spacing={2} mt={4}>
                        <Link href="/" replace={true} style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<HomeRoundedIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                                    boxShadow: '0 10px 25px rgba(34,197,94,0.25)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 15px 30px rgba(34,197,94,0.35)',
                                    },
                                    transition: '0.2s',
                                }}
                            >
                                بازگشت به خانه
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default Success;
