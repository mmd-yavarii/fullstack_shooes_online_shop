import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { RiMenu4Line } from 'react-icons/ri';

import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Box, Typography, Divider } from '@mui/material';
import OrderModal from '../OrderTrackingModal';
import { useCart } from '@/context/CartContext';

function Layout({ children }) {
    const router = useRouter();
    const { cartItemsCount } = useCart();

    const hideLayoutRoutes = ['/admin', '/product', '/payment'];

    const shouldHideLayout = hideLayoutRoutes.some((route) => router.pathname.startsWith(route));

    const hideFooterRoutes = ['/cart', '/about', '/checkout-page', '/orders', '/developer-contact'];

    const shouldHideFooter = hideFooterRoutes.some((route) => router.pathname.startsWith(route));

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const menuItems = [
        { text: 'خانه', href: '/' },
        { text: 'درباره ما', href: '/about' },
        { text: 'توسعه دهندگان', href: '/developer-contact' },
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
                    <p className="text-[#6d071a] font-bold">ژییانو</p>
                </div>

                <Link href="/cart" className="relative inline-flex items-center justify-center">
                    <FiShoppingCart size={25} />

                    {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                            {cartItemsCount}
                        </span>
                    )}
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
                        <ListItem disablePadding sx={{ mt: 1 }}>
                            <ListItemButton onClick={() => setOpenModal(true)}>
                                <ListItemText
                                    primary="پیگیری سفارش"
                                    sx={{
                                        textAlign: 'right',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>

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

            <OrderModal open={openModal} onClose={() => setOpenModal(false)} />

            {/* PAGE CONTENT */}
            {children}

            {/* FOOTER (HIDDEN IN CART) */}
            {!shouldHideFooter && (
                <div className="border-t border-[#0000001c] p-4 flex items-center justify-between max-w-[900px]" style={{ margin: '0 auto ' }}>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[#6d071a] font-bold">Zhiyano</p>
                        <p className="text-[#6d071a] font-bold">ژییانو</p>
                    </div>

                    <div className="flex gap-2">
                        <img width={70} src="https://cloud.rtl-theme.com/wp-content/uploads/2024/07/1d2ab0.png" alt="" />
                        <img
                            width={50}
                            src="https://www.zarinpal.com/blog/wp-content/uploads/2021/06/%D9%86%D9%85%D8%A7%D8%AF-%D8%A7%D8%B7%D9%85%DB%8C%D9%86%D8%A7%D9%86-1.png"
                            alt=""
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Layout;
