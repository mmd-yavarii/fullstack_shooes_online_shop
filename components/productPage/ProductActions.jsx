import React from 'react';
import { Typography, Button } from '@mui/material';

function ProductActions({ colors, sizes, selectedColor, setSelectedColor, selectedSize, setSelectedSize }) {
    return (
        <div className="flex flex-col gap-5">
            {/* COLORS */}
            <div className="flex items-center gap-4">
                <Typography mb={1}>رنگ ها</Typography>

                <div className="flex gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: color,

                                border: selectedColor === color ? '2px solid #fff' : '1px solid #ccc',
                                outline: selectedColor === color ? `2px solid ${color}` : 'none',

                                cursor: 'pointer',
                                padding: 0,
                                boxSizing: 'border-box',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* SIZES */}
            <div className="flex items-center gap-4">
                <Typography mb={1}>سایز</Typography>

                <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: 'none',
                                background: selectedSize === size ? '#6d071a' : '#e5e7eb',
                                color: selectedSize === size ? 'white' : '#111',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductActions;
