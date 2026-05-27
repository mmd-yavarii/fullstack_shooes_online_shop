import React from 'react';
import { Typography, Button } from '@mui/material';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import CartList from '@/components/CartList';
import { MdError } from 'react-icons/md';

function CartPage() {
    const {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,

        totalOriginalPrice,
        totalDiscount,
        totalPrice,
    } = useCart();

    // EMPTY CART
    if (cart.length === 0) {
        return (
            <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center py-24 px-4 gap-6 text-center">
                <div className="text-6xl mb-4">🛒</div>

                <div>
                    <p className="font-bold text-2xl">سبد خرید شما خالی است</p>

                    <p className="text-sm opacity-70 mt-2">هنوز هیچ محصولی به سبد خرید اضافه نکرده‌اید</p>
                </div>

                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#850000',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.2,
                            fontSize: '15px',
                            '&:hover': {
                                backgroundColor: '#6f0000',
                            },
                        }}
                    >
                        مشاهده محصولات
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto p-4 flex flex-col gap-6">
            {/* cart list */}
            <CartList cart={cart} addToCart={addToCart} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />

            {/* summery */}
            <div className="flex flex-col gap-4 bg-[#f5f7fb] rounded-[15px] border border-[#00000013] p-4">
                <div className="flex justify-between">
                    <Typography color="text.secondary">مجموع قیمت سبد</Typography>

                    <Typography fontWeight={700}>{totalOriginalPrice.toLocaleString()} ریال</Typography>
                </div>

                <div className="flex justify-between">
                    <Typography color="text.secondary">مجموع تخفیف</Typography>

                    <Typography fontWeight={700} color="success.main">
                        {totalDiscount.toLocaleString()} ریال
                    </Typography>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#00000015]">
                    <Typography fontWeight={700}>قیمت نهایی</Typography>

                    <Typography
                        fontWeight={800}
                        sx={{
                            color: '#850000',
                            fontSize: '18px',
                        }}
                    >
                        {totalPrice.toLocaleString()} ریال
                    </Typography>
                </div>

                <div className="text-sm text-gray-600 leading-6 mt-2 flex items-center gap-3">
                    <MdError size="1.3rem" />

                    <span>هزینه ارسال در محل و هنگام تحویل سفارش، توسط شرکت پست دریافت می‌شود.</span>
                </div>

                <Link href="/checkout-page" style={{ textDecoration: 'none' }}>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: '#850000',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            py: 1.2,
                            mt: 1,
                            color: '#fff',

                            '&:hover': {
                                backgroundColor: '#6f0000',
                            },
                        }}
                    >
                        نهایی کردن خرید
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CartPage;
