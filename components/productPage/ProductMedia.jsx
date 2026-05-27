import React, { useState } from 'react';

import { Box, Card, IconButton, Dialog } from '@mui/material';

import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';

import { AnimatePresence, motion } from 'framer-motion';

function ProductMedia({ images = [] }) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [open, setOpen] = useState(false);

    if (!images.length) return null;

    const change = (newIndex, dir) => {
        setDirection(dir);
        setIndex(newIndex);
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* MAIN GALLERY */}
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
                            height: {
                                xs: 380,
                                sm: 450,
                                md: 520,
                            },
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={images[index]}
                                src={images[index]}
                                onClick={() => setOpen(true)}
                                initial={{
                                    x: direction > 0 ? 120 : -120,
                                    opacity: 0,
                                    scale: 1.05,
                                    filter: 'blur(8px)',
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    x: direction > 0 ? -120 : 120,
                                    opacity: 0,
                                    scale: 0.95,
                                    filter: 'blur(10px)',
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </AnimatePresence>
                    </Box>

                    {/* NAV BUTTONS */}
                    <IconButton
                        onClick={prev}
                        sx={{
                            position: 'absolute',
                            left: 12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                background: '#fff',
                            },
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <IconButton
                        onClick={next}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                background: '#fff',
                            },
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                </Card>

                {/* THUMBNAILS */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        px: 0.5,
                        alignItems: 'center',
                    }}
                >
                    {images.map((img, i) => (
                        <Box
                            key={i}
                            component="img"
                            src={img}
                            onClick={() => change(i, i > index ? 1 : -1)}
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
                    ))}
                </Box>
            </Box>

            {/* FULLSCREEN MODAL */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullScreen
                sx={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100vh',
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* CLOSE */}
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            color: '#fff',
                            zIndex: 10,
                        }}
                    >
                        <Close />
                    </IconButton>

                    {/* IMAGE */}
                    <motion.img
                        key={images[index]}
                        src={images[index]}
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />

                    {/* PREV */}
                    <IconButton
                        onClick={prev}
                        sx={{
                            position: 'absolute',
                            left: 20,
                            color: '#fff',
                            background: 'rgba(255,255,255,0.15)',
                        }}
                    >
                        <ChevronLeft fontSize="large" />
                    </IconButton>

                    {/* NEXT */}
                    <IconButton
                        onClick={next}
                        sx={{
                            position: 'absolute',
                            right: 20,
                            color: '#fff',
                            background: 'rgba(255,255,255,0.15)',
                        }}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Box>
            </Dialog>
        </>
    );
}

export default ProductMedia;
