import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { CircularProgress, Snackbar, Alert } from '@mui/material';

import { useCart } from '@/context/CartContext';
import ProductInfo from '@/components/productPage/ProductInfo';
import ProductMedia from '@/components/productPage/ProductMedia';
import ProductActions from '@/components/productPage/ProductActions';
import ProductPageSkeleton from '@/components/loadings/ProductPageSkeleton';

function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const { cart, addToCart, decreaseQuantity } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [sizeId, setSizeId] = useState('');

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        type: 'success',
    });

    const showAlert = (message, type = 'success') => {
        setAlert({
            open: true,
            message,
            type,
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

    // sizes (based on selected color)
    const sizes = useMemo(() => {
        if (!product) return [];

        return product.sizes
            .filter((s) => s.color === selectedColor)
            .map((s) => ({
                size: s.size,
                stock: s.stock,
            }));
    }, [product, selectedColor]);

    const totalStock = useMemo(() => {
        if (!product) return 0;
        return product.sizes.reduce((acc, i) => acc + i.stock, 0);
    }, [product]);

    useEffect(() => {
        if (!product || !selectedColor) return;

        const available = product.sizes.filter((s) => s.color === selectedColor && s.stock > 0);

        if (available.length) {
            setSelectedSize(available[0].size);
        } else {
            setSelectedSize('');
        }
    }, [selectedColor, product]);

    const finalPrice = useMemo(() => {
        if (!product) return 0;
        return product.price - (product.price * (product.discount || 0)) / 100;
    }, [product]);

    const cartItem = useMemo(() => {
        if (!product) return undefined;

        return cart.find((item) => item.productId === product._id && item.color === selectedColor && item.size === selectedSize);
    }, [cart, product, selectedColor, selectedSize]);

    const getVariant = () => {
        if (!product) return null;

        return product.sizes.find((i) => i.size === selectedSize && i.color === selectedColor);
    };

    const handleAdd = () => {
        if (!selectedColor || !selectedSize) {
            showAlert('لطفاً رنگ و سایز را انتخاب کنید', 'error');
            return;
        }

        const variant = getVariant();

        if (!variant) return;

        const stock = variant.stock;
        const currentQty = cartItem?.quantity || 0;

        if (stock === 0) {
            showAlert('این محصول ناموجود است', 'error');
            return;
        }

        if (currentQty >= stock) {
            showAlert('بیشتر از موجودی نمی‌توان اضافه کرد', 'error');
            return;
        }

        addToCart(product, {
            color: selectedColor,
            size: selectedSize,
            sizeId: variant._id,
        });

        showAlert('به سبد خرید اضافه شد', 'success');
    };

    if (loading) {
        return <ProductPageSkeleton />;
    }

    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-[1100px] mx-auto p-4 pb-24 flex flex-col lg:flex-row gap-8 mt-4">
            {/* ALERT */}
            <Snackbar
                open={alert.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2500}
                onClose={() => setAlert((p) => ({ ...p, open: false }))}
            >
                <Alert
                    severity={alert.type}
                    iconSpacing={2}
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        fontSize: 16,
                        fontWeight: 600,
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        boxShadow: 4,
                        '& .MuiAlert-message': {
                            paddingRight: 2,
                        },
                    }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* MEDIA */}
            <div className="flex-1 flex flex-col gap-4">
                <ProductMedia images={product.images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            </div>

            {/* INFO + ACTIONS */}
            <div className="flex-1 flex flex-col gap-6">
                <ProductInfo product={product} finalPrice={finalPrice} />

                <ProductActions
                    colors={colors}
                    sizes={sizes}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    setSizeId={setSizeId}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    cartItem={cartItem}
                    handleAdd={handleAdd}
                    decreaseQuantity={decreaseQuantity}
                    product={product}
                    totalStock={totalStock}
                />
            </div>
        </div>
    );
}

export default ProductPage;
