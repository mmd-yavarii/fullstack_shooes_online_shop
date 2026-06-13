import React, { useState } from 'react';
import { Box, Typography, Chip, Dialog, DialogTitle, DialogActions, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

// react-icons
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import { applyDiscount } from '@/helper/help';

function AdminProductCard({ info, onDelete }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const totalStock = info.sizes?.reduce((sum, item) => sum + item.stock, 0) || 0;
    const isOutOfStock = totalStock === 0;

    const handleEdit = () => {
        router.push(`/admin/products/edit/${info._id}`);
    };

    return (
        <>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    p: 2,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',

                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                {/* IMAGE */}
                <Box
                    sx={{
                        position: 'relative',
                        width: 90,
                        height: 90,
                        flexShrink: 0,
                    }}
                >
                    <Box
                        component="img"
                        src={info.images?.[0] || '/placeholder.png'}
                        alt={info.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                            opacity: isOutOfStock ? 0.5 : 1,
                            filter: isOutOfStock ? 'grayscale(1)' : 'none',
                        }}
                    />
                    {isOutOfStock && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',

                                bgcolor: '#1111119d',
                                color: '#fff',

                                px: 2,
                                py: 0.8,

                                borderRadius: 999,

                                fontSize: '0.8rem',
                                fontWeight: 700,

                                boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                            }}
                        >
                            ناموجود
                        </Box>
                    )}

                    {/* OFF BADGE */}
                    {info.discount > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,

                                bgcolor: '#dc2626',
                                color: '#fff',

                                px: 1,
                                py: 0.4,

                                borderRadius: 999,

                                fontSize: '0.72rem',
                                fontWeight: 700,

                                boxShadow: '0 6px 16px rgba(220,38,38,0.35)',
                            }}
                        >
                            %{info.discount} OFF
                        </Box>
                    )}
                </Box>

                {/* INFO */}
                <Box sx={{ flex: 1 }}>
                    {/* TITLE */}
                    <Typography
                        fontWeight={700}
                        fontSize="0.95rem"
                        sx={{
                            mb: 0.5,
                            lineHeight: 1.8,
                        }}
                    >
                        {info.title}
                    </Typography>

                    {/* PRICE */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        {info.discount ? (
                            <>
                                {/* FINAL PRICE */}
                                <Typography
                                    sx={{
                                        color: '#dc2626',
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {applyDiscount(info.price, info.discount).toLocaleString()} ریال
                                </Typography>

                                {/* ORIGINAL PRICE */}
                                <Typography
                                    sx={{
                                        textDecoration: 'line-through',
                                        color: 'text.secondary',
                                        fontSize: '0.82rem',
                                    }}
                                >
                                    {info.price.toLocaleString()} ریال
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {info.price} ریال
                            </Typography>
                        )}
                    </Box>

                    {/* STATUS */}
                    <Chip
                        size="small"
                        label={info.isActive ? 'فعال' : 'غیرفعال'}
                        sx={{
                            mt: 1.5,

                            bgcolor: info.isActive ? '#6d071a22' : '#00000012',
                            color: info.isActive ? '#6D071A' : '#6b7280',

                            fontWeight: 700,

                            borderRadius: 2,

                            '& .MuiChip-label': {
                                px: 1,
                            },
                        }}
                    />
                </Box>

                {/* ACTIONS */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    {/* EDIT */}
                    <Tooltip title="ویرایش">
                        <IconButton
                            onClick={handleEdit}
                            sx={{
                                color: '#6D071A',
                                backgroundColor: '#6d071a18',
                                borderRadius: 2,

                                transition: '0.2s',

                                '&:hover': {
                                    backgroundColor: '#6d071a28',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <FiEdit2 size={18} />
                        </IconButton>
                    </Tooltip>

                    {/* DELETE */}
                    <Tooltip title="حذف">
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{
                                color: '#ef4444',
                                backgroundColor: '#ef444418',
                                borderRadius: 2,

                                transition: '0.2s',

                                '&:hover': {
                                    backgroundColor: '#ef44442c',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <FiTrash2 size={18} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* CONFIRM DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>آیا مطمئنی که می‌خواهی این محصول حذف شود؟</DialogTitle>

                <DialogActions>
                    <span onClick={() => setOpen(false)} className="cursor-pointer">
                        لغو
                    </span>

                    <span
                        className="text-red-500 mx-4 cursor-pointer"
                        onClick={() => {
                            onDelete(info._id);
                            setOpen(false);
                        }}
                    >
                        حذف
                    </span>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminProductCard;
