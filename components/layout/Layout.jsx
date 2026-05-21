import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { RiMenu4Line } from 'react-icons/ri';

import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Box, Typography, Divider } from '@mui/material';

function Layout({ children }) {
    const router = useRouter();

    const hideLayoutRoutes = ['/admin', '/product'];

    const shouldHideLayout = hideLayoutRoutes.some((route) => router.pathname.startsWith(route));

    const hideFooterRoutes = ['/cart', '/about', '/checkout-page', '/orders'];

    const shouldHideFooter = hideFooterRoutes.some((route) => router.pathname.startsWith(route));

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const menuItems = [
        { text: 'خانه', href: '/' },
        { text: 'پیگیری سفارش', href: '/orders' },
        { text: 'درباره ما', href: '/about' },
    ];

    if (shouldHideLayout) {
        return <>{children}</>;
    }

    return (
        <div>
            {/* HEADER */}
            <div
                className="flex items-center justify-between p-4 bg-white max-w-[900px]"
                style={{
                    boxShadow: '1px 2px 10px #00000011',
                    position: 'sticky',
                    top: '0',
                    zIndex: '999',
                    borderRadius: '10px',
                    margin: '0 auto',
                }}
            >
                <IconButton onClick={toggleDrawer(true)}>
                    <RiMenu4Line size={25} />
                </IconButton>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#6d071a] font-bold">Zhiyano</p>
                    <p className="text-[#6d071a] font-bold">ژیویانو</p>
                </div>

                <Link href="/cart">
                    <FiShoppingCart size="25px" />
                </Link>
            </div>

            {/* DRAWER */}
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 250,
                        direction: 'rtl',
                        textAlign: 'right',
                    }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    <Typography sx={{ p: 2, fontWeight: 'bold', color: '#6d071a' }}>منو</Typography>

                    <Divider />

                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        textAlign: 'right',
                                        justifyContent: 'flex-start',
                                        direction: 'rtl',
                                    }}
                                >
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* PAGE CONTENT */}
            {children}

            {/* FOOTER (HIDDEN IN CART) */}
            {!shouldHideFooter && (
                <div className="border-t border-[#0000001c] p-4">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[#6d071a] font-bold">Zhiyano</p>
                        <p className="text-[#6d071a] font-bold">ژیویانو</p>
                    </div>

                    <div className="flex items-center justify-evenly mt-3">
                        <Link href="" className="w-15">
                            پیگیری سفارش
                        </Link>

                        <img width={70} src="https://cloud.rtl-theme.com/wp-content/uploads/2024/07/1d2ab0.png" alt="" />

                        <Link href="" className="w-15">
                            درباره ما
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Layout;
