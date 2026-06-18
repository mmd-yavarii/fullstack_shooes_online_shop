import { useState } from 'react';
import { Dialog, DialogContent, Box, Typography, CircularProgress, Button, TextField, Fade } from '@mui/material';

import { IoClose } from 'react-icons/io5';
import { HiOutlineReceiptRefund } from 'react-icons/hi2';
import Image from 'next/image';

import OrderCard from './OrderCard';

const convertToEnglishNumbers = (value) =>
    value
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .replace(/\D/g, '');

export default function OrderModal({ open, onClose }) {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    console.log(orders);

    const handleSubmit = async () => {
        if (phone.length < 10) {
            alert('شماره معتبر نیست');
            return;
        }

        setLoading(true);
        setError('');
        setOrders([]);
        setSearched(true);

        try {
            const res = await fetch(`/api/transaction/order/${phone}`);
            const data = await res.json();

            if (!res.ok) {
                setError('هیچ سفارشی پیدا نشد');
                return;
            }

            setOrders(data?.data || []);
        } catch {
            setError('خطای سرور');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPhone('');
        setOrders([]);
        setError('');
        setSearched(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            TransitionComponent={Fade}
            PaperProps={{
                sx: {
                    borderRadius: '28px',
                    overflow: 'hidden',
                    background: 'linear-gradient(180deg,#ffffff 0%,#fafafa 100%)',
                    boxShadow: '0 20px 80px rgba(0,0,0,0.12)',
                },
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: '1px solid #f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div className="flex items-center gap-5">
                    <Box
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg,#6D071A,#9b0c28)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            boxShadow: '0 10px 20px rgba(109,7,26,0.25)',
                        }}
                    >
                        <HiOutlineReceiptRefund size={22} />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: '1rem',
                                color: '#111',
                            }}
                        >
                            پیگیری سفارش
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: '13px',
                                color: '#777',
                                mt: 0.3,
                            }}
                        >
                            مشاهده وضعیت سفارش و ارسال
                        </Typography>
                    </Box>
                </div>

                <button
                    onClick={handleClose}
                    className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer
               bg-gray-100 hover:bg-gray-200 active:scale-95
               transition-all duration-200 text-gray-600 hover:text-gray-900
               shadow-sm"
                >
                    <IoClose size={20} />
                </button>
            </Box>

            {/* CONTENT */}
            <DialogContent
                sx={{
                    p: 3,
                    background: 'linear-gradient(180deg,#fff 0%,#fcfcfc 100%)',
                }}
            >
                <TextField
                    fullWidth
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(convertToEnglishNumbers(e.target.value))}
                    placeholder="09123456789"
                    variant="outlined"
                    inputProps={{
                        maxLength: 11,
                        style: {
                            direction: 'ltr',
                            textAlign: 'right',
                        },
                    }}
                    sx={{
                        mb: 3,

                        '& .MuiOutlinedInput-root': {
                            borderRadius: '18px',
                            background: '#f7f8fa',
                            fontSize: '15px',
                            fontWeight: 500,

                            '& fieldset': {
                                borderColor: '#ececec',
                            },

                            '&:hover fieldset': {
                                borderColor: '#d0d0d0',
                            },

                            '&.Mui-focused fieldset': {
                                borderColor: '#6D071A',
                                borderWidth: '2px',
                            },
                        },
                    }}
                />

                {/* LOADING */}
                {loading && (
                    <Box
                        sx={{
                            py: 6,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress
                            sx={{
                                color: '#6D071A',
                            }}
                        />
                    </Box>
                )}

                {/* ERROR */}
                {error && (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: '#d32f2f',
                            fontWeight: 600,
                            mt: 2,
                        }}
                    >
                        {error}
                    </Typography>
                )}

                {/* ORDERS */}
                {orders.length > 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {orders.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </Box>
                ) : (
                    !loading && (
                        <Box
                            sx={{
                                mt: 2,
                                py: 6,
                                px: 3,
                                borderRadius: '28px',
                                textAlign: 'center',
                                background: 'linear-gradient(180deg,#ffffff,#fafafa)',
                                border: '1px solid #f1f1f1',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 3,
                                    borderRadius: '28px',
                                    background: 'linear-gradient(135deg,#fafafa,#f2f2f2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image src="/pngtree-add-location-3d-illustration-png-image_11518243.png" alt="tracking" width={80} height={80} />
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    color: '#111',
                                    mb: 1,
                                }}
                            >
                                سفارش خود را پیگیری کنید
                            </Typography>

                            <Typography
                                sx={{
                                    color: '#777',
                                    lineHeight: 2,
                                    fontSize: '14px',
                                    maxWidth: '400px',
                                    mx: 'auto',
                                }}
                            >
                                با وارد کردن شماره موبایل، وضعیت پرداخت، ارسال و جزئیات سفارش‌های خود را مشاهده کنید.
                            </Typography>
                        </Box>
                    )
                )}

                {/* BUTTON */}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        mt: 3,
                        height: 54,
                        borderRadius: '18px',
                        background: 'linear-gradient(135deg,#6D071A,#8f0a24)',
                        fontWeight: 800,
                        fontSize: '15px',
                        boxShadow: '0 10px 25px rgba(109,7,26,0.25)',

                        '&:hover': {
                            background: 'linear-gradient(135deg,#520513,#7c0b22)',
                        },
                    }}
                >
                    {loading ? 'در حال جستجو...' : 'پیگیری سفارش'}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
