import React from 'react';

import { Box, Typography, Stack, Divider, Paper, Container } from '@mui/material';

import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

function About() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                maxWidth: '900px',
                margin: '0 auto',
                py: 10,
                px: 2,
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={5}>
                    <Paper
                        elevation={0}
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '36px',
                            p: { xs: 3, md: 7 },
                            background: 'linear-gradient(135deg, #ffffff, #fff5f6)',
                            border: '1px solid rgba(128,0,32,0.08)',
                            boxShadow: '0 20px 60px rgba(128,0,32,0.08)',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -120,
                                right: -120,
                                width: 320,
                                height: 320,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(128,0,32,0.12), transparent)',
                                filter: 'blur(20px)',
                            }}
                        />

                        <Stack spacing={3} position="relative" zIndex={2}>
                            <Typography
                                variant="h2"
                                fontWeight={900}
                                sx={{
                                    color: '#4a0013',
                                    fontSize: { xs: '2.2rem', md: '4.2rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                درباره ژییانو
                            </Typography>

                            <Divider
                                sx={{
                                    width: 110,
                                    borderBottomWidth: 5,
                                    borderColor: '#800020',
                                    borderRadius: 10,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: '#6b4b53',
                                    lineHeight: 2.3,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    maxWidth: '850px',
                                }}
                            >
                                فروشگاه ژییانو با بیش از ۱۰ سال سابقه فعالیت، تجربه خرید امن، سریع و باکیفیت را برای مشتریان فراهم می‌کند.
                                <br />
                                <br />
                                هدف ما ایجاد اعتماد، کیفیت بالا و پشتیبانی واقعی است.
                            </Typography>
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '36px',
                            overflow: 'hidden',
                            background: '#ffffff',
                            border: '1px solid rgba(128,0,32,0.08)',
                            boxShadow: '0 20px 60px rgba(128,0,32,0.06)',
                        }}
                    >
                        <Box sx={{ p: { xs: 3, md: 6 } }}>
                            <Stack spacing={3}>
                                <ContactItem
                                    icon={<PhoneRoundedIcon />}
                                    title="تلفن تماس"
                                    actionHint="برای تماس مستقیم کلیک کنید"
                                    value="09211091625"
                                    href="tel:09211091625"
                                />

                                <ContactItem
                                    icon={<LocationOnRoundedIcon />}
                                    title="آدرس"
                                    value="کرمانشاه،الهیه خیابان بهداری،بعد از چهارراه امیر کبیر کتونی ژیانو"
                                    href="https://maps.app.goo.gl/WgaYiqXqwMkoGBkj8?g_st=atm"
                                    actionHint="برای مسیر‌یابی کلیک کنید"
                                />
                            </Stack>

                            <Box
                                sx={{
                                    mt: 6,
                                    p: 3,
                                    borderRadius: '24px',
                                    background: '#fff5f6',
                                    border: '1px solid rgba(128,0,32,0.08)',
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: '#7a5c63',
                                        lineHeight: 2,
                                    }}
                                >
                                    پاسخگویی همه روزه از ساعت ۹ صبح تا ۶ عصر
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

function ContactItem({ icon, title, value, href, actionHint }) {
    const Wrapper = href ? 'a' : 'div';

    return (
        <Box
            component={Wrapper}
            href={href}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2.5,
                borderRadius: '24px',
                background: '#fffafb',
                border: '1px solid rgba(128,0,32,0.08)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: href ? 'pointer' : 'default',
                transition: '0.3s',
                position: 'relative',

                '&:hover': href
                    ? {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 15px 35px rgba(128,0,32,0.08)',
                          background: '#fff1f3',
                      }
                    : {},
            }}
        >
            {/* ICON (smaller) */}
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #800020, #a00028)',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(128,0,32,0.18)',

                    '& svg': {
                        fontSize: '1.1rem',
                    },
                }}
            >
                {icon}
            </Box>

            {/* TEXT */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    sx={{
                        color: '#9b7a82',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {title}

                    {href && (
                        <Box
                            component="span"
                            sx={{
                                fontSize: '0.75rem',
                                color: '#800020',
                                fontWeight: 700,
                                opacity: 0.8,
                            }}
                        >
                            ({actionHint})
                        </Box>
                    )}
                </Typography>

                <Typography
                    sx={{
                        color: '#3d0010',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

export default About;
