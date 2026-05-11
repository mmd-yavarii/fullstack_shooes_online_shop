import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, Grid, IconButton, CircularProgress, Box } from '@mui/material';

import { MdClose } from 'react-icons/md';
import { LuImagePlus } from 'react-icons/lu';

export default function UploadImg({ form, setForm }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // ADD IMAGE
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setLoading(true);

        try {
            const uploadedUrls = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);

                const res = await fetch('/api/upload-image', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                uploadedUrls.push(data.url);
            }

            setForm((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls],
            }));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // DELETE IMAGE
    const confirmDelete = async () => {
        try {
            const url = form.images[selectedIndex];

            const res = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!res.ok) return;

            setForm((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== selectedIndex),
            }));

            setOpen(false);
            setSelectedIndex(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full max-w-[670px] my-auto">
            {/* INPUT */}
            <label className="block w-full mb-2 cursor-pointer ">
                <div className="w-full h-20 flex items-center justify-center flex-col gap-3 py-3 border border-dashed border-gray-400 rounded-lg transition">
                    <LuImagePlus size={30} className="opacity-50" />
                    <span className="text-sm text-gray-700 font-medium">برای انتخاب تصاویر کلیک کنید</span>
                </div>

                <input hidden type="file" multiple accept="image/*" onChange={handleFileChange} />
            </label>

            {/* LOADING */}
            {loading && (
                <Box mt={2} display="flex" justifyContent="center">
                    <CircularProgress size={24} />
                </Box>
            )}

            {/* EMPTY */}
            {!form.images.length && !loading && (
                <Box
                    mt={3}
                    p={3}
                    textAlign="center"
                    sx={{
                        border: '1px dashed #ccc',
                        borderRadius: 4,
                        color: 'text.secondary',
                        fontSize: 14,
                        textAlign: 'center',
                        padding: '10px',
                    }}
                >
                    هنوز عکسی آپلود نشده
                </Box>
            )}

            {/* PREVIEW */}
            {form.images.length > 0 && (
                <Grid container spacing={1} mt={2}>
                    {form.images.map((url, i) => (
                        <Grid item xs={4} key={i}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    height: 90,
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <img
                                    src={url}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />

                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setSelectedIndex(i);
                                        setOpen(true);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        left: 8,
                                        width: 30,
                                        height: 30,
                                        bgcolor: 'rgba(0,0,0,0.6)',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'rgba(255,0,0,0.85)' },
                                    }}
                                >
                                    <MdClose size={14} />
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ fontWeight: 600 }}>این تصویر برای همیشه حذف می‌شود. مطمئنی؟</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>لغو</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
