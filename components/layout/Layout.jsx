import Link from 'next/link';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { RiMenu4Line } from 'react-icons/ri';

import { IconButton } from '@mui/material';

import OrderModal from '../OrderTrackingModal';
import { useCart } from '@/context/CartContext';
import FloatingMenuPopover from './FloatingMenuPopover';
import Footer from './Footer';
import { useRouter } from 'next/router';

function Layout({ children }) {
    const router = useRouter();

    const { cartItemsCount } = useCart();

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const hideFooter = router.pathname.includes('/product') || router.pathname.includes('/admin') || router.pathname.includes('/payment');
    const hideHeader = router.pathname.includes('/payment');

    const menuItems = [
        { text: 'خانه', href: '/' },
        { text: 'درباره ما', href: '/about' },
        { text: 'توسعه دهندگان', href: '/developer-contact' },
    ];

    return (
        <div>
            {/* HEADER */}
            {!hideHeader && (
                <div
                    className="
                sticky top-3 z-[999]
                mx-auto flex w-[95%] max-w-[950px]
                items-center justify-between
                rounded-2xl border border-white/20
                bg-white/75 px-5 py-3
                backdrop-blur-xl
            "
                    style={{
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 2px 10px rgba(109,7,26,0.08)',
                    }}
                >
                    {/* MENU BUTTON */}
                    <IconButton
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #6d071a 0%, #9f1239 100%)',
                            color: '#fff',
                            boxShadow: '0 10px 25px rgba(109,7,26,0.25)',
                            transition: '0.25s',

                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <RiMenu4Line size={24} />
                    </IconButton>

                    {/* LOGO */}
                    <div className="relative flex flex-col items-center justify-center">
                        <div className="absolute -z-10 h-14 w-14 rounded-full bg-[#6d071a]/10 blur-2xl" />
                        <p className="bg-gradient-to-r from-[#6d071a] to-[#d82a70] bg-clip-text text-xl font-extrabold text-transparent">Zhiyano</p>
                        <p className="text-sm font-bold text-[#6d071a]/80">ژییانو</p>
                    </div>

                    {/* CART */}
                    <Link
                        href="/cart"
                        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#ffffff81]"
                        style={{
                            boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
                        }}
                    >
                        <FiShoppingCart size={24} className="text-[#6d071a]" />

                        {cartItemsCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                </div>
            )}

            {/*  POPUP MENU  */}
            <FloatingMenuPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={menuItems} setOpenModal={setOpenModal} />

            <OrderModal open={openModal} onClose={() => setOpenModal(false)} />

            {/* PAGE */}
            <div className="pt-6">{children}</div>

            {!hideFooter && <Footer />}
        </div>
    );
}

export default Layout;
