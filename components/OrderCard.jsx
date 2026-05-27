import { Box, Typography, Paper, Stack, Stepper, Step, StepLabel, Chip, Divider, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const orderSteps = ['ثبت شده', 'در حال پردازش', 'ارسال شده'];

const getOrderStep = (status) => {
    switch (status) {
        case 'pending':
            return 0;
        case 'confirmed':
            return 1;
        case 'shipped':
            return 2;
        default:
            return 0;
    }
};

const paymentStatusText = {
    paid: 'پرداخت شده',
    unpaid: 'پرداخت نشده',
    pending: 'در انتظار پرداخت',
    failed: 'ناموفق',
    refunded: 'بازگشت وجه',
};

export default function OrderCard({ order }) {
    const active = getOrderStep(order.orderStatus);

    const isCancelled = order.orderStatus === 'cancelled';

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                borderRadius: 4,
                p: 2.5,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
                background: 'linear-gradient(180deg, #fff, #fafafa)',

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 240,
                    height: 240,
                    background: 'radial-gradient(circle, #78003c14 0%, transparent 70%)',
                    pointerEvents: 'none',
                },

                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 70,
                    left: '10%',
                    transform: 'translateX(-50%)',
                    width: 280,
                    height: 220,
                    background: 'radial-gradient(circle, #78003c14 0%, transparent 75%)',
                    pointerEvents: 'none',
                },

                boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
            }}
        >
            {/* HEADER STATUS */}
            <Box sx={{ mb: 2 }}>
                {isCancelled ? (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'error.main',
                            fontWeight: 800,
                            py: 1,
                        }}
                    >
                        سفارش لغو شده
                    </Typography>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            {orderSteps.map((step, index) => {
                                const active = index <= getOrderStep(order.orderStatus);

                                return (
                                    <Box
                                        key={step}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            flex: 1,
                                            minWidth: 70,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                bgcolor: active ? 'primary.main' : 'grey.300',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                mb: 1,
                                            }}
                                        >
                                            {index + 1}
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                textAlign: 'center',
                                                color: active ? 'text.primary' : 'text.secondary',
                                                fontWeight: active ? 700 : 400,
                                            }}
                                        >
                                            {step}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* USER INFO */}
            <Card
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    mb: 2,
                    backgroundColor: '#fff',
                }}
            >
                <CardContent>
                    <Typography fontWeight={700} mb={1}>
                        اطلاعات مشتری
                    </Typography>

                    <Stack spacing={0.5} sx={{ fontSize: 14 }}>
                        <Typography>نام: {order.user?.fullName}</Typography>
                        <Typography>شماره: {order.user?.phone}</Typography>
                        <Typography>آدرس: {order.user?.address}</Typography>
                        <Typography>کد پستی: {order.user?.postalCode}</Typography>
                    </Stack>

                    <Typography sx={{ mt: 2, fontWeight: 800, color: 'primary.main' }}>
                        مجموع: {order.pricing?.totalFinalPrice?.toLocaleString() || 0} ریال
                    </Typography>
                </CardContent>
            </Card>

            {/* ITEMS */}
            <Typography fontWeight={800} mb={1}>
                محصولات
            </Typography>

            <Stack spacing={1.5}>
                {order.items?.map((item, idx) => {
                    const product = item.product;

                    return (
                        <Card
                            key={idx}
                            elevation={0}
                            sx={{
                                border: 'none',
                                borderRadius: 0,
                                boxShadow: 'none',
                                position: 'relative',
                                transition: '0.2s',
                                background: 'transparent',

                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '1px',
                                    backgroundColor: '#0000006b',
                                    opacity: 0.15,
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {/* LEFT SIDE */}
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    {/* IMAGE WRAPPER */}
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: 60,
                                            height: 60,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            background: '#cccccc34',
                                        }}
                                    >
                                        <Image src={product?.images[0]} alt={product?.title || 'product image'} fill style={{ objectFit: 'cover' }} />
                                        {console.log(product)}
                                    </Box>

                                    {/* TEXTS */}
                                    <Box>
                                        <Typography fontWeight={700}>{product?.title || 'نامشخص'}</Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 1,
                                                alignItems: 'center',
                                                mt: 0.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: item.color || '#ccc',
                                                }}
                                            />
                                            <Typography variant="caption">سایز: {item.size}</Typography>
                                        </Box>

                                        <Link href={`/product/${product?._id}`}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                مشاهده محصول
                                            </Typography>
                                        </Link>
                                    </Box>
                                </Box>

                                {/* PRICE */}
                                <Typography fontWeight={800}>{item.finalPrice?.toLocaleString()} ریال</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>

            {/* FOOTER */}
            <Box
                sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    {new Date(order.createdAt).toLocaleString('fa-IR')}
                </Typography>

                <Chip
                    label={paymentStatusText[order.paymentStatus] || 'نامشخص'}
                    sx={{
                        fontWeight: 700,
                        borderRadius: 50,
                        px: 1,
                        backgroundColor:
                            order.paymentStatus === 'paid'
                                ? 'rgba(34,197,94,0.12)'
                                : order.paymentStatus === 'unpaid'
                                  ? 'rgba(239,68,68,0.12)'
                                  : 'rgba(245,158,11,0.12)',
                        color: order.paymentStatus === 'paid' ? '#16a34a' : order.paymentStatus === 'unpaid' ? '#dc2626' : '#d97706',
                    }}
                />
            </Box>
        </Paper>
    );
}
