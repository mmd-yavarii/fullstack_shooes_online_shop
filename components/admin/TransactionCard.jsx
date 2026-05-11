import React from 'react';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';

function TransactionCard({ data, onConfirm, onCancel }) {
    const { fullName, phone, nationalCode, address, postalCode, finalPrice, orderStatus } = data;

    const getStatusText = (status) => {
        switch (status) {
            case 'confirmed':
                return 'تایید شده';
            case 'pending':
                return 'در انتظار تایید';
            case 'cancelled':
                return 'لغو شده';
            default:
                return status;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed':
                return {
                    bg: '#16a34a26',
                    color: '#16a34a',
                };
            case 'pending':
                return {
                    bg: '#f59f0b31',
                    color: '#ca8000',
                };
            case 'cancelled':
                return {
                    bg: '#dc26262b',
                    color: '#dc2626',
                };
            default:
                return {
                    bg: '#6b7280',
                    color: '#ffffff',
                };
        }
    };

    const statusStyle = getStatusStyle(orderStatus);
    const isFinal = orderStatus !== 'pending';

    return (
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
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{fullName}</Typography>
            </Box>

            {/* Info */}
            {/* Info */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1.5,
                }}
            >
                <Typography variant="body2">شماره تلفن: {phone}</Typography>

                <Typography variant="body2">کد ملی: {nationalCode}</Typography>

                <Typography variant="body2">کد پستی: {postalCode}</Typography>

                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#111827' }}>
                    مبلغ نهایی: {finalPrice.toLocaleString()} تومان
                </Typography>

                {/* Address */}
                <Box
                    sx={{
                        gridColumn: '1 / -1',
                        backgroundColor: '#f9fafb',
                        p: 1.5,
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 0.5 }}>
                        آدرس
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                        {address}
                    </Typography>
                </Box>
            </Box>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 mt-3">
                {/* Status Chip */}
                <Chip
                    label={getStatusText(orderStatus)}
                    sx={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: 700,
                        fontSize: 12,
                        px: 1,
                        py: 0.5,
                        borderRadius: '8px',
                        letterSpacing: 0.3,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                        '& .MuiChip-label': {
                            px: 1,
                        },
                    }}
                />

                {/* Actions */}
                {!isFinal && (
                    <div className="flex items-center gap-2">
                        <Button
                            sx={{
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                color: '#fff',
                                fontSize: 13,
                                fontWeight: 700,
                                px: 2.5,
                                py: 1,
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 6px 16px rgba(22,163,74,0.25)',
                                transition: 'all 0.25s ease',
                            }}
                        >
                            تایید
                        </Button>

                        <Button
                            sx={{
                                backgroundColor: '#fff',
                                color: '#dc2626',
                                border: '1px solid rgba(220,38,38,0.4)',
                                fontSize: 13,
                                fontWeight: 700,
                                px: 2.5,
                                py: 1,
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 2px 6px rgba(220,38,38,0.08)',
                                transition: 'all 0.25s ease',
                            }}
                        >
                            لغو
                        </Button>
                    </div>
                )}
            </div>
        </Box>
    );
}

export default TransactionCard;
