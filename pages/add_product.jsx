import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

import AddProductForm from '@/components/AddProductForm';

export default function AddProduct() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        discount: 0,
        category: 'sneakers',
        gender: 'male',
        brand: {
            name: '',
            slug: '',
        },
        sizes: [],
        images: [],
        isActive: true,
    });

    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    const isFormValid = () => {
        return (
            form.title?.trim() &&
            form.description?.trim()?.length > 10 &&
            Number(form.price) > 0 &&
            form.category &&
            form.gender &&
            form.brand?.name?.trim() &&
            form.sizes.length > 0 &&
            form.images.length > 0
        );
    };

    const [sizeInput, setSizeInput] = useState({
        size: '',
        stock: '',
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleBrandChange = (value) => {
        setForm((prev) => ({
            ...prev,
            brand: {
                ...prev.brand,
                name: value,
                slug: value.toLowerCase().replace(/\s+/g, '-'),
            },
        }));
    };

    const addSize = () => {
        if (!sizeInput.size || !sizeInput.stock) return;

        setForm((prev) => ({
            ...prev,
            sizes: [...prev.sizes, sizeInput],
        }));

        setSizeInput({ size: '', stock: '' });
    };

    const removeSize = (index) => {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
    };

    const submitHandler = async () => {
        if (!isFormValid()) {
            setAlert({
                open: true,
                type: 'error',
                message: 'لطفاً همه اطلاعات محصول را کامل کنید',
            });
            return;
        }

        try {
            const res = await fetch('/api/product/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            setForm({
                title: '',
                description: '',
                price: 0,
                discount: 0,
                category: '',
                gender: 'male',
                brand: '',
                sizes: [],
                images: [],
                isActive: true,
            });

            setAlert({
                open: true,
                type: 'success',
                message: 'محصول با موفقیت اضافه شد',
            });
        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: 'خطا در ثبت محصول',
            });
        }
    };

    return (
        <>
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert((p) => ({ ...p, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={alert.type} onClose={() => setAlert((p) => ({ ...p, open: false }))} variant="filled" sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <AddProductForm
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleBrandChange={handleBrandChange}
                sizeInput={sizeInput}
                setSizeInput={setSizeInput}
                addSize={addSize}
                removeSize={removeSize}
                submitHandler={submitHandler}
            />
        </>
    );
}
