import React, { useEffect, useState } from 'react';
import { CircularProgress, Card, CardMedia, Typography, Box, Button, Stack } from '@mui/material';

function UploadsPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(null); // اسم عکس در حال حذف

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);

            const res = await fetch('/api/uploads/list');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'خطا در دریافت تصاویر');
            }

            setImages(data.images || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (url) => {
        const confirmDelete = window.confirm('آیا مطمئنی می‌خوای حذف کنی؟');
        if (!confirmDelete) return;

        try {
            setDeleting(url);

            const res = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'خطا در حذف تصویر');
            }

            // حذف از state بدون رفرش
            setImages((prev) => prev.filter((img) => img.url !== url));
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    if (!images.length) {
        return <div className="text-center py-20 text-gray-500">هیچ تصویری پیدا نشد</div>;
    }

    return (
        <div className="max-w-[1000px] mx-auto p-4">
            <p className="text-[20px] text-center my-[30px]">مدیریت تصاویر اپلود شده در سایت</p>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr',
                    },
                    gap: 2,
                }}
            >
                {images.map((img) => (
                    <Card
                        key={img.name}
                        sx={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            transition: '0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <CardMedia component="img" image={img.url} alt={img.name} sx={{ height: 200, objectFit: 'cover' }} />

                        <button
                            className="text-red-500 w-full p-2 bg-red-50 cursor-pointer"
                            disabled={deleting === img.url}
                            onClick={() => handleDelete(img.url)}
                        >
                            {deleting === img.url ? 'در حال حذف...' : 'حذف'}
                        </button>
                    </Card>
                ))}
            </Box>
        </div>
    );
}

export default UploadsPage;
