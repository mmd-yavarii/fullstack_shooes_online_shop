import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { CircularProgress, Snackbar, Alert, Button } from '@mui/material';

import { useCart } from '@/context/CartContext';
import ProductInfo from '@/components/productPage/ProductInfo';
import ProductMedia from '@/components/productPage/ProductMedia';
import ProductActions from '@/components/productPage/ProductActions';

function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const { cart, addToCart, decreaseQuantity } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const [alert, setAlert] = useState({
        open: false,
        message: '',
    });

    const showAlert = (message) => {
        setAlert({
            open: true,
            message,
        });
    };

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setLoading(true);

            const res = await fetch(`/api/product/${id}`);
            const data = await res.json();

            const p = data.product;
            setProduct(p);

            if (p?.sizes?.length) {
                setSelectedColor(p.sizes[0].color);
                setSelectedSize(p.sizes[0].size);
            }

            if (p?.images?.length) {
                setSelectedImage(p.images[0]);
            }

            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    // colors
    const colors = useMemo(() => {
        if (!product) return [];
        return [...new Set(product.sizes.map((s) => s.color))];
    }, [product]);

    // sizes
    const sizes = useMemo(() => {
        if (!product) return [];
        return product.sizes.filter((s) => s.color === selectedColor).map((s) => s.size);
    }, [product, selectedColor]);

    useEffect(() => {
        if (!product || !selectedColor) return;

        const first = product.sizes.find((s) => s.color === selectedColor);

        if (first) setSelectedSize(first.size);
    }, [selectedColor]);

    const finalPrice = useMemo(() => {
        if (!product) return 0;
        return product.price - (product.price * (product.discount || 0)) / 100;
    }, [product]);

    const handleAdd = () => {
        if (!selectedColor || !selectedSize) return;

        addToCart(product, {
            color: selectedColor,
            size: selectedSize,
        });

        showAlert('به سبد خرید اضافه شد');
    };

    const cartItem = cart.find((item) => item.productId === product?._id && item.color === selectedColor && item.size === selectedSize);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <CircularProgress />
            </div>
        );
    }

    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-[1100px] mx-auto p-4 pb-24 flex flex-col lg:flex-row gap-8">
            {/* 🔥 ALERT TOP */}
            <Snackbar
                open={alert.open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                autoHideDuration={2500}
                onClose={() =>
                    setAlert((p) => ({
                        ...p,
                        open: false,
                    }))
                }
            >
                <Alert
                    severity="success"
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        fontSize: 16,
                        fontWeight: 600,
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        boxShadow: 4,
                    }}
                >
                    به سبد خرید اضافه شد
                </Alert>
            </Snackbar>

            {/* 📸 RIGHT (or top in mobile) */}
            <div className="flex-1 flex flex-col gap-4">
                <ProductMedia images={product.images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            </div>

            {/* 🧾 LEFT */}
            <div className="flex-1 flex flex-col gap-6">
                <ProductInfo product={product} finalPrice={finalPrice} />

                <ProductActions
                    colors={colors}
                    sizes={sizes}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    cartItem={cartItem}
                    handleAdd={handleAdd}
                    decreaseQuantity={decreaseQuantity}
                    product={product}
                />
            </div>

            {/* 🔥 STICKY BOTTOM BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 z-50  p-3">
                <div className="max-w-[1100px] mx-auto">
                    {cartItem ? (
                        <div className="flex items-center justify-center">
                            <div className="flex gap-3 items-center w-fit justify-center bg-[#850000] p-2 rounded-[10px] text-white font-bold text-[15px]">
                                <button className="text-2xl" onClick={() => decreaseQuantity(product._id, selectedSize, selectedColor)}>
                                    -
                                </button>
                                <span className="mx-6">{cartItem.quantity}</span>
                                <button onClick={handleAdd} className="text-2xl">
                                    +
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Button variant="contained" className="w-full" onClick={handleAdd}>
                            افزودن به سبد خرید
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
