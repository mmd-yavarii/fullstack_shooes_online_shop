import { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, CircularProgress, Paper, Stack } from '@mui/material';

import Link from 'next/link';

const steps = ['ثبت شده', 'در حال پردازش', 'ارسال شده'];

export default function Order() {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getStepFromStatus = (status) => {
        switch (status) {
            case 'pending':
                return 1;

            case 'confirmed':
                return 2;

            case 'cancelled':
                return -1;

            default:
                return 0;
        }
    };

    const handleSubmit = async () => {
        if (phone.length < 10) {
            alert('شماره معتبر نیست');
            return;
        }

        setLoading(true);
        setError('');
        setOrders([]);

        try {
            const res = await fetch(`/api/transaction/order/${phone}`);
            const data = await res.json();

            if (!res.ok) {
                setError('هیچ سفارشی پیدا نشد');
                return;
            }

            setOrders(data?.data || data || []);
        } catch {
            setError('خطای سرور');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
            {/* INPUT */}
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="شماره تلفن"
                style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    fontSize: '16px',
                    marginBottom: 10,
                }}
            />

            {/* BUTTON */}
            <button
                onClick={handleSubmit}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#6D071A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                }}
            >
                پیگیری سفارش‌ها
            </button>

            {/* LOADING */}
            {loading && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {/* ERROR */}
            {error && <Typography sx={{ mt: 2, color: 'red', textAlign: 'center' }}>{error}</Typography>}

            {/* ORDERS */}
            {orders.map((order) => (
                <Paper key={order._id} sx={{ mt: 3, p: 2, borderRadius: 3 }}>
                    {/* STATUS SECTION */}
                    {order.orderStatus === 'cancelled' ? (
                        <Typography
                            sx={{
                                textAlign: 'center',
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                        >
                            سفارش لغو شده است
                        </Typography>
                    ) : (
                        <Stepper activeStep={getStepFromStatus(order.orderStatus)}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    )}

                    {/* INFO */}
                    <Box sx={{ mt: 3 }}>
                        <Typography>نام: {order.fullName}</Typography>
                        <Typography>شماره: {order.phone}</Typography>
                        <Typography>آدرس: {order.address}</Typography>
                        <Typography>کد پستی: {order.postalCode}</Typography>

                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>مجموع: {(order.totalPrice || 0).toLocaleString()} تومان</Typography>
                    </Box>

                    {/* ITEMS */}
                    <Box sx={{ mt: 3 }}>
                        <Typography sx={{ fontWeight: 700, mb: 1 }}>محصولات سفارش</Typography>

                        <Stack spacing={1}>
                            {order.items?.map((item, idx) => {
                                const product = item.product;

                                return (
                                    <Box
                                        key={idx}
                                        sx={{
                                            p: 1,
                                            border: '1px solid #eee',
                                            borderRadius: 2,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                محصول: {product.title || 'نامشخص'}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        backgroundColor: item.color || '#ccc',
                                                        border: '1px solid #ddd',
                                                    }}
                                                />

                                                <Typography variant="caption">سایز: {item.size || '-'}</Typography>
                                            </Box>

                                            <Link href={`/product/${product._id}`} className="text-blue-600">
                                                دیدن محصول
                                            </Link>
                                        </Box>

                                        <Typography sx={{ fontWeight: 600 }}>{(item.price || 0).toLocaleString()} تومان</Typography>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>

                    {/* DATE */}
                    <Typography sx={{ mt: 2, color: 'gray' }}>تاریخ: {new Date(order.createdAt).toLocaleString('fa-IR')}</Typography>
                </Paper>
            ))}
        </div>
    );
}
