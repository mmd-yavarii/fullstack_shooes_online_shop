import React from 'react';

import Link from 'next/link';

import { Box, Typography, Paper, Button, Stack, Chip } from '@mui/material';

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
                background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 35%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden',
                p: 2,
            }}
        >
            {/* BACKGROUND EFFECT */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: '#ef444420',
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
                    background: '#dc262620',
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
                    background: 'rgba(255,255,255,0.78)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
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
                        <CancelRoundedIcon
                            sx={{
                                fontSize: 70,
                            }}
                        />
                    </Box>

                    <Chip
                        label="پرداخت ناموفق"
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
                        پرداخت انجام نشد
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
                        تراکنش شما ناموفق بود یا توسط کاربر لغو شد. در صورت کسر وجه، مبلغ طی مدت کوتاهی به حساب شما بازمی‌گردد.
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
                    {/* ERROR BOX */}
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #fff1f2 0%, #fef2f2 100%)',
                            border: '1px solid #fecaca',
                            mb: 4,
                        }}
                    >
                        <Typography fontWeight={800} mb={1} color="error.main">
                            خطا در پرداخت
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 2,
                                fontSize: 14,
                            }}
                        >
                            ممکن است موجودی کارت کافی نبوده باشد، اتصال اینترنت قطع شده باشد یا عملیات پرداخت توسط کاربر لغو شده باشد.
                        </Typography>
                    </Box>

                    {/* ACTIONS */}
                    <Stack spacing={2}>
                        <Link
                            href="/cart"
                            style={{
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                startIcon={<ReplayRoundedIcon className="ml-4" />}
                                sx={{
                                    py: 1.7,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    fontSize: 15,
                                    background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
                                    boxShadow: '0 10px 25px rgba(239,68,68,0.3)',

                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 14px 30px rgba(239,68,68,0.4)',
                                    },

                                    transition: 'all 0.25s ease',
                                }}
                            >
                                تلاش مجدد برای پرداخت
                            </Button>
                        </Link>

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

export default Fail;
