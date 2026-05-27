import React from 'react';
import { Box, Typography, Stack, Divider, Paper, Container } from '@mui/material';

import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function DeveloperContact() {
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
                    {/* HERO */}
                    <Paper
                        elevation={0}
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '36px',
                            p: { xs: 3, md: 7 },
                            background: 'linear-gradient(135deg, #ffffff, #f3f8ff)',
                            border: '1px solid rgba(30, 90, 200, 0.12)',
                            boxShadow: '0 20px 60px rgba(30, 90, 200, 0.10)',
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
                                background: 'radial-gradient(circle, rgba(30, 90, 200, 0.15), transparent)',
                                filter: 'blur(20px)',
                            }}
                        />

                        <Stack spacing={3} position="relative" zIndex={2}>
                            <Typography
                                variant="h2"
                                fontWeight={900}
                                sx={{
                                    color: '#0d2b5c',
                                    fontSize: { xs: '2.2rem', md: '4.2rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                ارتباط با توسعه‌دهنده
                            </Typography>

                            <Divider
                                sx={{
                                    width: 110,
                                    borderBottomWidth: 5,
                                    borderColor: '#1e5ac8',
                                    borderRadius: 10,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: '#4a5a75',
                                    lineHeight: 2.3,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    maxWidth: '850px',
                                }}
                            >
                                برای همکاری، پروژه‌های فریلنسری یا سوالات فنی می‌توانید از طریق راه‌های زیر ارتباط بگیرید.
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* CONTACT */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '36px',
                            overflow: 'hidden',
                            background: '#ffffff',
                            border: '1px solid rgba(30, 90, 200, 0.12)',
                            boxShadow: '0 20px 60px rgba(30, 90, 200, 0.08)',
                        }}
                    >
                        <Box sx={{ p: { xs: 3, md: 6 } }}>
                            <Stack spacing={3}>
                                <ContactItem
                                    icon={<PhoneRoundedIcon />}
                                    title="تلفن"
                                    value="0903 633 0147"
                                    href="tel:09036330147"
                                    actionHint="تماس مستقیم"
                                />

                                <ContactItem
                                    icon={<EmailRoundedIcon />}
                                    title="ایمیل"
                                    value="mdyavarii@gmail.com"
                                    href="mailto:mdyavarii@gmail.com"
                                    actionHint="ارسال ایمیل"
                                />

                                <ContactItem
                                    icon={<GitHubIcon />}
                                    title="گیت‌هاب"
                                    value="github.com/mmd-yavarii"
                                    href="https://github.com/mmd-yavarii"
                                    actionHint="مشاهده پروژه‌ها"
                                />

                                <ContactItem
                                    icon={<LinkedInIcon />}
                                    title="لینکدین"
                                    value="linkedin.com/in/mmd-yavarii"
                                    href="https://linkedin.com/in/mmd-yavarii"
                                    actionHint="ارتباط حرفه‌ای"
                                />
                            </Stack>

                            <Box
                                sx={{
                                    mt: 6,
                                    p: 3,
                                    borderRadius: '24px',
                                    background: '#f3f8ff',
                                    border: '1px solid rgba(30, 90, 200, 0.12)',
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: '#4a5a75',
                                        lineHeight: 2,
                                    }}
                                >
                                    معمولاً پاسخ‌گویی کمتر از 24 ساعت انجام می‌شود
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
            target={href ? '_blank' : undefined}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2.2,
                borderRadius: '22px',
                background: '#f9fbff',
                border: '1px solid rgba(30, 90, 200, 0.10)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: href ? 'pointer' : 'default',
                transition: '0.25s',

                '&:hover': href
                    ? {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 30px rgba(30, 90, 200, 0.12)',
                          background: '#eef5ff',
                      }
                    : {},
            }}
        >
            {/* ICON SMALLER */}
            <Box
                sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1e5ac8, #3a7bff)',
                    color: 'white',
                    boxShadow: '0 6px 16px rgba(30, 90, 200, 0.18)',
                    '& svg': {
                        fontSize: '0.95rem',
                    },
                }}
            >
                {icon}
            </Box>

            {/* TEXT */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    sx={{
                        color: '#6a7a90',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {title}

                    {href && <span style={{ fontSize: '0.72rem', color: '#1e5ac8' }}>({actionHint})</span>}
                </Typography>

                <Typography
                    sx={{
                        color: '#0d2b5c',
                        fontWeight: 800,
                        fontSize: '1rem',
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

export default DeveloperContact;
