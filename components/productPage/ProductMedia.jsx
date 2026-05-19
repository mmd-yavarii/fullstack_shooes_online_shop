import React from 'react';
import { Card, CardMedia, Box } from '@mui/material';

function ProductMedia({ images, selectedImage, setSelectedImage }) {
    if (!images?.length) return null;

    return (
        <Box className="flex flex-col gap-3 w-full ">
            {/* MAIN IMAGE */}
            <Card sx={{ width: '100%' }}>
                <CardMedia
                    component="img"
                    image={selectedImage || images[0]}
                    sx={{
                        width: '100%',
                        height: { xs: 400, sm: 450, md: 450 }, // responsive height
                        objectFit: 'cover',
                        borderRadius: '15px',
                    }}
                />
            </Card>

            {/* THUMBNAILS */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    overflowX: 'auto',
                    width: '100%',
                }}
            >
                {images.map((img, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={img}
                        onClick={() => setSelectedImage(img)}
                        sx={{
                            width: 70,
                            height: 70,
                            flexShrink: 0,
                            objectFit: 'cover',
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: selectedImage === img ? '2px solid black' : '1px solid #ddd',
                            opacity: selectedImage === img ? 1 : 0.7,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default ProductMedia;
