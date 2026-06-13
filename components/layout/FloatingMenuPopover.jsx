import React from 'react';
import { Popover, Box, Typography, List, ListItem, ListItemButton } from '@mui/material';
import Link from 'next/link';

import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { RiHome5Line } from 'react-icons/ri';
import { ImInfo } from 'react-icons/im';

function FloatingMenuPopover({ anchorEl, setAnchorEl, menuItems, setOpenModal }) {
    const open = Boolean(anchorEl);

    const iconStyle = {
        fontSize: 20,
        filter: 'drop-shadow(0 2px 6px rgba(109, 7, 26, 0.663))',
    };

    const iconMap = {
        خانه: <RiHome5Line sx={iconStyle} />,
        'درباره ما': <ImInfo sx={iconStyle} />,
        'توسعه دهندگان': <CodeRoundedIcon sx={iconStyle} />,
        'پیگیری سفارش': <ReceiptLongRoundedIcon sx={iconStyle} />,
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    width: 270,

                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(22px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(22px) saturate(180%)',

                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    borderRadius: '28px',
                    overflow: 'hidden',
                },
            }}
        >
            <Box sx={{ p: 1.5, direction: 'rtl' }}>
                {/* HEADER */}
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: '22px',
                        background: 'rgba(255,255,255,0.18)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        mb: 1.5,
                    }}
                >
                    <Typography sx={{ fontSize: 11, color: 'rgba(109,7,26,0.7)', textAlign: 'center', fontWeight: 'bold' }}>منوی فروشگاه</Typography>
                </Box>

                {/* ITEMS */}
                <List sx={{ p: 0 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                onClick={() => setAnchorEl(null)}
                                sx={{
                                    py: 1.2,
                                    px: 1.5,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row-reverse',
                                    background: 'rgba(255,255,255,0.15)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    transition: '0.25s',
                                    color: '#6d071a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '10px',
                                    borderBottom: '1px solid #00000012',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        background: 'rgba(255,255,255,0.25)',
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                >
                                    {item.text}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        opacity: 0.8,
                                    }}
                                >
                                    {iconMap[item.text]}
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {/* ORDER */}
                    <ListItem disablePadding sx={{ mt: 1 }}>
                        <ListItemButton
                            onClick={() => {
                                setOpenModal(true);
                                setAnchorEl(null);
                            }}
                            sx={{
                                borderRadius: '20px',
                                py: 1.2,
                                px: 1.5,

                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row-reverse',

                                background: 'rgba(255,255,255,0.15)',
                                border: '1px solid rgba(255,255,255,0.2)',

                                transition: '0.25s',

                                color: '#6d071a',

                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    background: 'rgba(255,255,255,0.25)',
                                },
                            }}
                        >
                            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>پیگیری سفارش</Typography>

                            <ReceiptLongRoundedIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Popover>
    );
}

export default FloatingMenuPopover;
