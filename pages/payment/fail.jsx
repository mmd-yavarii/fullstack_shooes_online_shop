import React from 'react';
import Link from 'next/link';
import { Box, Typography, Paper, Button, Stack, Chip, Divider } from '@mui/material';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

function Fail() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top, #fff1f2 0%, #ffffff 60%)',
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
                        background: 'linear-gradient(135deg, #b91c1c, #ef4444)',
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
                        <CancelRoundedIcon sx={{ fontSize: 60 }} />
                    </Box>

                    <Chip
                        label="پرداخت ناموفق"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            fontWeight: 700,
                            mb: 2,
                        }}
                    />

                    <Typography variant="h4" fontWeight={900}>
                        تراکنش ناموفق بود
                    </Typography>

                    <Typography sx={{ mt: 1, opacity: 0.9 }}>پرداخت انجام نشد یا توسط کاربر لغو شد</Typography>
                </Box>

                {/* BODY */}
                <Box sx={{ p: 4 }}>
                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: 3,
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            mb: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 800,
                                color: 'error.main',
                                mb: 1,
                            }}
                        >
                            دلیل احتمالی خطا
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 13,
                                color: 'text.secondary',
                                lineHeight: 1.8,
                            }}
                        >
                            ممکن است اینترنت قطع شده باشد، موجودی کافی نبوده باشد یا عملیات پرداخت توسط درگاه لغو شده باشد.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            marginBottom: 2,
                        }}
                    >
                        اگر مبلغ از حساب شما کم شده باشد، معمولاً طی چند دقیقه تا چند ساعت برگشت داده می‌شود.
                    </Typography>

                    <Stack spacing={2} mt={4}>
                        <Link replace={true} href="/cart" style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<ReplayRoundedIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #b91c1c, #ef4444)',
                                    boxShadow: '0 10px 25px rgba(239,68,68,0.25)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 15px 30px rgba(239,68,68,0.35)',
                                    },
                                    transition: '0.2s',
                                }}
                            >
                                تلاش مجدد برای پرداخت
                            </Button>
                        </Link>

                        <Link replace={true} href="/" style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<HomeRoundedIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    borderColor: '#e5e7eb',
                                    color: 'text.primary',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        borderColor: '#d1d5db',
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

export default Fail;
