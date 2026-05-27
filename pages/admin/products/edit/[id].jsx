import { useState, useEffect } from 'react';
import { Snackbar, Alert, CircularProgress, Box } from '@mui/material';

import { useRouter } from 'next/router';

import AddOrEditProductForm from '@/components/admin/AddOrEditProductForm';

export default function EditProduct() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = router.query;

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/verify', {
                    credentials: 'include',
                });

                const data = await res.json();

                if (!data.valid) {
                    router.replace('/admin/login_admin');
                }
            } catch (err) {
                router.back();
            }
        }

        checkAuth();
    }, []);

    // initial form
    const getInitialForm = () => ({
        title: '',
        description: '',
        group: '',
        price: '',
        discount: 0,
        category: '',

        // default gender
        gender: 'men',

        brand: {
            name: '',
            slug: '',
        },

        sizes: [],
        images: [],
        isActive: true,
    });

    const [form, setForm] = useState(getInitialForm());

    const [sizeInput, setSizeInput] = useState({
        size: '',
        stock: '',
        color: '#000000',
    });

    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    // get product
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/product/${id}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'خطا');
                }

                const product = data.product;

                // normalize product
                setForm({
                    title: product.title || '',

                    description: product.description || '',

                    group: product.group || '',

                    price: product.price || '',

                    discount: product.discount || 0,

                    category: product.category || '',

                    gender: product.gender || 'men',

                    brand: {
                        name: product.brand?.name || '',

                        slug: product.brand?.slug || '',
                    },

                    // sizes: Array.isArray(product.sizes) ? product.sizes : [],
                    sizes: Array.isArray(product.sizes)
                        ? product.sizes.map((s) => ({
                              size: s.size,
                              stock: s.stock,
                              color: s.color || '#000000',
                          }))
                        : [],

                    images: Array.isArray(product.images) ? product.images : [],

                    isActive: product.isActive ?? true,
                });
            } catch (error) {
                console.error(error);

                setAlert({
                    open: true,
                    type: 'error',
                    message: 'خطا در دریافت اطلاعات محصول',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // validation
    const isFormValid = () => {
        // console.log({
        //     title: form.title?.trim(),

        //     description: form.description?.trim()?.length > 10,

        //     price: Number(form.price) > 0,

        //     category: !!form.category,

        //     gender: form.gender,

        //     brand: !!form.brand?.name?.trim(),

        //     sizes: form.sizes?.length,

        //     images: form.images?.length,
        // });

        // return (
        //     !!form.title?.trim() &&
        //     form.description?.trim()?.length > 10 &&
        //     Number(form.price) > 0 &&
        //     !!form.category &&
        //     !!form.gender &&
        //     !!form.brand?.name?.trim() &&
        //     Array.isArray(form.sizes) &&
        //     form.sizes.length > 0 &&
        //     Array.isArray(form.images) &&
        //     form.images.length > 0
        // );

        return true;
    };

    // handle input change
    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // brand change
    const handleBrandChange = (value) => {
        setForm((prev) => ({
            ...prev,

            brand: {
                name: value,

                slug: value.toLowerCase().trim().replace(/\s+/g, '-'),
            },
        }));
    };

    // add size
    const addSize = () => {
        if (!sizeInput.size || sizeInput.stock === '') {
            return;
        }

        setForm((prev) => ({
            ...prev,

            sizes: [
                ...prev.sizes,
                {
                    size: sizeInput.size,
                    stock: Number(sizeInput.stock),
                    color: sizeInput.color,
                },
            ],
        }));

        setSizeInput({
            size: '',
            stock: '',
            color: '#000000',
        });
    };

    // remove size
    const removeSize = (index) => {
        setForm((prev) => ({
            ...prev,

            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
    };

    // submit
    const submitHandler = async () => {
        if (!isFormValid()) {
            setAlert({
                open: true,
                type: 'error',
                message: 'همه اطلاعات را کامل وارد کنید',
            });

            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`/api/product/edit/${id}`, {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    title: form.title,

                    description: form.description,

                    group: form.group,

                    price: form.price,

                    discount: form.discount,

                    category: form.category,

                    gender: form.gender,

                    brand: form.brand,

                    sizes: form.sizes,

                    images: form.images,

                    isActive: form.isActive,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'خطا');
            }

            setAlert({
                open: true,
                type: 'success',
                message: 'محصول با موفقیت ویرایش شد',
            });

            setTimeout(() => {
                router.back();
            }, 1500);
        } catch (error) {
            console.error(error);

            setAlert({
                open: true,
                type: 'error',
                message: 'خطا در ویرایش محصول',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // loading
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',

                    justifyContent: 'center',

                    alignItems: 'center',

                    minHeight: '50vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() =>
                    setAlert((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            >
                <Alert
                    severity={alert.type}
                    variant="filled"
                    onClose={() =>
                        setAlert((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            <AddOrEditProductForm
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleBrandChange={handleBrandChange}
                sizeInput={sizeInput}
                setSizeInput={setSizeInput}
                addSize={addSize}
                removeSize={removeSize}
                submitHandler={submitHandler}
                isLoading={isLoading}
                formType="edit"
            />
        </>
    );
}
