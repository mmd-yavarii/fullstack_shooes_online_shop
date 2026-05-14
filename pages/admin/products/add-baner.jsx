import UploadImg from '@/components/uploadImg';

import {
    Alert,
    Button,
    Snackbar,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import React, { useEffect, useState } from 'react';

function AddBaner() {
    const [form, setForm] = useState({
        images: [],
    });

    const [baners, setBaners] = useState([]);

    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    // confirm dialog state
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // get baners
    const getBaners = async () => {
        try {
            setLoading(true);

            const res = await fetch('/api/baner/get-baner-imgs');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setBaners(data.baners);
        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: 'خطا در دریافت بنر ها',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBaners();
    }, []);

    // add new baner
    const submitHandler = async () => {
        if (!form.images.length) {
            setAlert({
                open: true,
                type: 'error',
                message: 'عکسی برای بنر انتخاب نشده',
            });
            return;
        }

        try {
            const res = await fetch('/api/baner/add-baner-img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    images: form.images,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setAlert({
                open: true,
                type: 'success',
                message: 'بنر با موفقیت اضافه شد',
            });

            setForm({ images: [] });
            getBaners();
        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: err.message || 'خطا در ثبت بنر',
            });
        }
    };

    // delete baner
    const deleteHandler = async (id) => {
        try {
            const res = await fetch(`/api/baner/delete-baner-img/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setAlert({
                open: true,
                type: 'success',
                message: 'بنر حذف شد',
            });

            setBaners((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: err.message || 'خطا در حذف بنر',
            });
        }
    };

    return (
        <>
            <p className="text-center p-4 font-bold">مدیریت بنر های سایت</p>

            {/* ALERT */}
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert severity={alert.type} variant="filled" onClose={() => setAlert((prev) => ({ ...prev, open: false }))} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* CONFIRM DIALOG */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>حذف بنر</DialogTitle>

                <DialogContent>
                    <Typography>آیا از حذف این بنر مطمئن هستی؟</Typography>
                </DialogContent>

                <DialogActions>
                    <button onClick={() => setConfirmOpen(false)}>لغو</button>

                    <button
                        className="text-red-500 mr-3"
                        onClick={() => {
                            deleteHandler(selectedId);
                            setConfirmOpen(false);
                            setSelectedId(null);
                        }}
                    >
                        حذف
                    </button>
                </DialogActions>
            </Dialog>

            <div className="w-full max-w-[900px] mx-auto py-10 flex flex-col gap-10">
                {/* upload */}
                <div className="w-full max-w-[600px] mx-auto flex flex-col gap-10">
                    <div className="flex items-center justify-center">
                        <UploadImg setForm={setForm} form={form} />
                    </div>

                    <Button variant="contained" fullWidth onClick={submitHandler}>
                        افزودن بنر
                    </Button>
                </div>

                {/* list */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <p className="text-center p-4 font-bold">لیست بنر ها</p>

                        <div className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-full text-sm font-medium">{baners.length} بنر</div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <CircularProgress />
                        </div>
                    ) : !baners.length ? (
                        <div className="border border-dashed rounded-3xl py-16 flex items-center justify-center text-zinc-500 text-lg">
                            هیچ بنری وجود ندارد
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {baners.map((item) => (
                                <Card
                                    key={item._id}
                                    elevation={0}
                                    sx={{
                                        borderRadius: '24px',
                                        border: '1px solid #e4e4e7',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt="banner"
                                        sx={{
                                            height: 240,
                                            objectFit: 'cover',
                                        }}
                                    />

                                    <CardContent>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex flex-col">
                                                <Typography variant="h6" fontWeight={700}>
                                                    بنر سایت
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    ID : {item._id.slice(0, 8)}
                                                </Typography>
                                            </div>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    borderRadius: '12px',
                                                    boxShadow: 'none',
                                                }}
                                                onClick={() => {
                                                    setSelectedId(item._id);
                                                    setConfirmOpen(true);
                                                }}
                                            >
                                                حذف
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AddBaner;
