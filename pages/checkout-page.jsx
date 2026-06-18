import React, { useState } from 'react';
import { Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import { useCart } from '@/context/CartContext';
import { MdError } from 'react-icons/md';

function CheckoutPage() {
    const { cart, totalOriginalPrice, totalDiscount, totalPrice } = useCart();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        postalCode: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const phoneRegex = /^09\d{9}$/;
    const postalRegex = /^\d{10}$/;

    const toEnglishNumbers = (str) => {
        return str.replace(/[۰-۹٠-٩]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)] || '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const converted = name === 'phone' || name === 'postalCode' ? toEnglishNumbers(value) : value;

        setForm({ ...form, [name]: converted });
    };

    const validate = () => {
        let newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = 'نام الزامی است';
        if (!form.lastName.trim()) newErrors.lastName = 'نام خانوادگی الزامی است';
        if (!phoneRegex.test(form.phone)) newErrors.phone = 'شماره تلفن معتبر نیست';
        if (!form.address.trim()) newErrors.address = 'آدرس الزامی است';
        if (!postalRegex.test(form.postalCode)) newErrors.postalCode = 'کد پستی باید ۱۰ رقم باشد';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = async () => {
        if (!validate()) return;

        setLoading(true);

        const payload = {
            user: {
                fullName: form.firstName + ' ' + form.lastName,
                phone: form.phone,
                address: form.address,
                postalCode: form.postalCode,
            },
            items: cart,
            pricing: {
                totalOriginalPrice,
                totalDiscount,
                totalFinalPrice: totalPrice,
            },
        };

        try {
            const response = await fetch('/api/transaction/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'خطا در ثبت سفارش');
            }

            const order = data.data;

            const paymentRes = await fetch('/api/payment/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pricing: order.pricing,
                    user: order.user,
                    orderId: order._id,
                }),
            });

            const paymentData = await paymentRes.json();

            if (!paymentRes.ok || !paymentData.url) {
                showSnackbar('خطا در اتصال به درگاه پرداخت', 'error');
                return;
            }

            if (paymentData.url) {
                window.location.href = paymentData.url;
            } else {
                showSnackbar('لینک پرداخت دریافت نشد', 'error');
            }

            console.log(paymentData);
        } catch (err) {
            showSnackbar(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        '& .MuiAlert-message': {
                            paddingRight: 2,
                        },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <div className="max-w-[900px] mx-auto p-4 flex flex-col gap-6">
                <div className="text-[#850000] my-6 text-center flex items-center gap-2">
                    <MdError size="1.3rem" />
                    <span>لطفاً اطلاعات خود را با دقت وارد کنید</span>
                </div>

                <div className="flex flex-col gap-4">
                    <TextField
                        name="firstName"
                        label="نام"
                        value={form.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                    />
                    <TextField
                        name="lastName"
                        label="نام خانوادگی"
                        value={form.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                    />
                    <TextField
                        name="phone"
                        label="شماره تلفن"
                        value={form.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        fullWidth
                    />
                    <TextField
                        name="address"
                        label="آدرس کامل"
                        value={form.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        name="postalCode"
                        label="کد پستی"
                        value={form.postalCode}
                        onChange={handleChange}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                        fullWidth
                    />
                </div>

                <div className="flex flex-col gap-4 bg-[#f5f7fb] rounded-[15px] border border-[#00000013] p-4">
                    <div className="flex justify-between">
                        <Typography>مجموع قیمت</Typography>
                        <Typography>{totalOriginalPrice.toLocaleString()} ریال</Typography>
                    </div>

                    <div className="flex justify-between">
                        <Typography>تخفیف</Typography>
                        <Typography color="success.main">{totalDiscount.toLocaleString()} ریال</Typography>
                    </div>

                    <div className="flex justify-between">
                        <Typography fontWeight={800}>قیمت نهایی</Typography>
                        <Typography fontWeight={800}>{totalPrice.toLocaleString()} ریال</Typography>
                    </div>

                    <Button
                        disabled={loading}
                        variant="contained"
                        fullWidth
                        onClick={handleCheckout}
                        sx={{
                            backgroundColor: '#850000',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            py: 1.2,
                        }}
                    >
                        {loading ? 'در حال ثبت...' : 'نهایی کردن خرید'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;
