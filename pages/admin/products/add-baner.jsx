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
    TextField,
} from '@mui/material';

import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function AddBaner() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        images: [],
        title: '',
        description: '',
    });

    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // AUTH + FETCH BANNERS
    const { data, isLoading } = useQuery({
        queryKey: ['baners'],
        queryFn: async () => {
            const res = await fetch('/api/baner/get-baner-imgs');
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            return data;
        },
    });

    const baners = data?.baners || [];

    // ADD BANNER
    const addMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await fetch('/api/baner/add-baner-img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            return data;
        },
        onSuccess: () => {
            setAlert({
                open: true,
                type: 'success',
                message: 'بنر با موفقیت اضافه شد',
            });

            setForm({
                images: [],
                title: '',
                description: '',
            });

            queryClient.invalidateQueries(['baners']);
        },
        onError: (err) => {
            setAlert({
                open: true,
                type: 'error',
                message: err.message || 'خطا در ثبت بنر',
            });
        },
    });

    // DELETE BANNER
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`/api/baner/delete-baner-img/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            return id;
        },
        onSuccess: (id) => {
            setAlert({
                open: true,
                type: 'success',
                message: 'بنر حذف شد',
            });

            queryClient.setQueryData(['baners'], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    baners: old.baners.filter((b) => b._id !== id),
                };
            });
        },
        onError: (err) => {
            setAlert({
                open: true,
                type: 'error',
                message: err.message || 'خطا در حذف بنر',
            });
        },
    });

    const submitHandler = () => {
        if (!form.images.length || !form.title || !form.description) {
            setAlert({
                open: true,
                type: 'error',
                message: 'همه فیلدها الزامی هستند',
            });
            return;
        }

        addMutation.mutate({
            image: form.images[0],
            title: form.title,
            description: form.description,
        });
    };

    const deleteHandler = (id) => {
        deleteMutation.mutate(id);
    };

    return (
        <>
            <p className="text-center p-4 font-bold">مدیریت بنر های سایت</p>

            {/* ALERT */}
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() =>
                    setAlert((p) => ({
                        ...p,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert
                    severity={alert.type}
                    variant="filled"
                    onClose={() =>
                        setAlert((p) => ({
                            ...p,
                            open: false,
                        }))
                    }
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* CONFIRM */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>حذف بنر</DialogTitle>
                <DialogContent>
                    <Typography>آیا مطمئن هستی؟</Typography>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setConfirmOpen(false)}>لغو</button>
                    <button
                        className="text-red-500 mr-5"
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
                {/* FORM */}
                <div className="w-full max-w-[600px] mx-auto flex flex-col gap-4">
                    <TextField
                        label="عنوان بنر"
                        fullWidth
                        value={form.title}
                        onChange={(e) =>
                            setForm((p) => ({
                                ...p,
                                title: e.target.value,
                            }))
                        }
                    />

                    <TextField
                        label="توضیحات بنر"
                        fullWidth
                        multiline
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                            setForm((p) => ({
                                ...p,
                                description: e.target.value,
                            }))
                        }
                    />

                    <UploadImg setForm={setForm} form={form} fieldName="image" />

                    <Button variant="contained" fullWidth onClick={submitHandler}>
                        افزودن بنر
                    </Button>
                </div>

                {/* LIST */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <p className="font-bold">لیست بنر ها</p>
                        <div className="bg-zinc-100 px-4 py-2 rounded-full text-sm">{baners.length} بنر</div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-16">
                            <CircularProgress />
                        </div>
                    ) : !baners.length ? (
                        <div className="border border-dashed rounded-3xl py-16 text-center text-zinc-500">هیچ بنری وجود ندارد</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {baners.map((item) => (
                                <Card
                                    key={item._id}
                                    sx={{
                                        borderRadius: '24px',
                                        border: '1px solid #e4e4e7',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.image?.url || '/placeholder.png'}
                                        sx={{
                                            height: 220,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight={700}>
                                            {item.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {item.description}
                                        </Typography>

                                        <div className="flex justify-between items-center mt-4">
                                            <Typography variant="caption">ID: {item._id.slice(0, 8)}</Typography>

                                            <Button
                                                color="error"
                                                variant="contained"
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
