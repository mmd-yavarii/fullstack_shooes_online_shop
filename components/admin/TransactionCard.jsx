import React, { useState } from 'react';

import { Box, Typography, Chip, Stack } from '@mui/material';

import Link from 'next/link';
import { getColorNameByHex } from '@/helper/help';
import TransactionPrint from './TransactionPrint';

function TransactionCard({ data }) {
    const { fullName, phone, nationalCode, address, postalCode, totalPrice, orderStatus, items = [] } = data;

    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState(orderStatus);
    const [loading, setLoading] = useState(false);

    // ORDER STATUS

    const getStatus = (status) => {
        const map = {
            confirmed: 'تایید شده',
            pending: 'در انتظار تایید',
            cancelled: 'لغو شده',
        };

        return map[status] || status;
    };

    const getStyle = (status) => {
        const map = {
            confirmed: { bg: '#16a34a26', color: '#16a34a' },
            pending: { bg: '#f59f0b31', color: '#ca8000' },
            cancelled: { bg: '#dc26262b', color: '#dc2626' },
        };

        return map[status] || { bg: '#6b7280', color: '#fff' };
    };

    // PAYMENT STATUS (NOW STATEFUL)
    const [paymentStatusState, setPaymentStatusState] = useState(data.paymentStatus);

    const getPaymentStatus = (status) => {
        const map = {
            unpaid: 'پرداخت نشده',
            pending: 'در انتظار پرداخت',
            paid: 'پرداخت شده',
            failed: 'ناموفق',
            refunded: 'برگشت داده شده',
        };

        return map[status] || status;
    };

    const getPaymentStyle = (status) => {
        const map = {
            unpaid: { bg: '#6b728026', color: '#6b7280' },
            pending: { bg: '#f59f0b33', color: '#b45309' },
            paid: { bg: '#16a34a26', color: '#16a34a' },
            failed: { bg: '#dc26262b', color: '#dc2626' },
            refunded: { bg: '#3b82f626', color: '#2563eb' },
        };

        return map[status] || { bg: '#6b7280', color: '#fff' };
    };

    const updateStatus = async (newStatus) => {
        try {
            setLoading(true);

            const res = await fetch('/api/transaction/update-status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: data._id,
                    orderStatus: newStatus,
                }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || 'خطا');

            setStatus(newStatus);
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const style = getStyle(status);
    const isFinal = status !== 'pending';

    return (
        <>
            {/* pdf data */}
            <TransactionPrint open={open} onClose={() => setOpen(false)} data={data} />

            {/* component style */}
            <Box
                sx={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 3,
                    p: 2,
                    mb: 2,
                    backgroundColor: '#fff',
                    transition: '0.2s',
                    '&:hover': {
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                <div className="my-2">
                    <Chip
                        label={getStatus(status)}
                        sx={{
                            backgroundColor: style.bg,
                            color: style.color,
                            fontWeight: 700,
                            mr: 1,
                            ml: 1,
                        }}
                    />

                    <Chip
                        label={getPaymentStatus(paymentStatusState)}
                        sx={{
                            backgroundColor: getPaymentStyle(paymentStatusState).bg,
                            color: getPaymentStyle(paymentStatusState).color,
                            fontWeight: 700,
                        }}
                    />
                </div>

                <div className="mb-5 flex items-center justify-between">
                    <p className="font-bold text-[20px]">{data.user.fullName}</p>
                    <button onClick={() => setOpen(true)} className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white">
                        چاپ PDF
                    </button>
                </div>

                {/* USER INFO */}

                <Box sx={{ gridColumn: '1 / -1', p: 1.5, bgcolor: '#f9fafb', borderRadius: 2 }}>
                    <Typography variant="body2">شماره: {data.user.phone}</Typography>
                    <Typography variant="body2">کد پستی: {data.user.postalCode}</Typography>

                    <Typography variant="caption">آدرس : {data.user.address}</Typography>
                </Box>

                {/* PRICING */}
                <Box sx={{ gridColumn: '1 / -1', p: 1.5, bgcolor: '#f9fafb', borderRadius: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        قیمت کل: {(data.pricing?.totalOriginalPrice || 0).toLocaleString()} ریال
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'red', my: 1 }}>
                        مجموع تخفیف: {(data.pricing?.totalDiscount || 0).toLocaleString()} ریال
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        مبلغ نهایی: {(data.pricing?.totalFinalPrice || 0).toLocaleString()} ریال
                    </Typography>
                </Box>

                {/* payments */}
                <Box sx={{ gridColumn: '1 / -1', p: 1.5, bgcolor: '#f9fafb', borderRadius: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        شماره کارت : {data.cardPan || '---'}
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        شماره پیگیری تراکنش : {data.refId || '---'}
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        تاریخ پرداخت : {data.paidAt ? new Date(data.paidAt).toLocaleString('fa-IR') : '---'}
                    </Typography>
                </Box>

                {/* ITEMS */}
                <Box sx={{ mt: 2, p: 1.5, border: '1px solid #eee', borderRadius: 2, bgcolor: '#fcfcfc' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        محصولات خریداری شده
                    </Typography>

                    {items?.length === 0 ? (
                        <Typography variant="body2">محصولی ثبت نشده</Typography>
                    ) : (
                        <Stack spacing={1}>
                            {items.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        p: 1,
                                        border: '1px solid #eee',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" fontWeight={600}>
                                            محصول: {item?.product?.title || 'نامشخص'}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                            <Box
                                                sx={{
                                                    width: 14,
                                                    height: 14,
                                                    borderRadius: '50%',
                                                    backgroundColor: item?.color || '#ccc',
                                                }}
                                            />

                                            <Typography variant="caption">سایز: {item?.size}</Typography>

                                            <Link href={`/product/${item?.product?._id}`}>دیدن محصول</Link>
                                        </Box>
                                    </Box>

                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body2">تعداد: {item?.quantity}</Typography>
                                        <Typography fontWeight={600}>{(item?.finalPrice || 0).toLocaleString()} ریال</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* ACTIONS */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* ORDER STATUS */}
                        {!isFinal && (
                            <>
                                <button
                                    className="btn btn-success bg-teal-100 text-teal-500 font-medium p-1 rounded-sm cursor-pointer"
                                    disabled={loading}
                                    onClick={() => updateStatus('confirmed')}
                                >
                                    سفارش ارسال شد
                                </button>

                                <button
                                    className="btn bg-red-100 text-red-500 font-medium p-1 rounded-sm cursor-pointer"
                                    disabled={loading}
                                    onClick={() => updateStatus('cancelled')}
                                >
                                    لغو سفارش
                                </button>
                            </>
                        )}

                        {/* PAYMENT STATUS BUTTONS */}
                        {paymentStatusState === 'paid' && (
                            <button
                                className={'bg-blue-100 text-blue-500 font-medium p-1 rounded-sm cursor-pointer'}
                                disabled={loading}
                                onClick={async () => {
                                    try {
                                        setLoading(true);

                                        const res = await fetch(`/api/payment/refund/${data._id}`, {
                                            method: 'POST',
                                        });

                                        const result = await res.json();

                                        if (!res.ok) {
                                            throw new Error(result.message || 'خطا');
                                        }

                                        setPaymentStatusState('refunded');

                                        await updateStatus('cancelled');

                                        alert(result.message);
                                    } catch (error) {
                                        console.log(error);
                                        alert(error.message);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                بازگشت وجه انجام شد
                            </button>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TransactionCard;
