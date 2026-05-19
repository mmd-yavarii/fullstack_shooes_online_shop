'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('cart');

        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // add to cart handeler
    const addToCart = (product, variant) => {
        const { size, color } = variant;

        const exist = cart.find((item) => item.productId === product._id && item.size === size && item.color === color);

        if (exist) {
            const updated = cart.map((item) => {
                if (item.productId === product._id && item.size === size && item.color === color) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            });

            setCart(updated);
        } else {
            setCart([
                ...cart,
                {
                    productId: product._id,
                    title: product.title,
                    price: product.price,
                    discount: product.discount || 0,
                    image: product.images?.[0],
                    size,
                    color,
                    quantity: 1,
                },
            ]);
        }
    };

    const decreaseQuantity = (productId, size, color) => {
        const updated = cart
            .map((item) => {
                if (item.productId === productId && item.size === size && item.color === color) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }

                return item;
            })
            .filter((item) => item.quantity > 0);

        setCart(updated);
    };

    // delete item from cart handeler
    const removeFromCart = (productId, size, color) => {
        setCart(cart.filter((item) => !(item.productId === productId && item.size === size && item.color === color)));
    };

    // clear cart handeler
    const clearCart = () => setCart([]);

    const totalOriginalPrice = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const totalDiscount = cart.reduce((sum, item) => {
        const discountAmount = (item.price * item.discount) / 100;

        return sum + discountAmount * item.quantity;
    }, 0);

    const totalPrice = totalOriginalPrice - totalDiscount;

    return (
        <CartContext.Provider
            value={{
                cart,

                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,

                totalOriginalPrice,
                totalDiscount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
