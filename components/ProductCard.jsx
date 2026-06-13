import { applyDiscount } from '@/helper/help';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

function ProductCard({ data }) {
    const isDiscount = !!data.discount;
    const colors = data.sizes.map((i) => i.color);

    const finalPrice = isDiscount ? applyDiscount(data.price, data.discount) : data.price;

    const totalStock = data.sizes?.reduce((sum, item) => sum + item.stock, 0) || 0;

    const isOutOfStock = totalStock === 0;

    return (
        <div
            className="
                group relative w-full sm:w-52
                rounded-3xl overflow-hidden
                bg-white
                border border-black/5
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
            "
        >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />

            {/* Image */}
            <div className="overflow-hidden bg-gray-50 relative">
                <Image
                    src={data.images?.[0]}
                    alt={data.title}
                    width={500}
                    height={500}
                    className={`
                        w-full aspect-square object-cover
                        group-hover:scale-[1.06]
                        transition-transform duration-500 ease-out
                        ${isOutOfStock ? 'opacity-50 grayscale' : ''}
                    `}
                />

                {/* Out of stock badge */}
                {isOutOfStock && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-black/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">ناموجود</span>
                    </div>
                )}

                {/* Discount badge */}
                {isDiscount && (
                    <div className="absolute top-3 right-3 z-10 bg-[#6D071A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-[#6D071A]/30 border border-white/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span>-{data.discount}% OFF</span>
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4 flex flex-col gap-2">
                {/* Title */}
                <p className="text-[13px] sm:text-sm font-medium text-gray-900 line-clamp-2 leading-5">
                    {data.brand.name} {data.title}
                </p>

                {/* Price */}
                <div className="flex flex-col">
                    {isDiscount ? (
                        <>
                            <p className="line-through text-gray-400 text-[11px]">{data.price.toLocaleString()} ریال</p>
                            <p className="text-[#6D071A] font-semibold text-sm">{finalPrice.toLocaleString()} ریال</p>
                        </>
                    ) : (
                        <>
                            <p className="line-through text-gray-400 text-[11px] opacity-0">..</p>
                            <p className="text-gray-900 font-semibold text-sm">{data.price.toLocaleString()} ریال</p>
                        </>
                    )}
                </div>

                {/* Colors */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {colors.slice(0, 3).map((color, index) => (
                            <div
                                key={index}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white shadow-sm -ml-1 first:ml-0"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    {colors.length > 3 && <span className="text-[10px] text-gray-500">+{colors.length - 3}</span>}
                </div>

                {/* Button */}
                <Link
                    href={`/product/${data._id}`}
                    className="
                        mt-2 flex items-center justify-center gap-2
                        rounded-2xl py-2.5
                        text-xs sm:text-sm font-medium
                        transition-all duration-200
                        shadow-md
                        active:scale-[0.98]
                        hover:shadow-lg
                    "
                    style={{
                        backgroundColor: '#6D071A',
                        color: 'white',
                    }}
                >
                    <span>{isOutOfStock ? 'مشاهده محصول (ناموجود)' : 'افزودن به سبد'}</span>

                    {!isOutOfStock && <FiShoppingCart className="w-4 h-4" />}
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
