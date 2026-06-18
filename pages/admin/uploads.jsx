import React, { useState } from 'react';
import { CircularProgress, Card, CardMedia, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UploadsPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [deleting, setDeleting] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['uploads'],
        queryFn: async () => {
            const res = await fetch('/api/uploads/list');
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Error');

            return data;
        },
    });

    const images = data?.images || [];

    // DELETE IMAGE
    const deleteMutation = useMutation({
        mutationFn: async (publicId) => {
            const res = await fetch('/api/delete-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId }),
            });

            const data = await res.json();

            if (!res.ok || data?.result === 'not found') {
                throw new Error(data.message || 'Delete failed');
            }

            return publicId;
        },
        onMutate: (publicId) => {
            setDeleting(publicId);
        },
        onSuccess: (publicId) => {
            queryClient.setQueryData(['uploads'], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    images: old.images.filter((img) => img.publicId !== publicId),
                };
            });

            setDeleting(null);
        },
        onError: (err) => {
            alert(err.message || 'خطا در حذف تصویر');
            setDeleting(null);
        },
    });

    const handleDelete = (publicId) => {
        if (!confirm('آیا مطمئنی می‌خواهی این تصویر حذف شود؟')) return;

        deleteMutation.mutate(publicId);
    };

    // loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <CircularProgress />
            </div>
        );
    }

    // error
    if (error) {
        return <div className="text-center py-20 text-red-500">{error.message}</div>;
    }

    if (!images.length) {
        return <div className="text-center py-20 text-gray-500">هیچ تصویری پیدا نشد</div>;
    }

    return (
        <div className="max-w-[1000px] mx-auto p-4">
            <p className="text-[20px] text-center my-[30px]">مدیریت تصاویر</p>

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
                {images.map((img) => {
                    const used = img.usedInApp;

                    return (
                        <Card
                            key={img.publicId}
                            sx={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                position: 'relative',
                                opacity: used ? 0.5 : 1,
                            }}
                        >
                            <CardMedia component="img" image={img.url} sx={{ height: 200, objectFit: 'cover' }} />

                            <div
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    background: used ? '#000' : '#16a34a',
                                    color: '#fff',
                                    fontSize: 12,
                                    padding: '4px 8px',
                                    borderRadius: 999,
                                }}
                            >
                                {used ? 'در حال استفاده' : 'آزاد'}
                            </div>

                            {used ? (
                                <div
                                    style={{
                                        padding: 10,
                                        textAlign: 'center',
                                        background: '#f3f4f6',
                                        color: '#6b7280',
                                        fontSize: 13,
                                    }}
                                >
                                    قابل حذف نیست
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleDelete(img.publicId)}
                                    disabled={deleting === img.publicId}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        background: '#ffe5e5',
                                        color: '#d11a2a',
                                        border: 'none',
                                        fontWeight: 'bold',
                                        cursor: deleting === img.publicId ? 'not-allowed' : 'pointer',
                                        opacity: deleting === img.publicId ? 0.6 : 1,
                                    }}
                                >
                                    {deleting === img.publicId ? 'در حال حذف...' : 'حذف'}
                                </button>
                            )}
                        </Card>
                    );
                })}
            </Box>
        </div>
    );
}

export default UploadsPage;
