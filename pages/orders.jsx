import { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, CircularProgress, Paper, Stack } from '@mui/material';
import Link from 'next/link';

const orderSteps = ['ثبت شده', 'در حال پردازش', 'ارسال شده'];

// تبدیل اعداد فارسی/عربی به انگلیسی
const convertToEnglishNumbers = (value) => {
    return value
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .replace(/\D/g, '');
};

// order status
const getOrderStep = (status) => {
    switch (status) {
        case 'pending':
            return 1;
        case 'confirmed':
            return 2;
        case 'shipped':
            return 3;
        default:
            return 0;
    }
};

export default function Order() {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

            setOrders(data?.data || []);
        } catch (err) {
            console.log(err);
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
                dir="ltr"
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(convertToEnglishNumbers(e.target.value))}
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
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#6D071A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? 'در حال دریافت...' : 'پیگیری سفارش‌ها'}
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
                    {/* ORDER STATUS */}
                    {order.orderStatus === 'cancelled' ? (
                        <Typography sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>سفارش لغو شده است</Typography>
                    ) : (
                        <Stepper activeStep={getOrderStep(order.orderStatus)}>
                            {orderSteps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    )}

                    {/* PAYMENT STATUS */}
                    <Box
                        sx={{
                            mt: 2,
                            p: 1,
                            borderRadius: 2,
                            border: '1px solid #ddd',
                            backgroundColor:
                                order.paymentStatus === 'paid'
                                    ? '#e6ffed'
                                    : order.paymentStatus === 'failed'
                                      ? '#ffe6e6'
                                      : order.paymentStatus === 'unpaid'
                                        ? '#fff8e1'
                                        : '#fff8e1',
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>
                            وضعیت پرداخت: {order.paymentStatus === 'paid' && 'پرداخت شده'}
                            {order.paymentStatus === 'unpaid' && 'پرداخت نشده'}
                            {order.paymentStatus === 'pending' && 'در انتظار پرداخت'}
                            {order.paymentStatus === 'failed' && 'ناموفق'}
                            {order.paymentStatus === 'refunded' && 'بازگشت وجه'}
                        </Typography>
                    </Box>

                    {/* USER INFO */}
                    <Box sx={{ mt: 3 }}>
                        <Typography>نام: {order.user?.fullName}</Typography>
                        <Typography>شماره: {order.user?.phone}</Typography>
                        <Typography>آدرس: {order.user?.address}</Typography>
                        <Typography>کد پستی: {order.user?.postalCode}</Typography>

                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
                            مجموع: {order.pricing?.totalFinalPrice?.toLocaleString() || 0} ریال
                        </Typography>
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
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontWeight: 600 }}>محصول ID: {product?._id || 'نامشخص'}</Typography>

                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <Box
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        backgroundColor: item.color || '#ccc',
                                                    }}
                                                />
                                                <Typography variant="caption">سایز: {item.size}</Typography>
                                            </Box>

                                            <Link href={`/product/${product?._id}`} className="text-blue-600">
                                                دیدن محصول
                                            </Link>
                                        </Box>

                                        <Typography sx={{ fontWeight: 600 }}>{(item.finalPrice || 0).toLocaleString()} ریال</Typography>
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
