import React, { useState } from 'react';
import { Box, Card, IconButton, Dialog, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

function ProductMedia({ images = [] }) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (!images.length) return null;

    const getImg = (img) => {
        if (!img) return '';
        return typeof img === 'string' ? img : img.url;
    };

    const change = (newIndex, dir) => {
        setDirection(dir);
        setIndex(newIndex);
        setIsLoading(true);
    };

    const prev = () => {
        const newIndex = index === 0 ? images.length - 1 : index - 1;
        change(newIndex, -1);
    };

    const next = () => {
        const newIndex = index === images.length - 1 ? 0 : index + 1;
        change(newIndex, 1);
    };

    return (
        <>
            {/* KEYFRAMES */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* MAIN IMAGE */}
                <Card
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: '1px solid #eee',
                        background: '#fafafa',
                        cursor: 'zoom-in',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            height: { xs: 380, sm: 450, md: 520 },
                        }}
                    >
                        {/* LOADING */}
                        {isLoading && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 2,
                                    background: 'linear-gradient(110deg, #f2f2f2 8%, #e8e8e8 18%, #f2f2f2 33%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.2s infinite linear',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress size={28} thickness={4} />
                            </Box>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={getImg(images[index])}
                                src={getImg(images[index])}
                                onClick={() => setOpen(true)}
                                onLoad={() => setIsLoading(false)}
                                initial={{
                                    x: direction > 0 ? 120 : -120,
                                    opacity: 0,
                                    scale: 1.05,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    x: direction > 0 ? -120 : 120,
                                    opacity: 0,
                                    scale: 0.95,
                                }}
                                transition={{ duration: 0.45 }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </AnimatePresence>
                    </Box>

                    {/* NAV */}
                    <IconButton onClick={prev} sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                        <ChevronLeft />
                    </IconButton>

                    <IconButton onClick={next} sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
                        <ChevronRight />
                    </IconButton>
                </Card>

                {/* THUMBNAILS */}
                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', px: 0.5 }}>
                    {images.map((img, i) => {
                        const src = getImg(img);

                        return (
                            <Box
                                key={src + i}
                                component="img"
                                src={src}
                                onClick={() => {
                                    setIndex(i);
                                    setIsLoading(true);
                                }}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    border: i === index ? '2px solid #111' : '1px solid #ddd',
                                    opacity: i === index ? 1 : 0.55,
                                    transform: i === index ? 'scale(1.08)' : 'scale(1)',
                                    transition: '0.25s',
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* FULLSCREEN */}
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 20, right: 20, color: '#fff' }}>
                        <Close />
                    </IconButton>

                    <motion.img
                        key={getImg(images[index])}
                        src={getImg(images[index])}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />

                    <IconButton onClick={prev} sx={{ position: 'absolute', left: 20, color: '#fff' }}>
                        <ChevronLeft fontSize="large" />
                    </IconButton>

                    <IconButton onClick={next} sx={{ position: 'absolute', right: 20, color: '#fff' }}>
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Box>
            </Dialog>
        </>
    );
}

export default ProductMedia;
