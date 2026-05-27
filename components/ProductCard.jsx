import { applyDiscount } from '@/helper/help';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

function ProductCard({ data }) {
    const isDiscoun = !!data.discount;
    const colors = data.sizes.map((i) => i.color);

    return (
        <div className="rounded-xl p-2 sm:p-3 w-full sm:w-48 md:w-52  shadow-lg relative" style={{ border: '1px solid #00000017' }}>
            {isDiscoun && (
                <div className="bg-red-500 shadow-xl shadow-red-500/30 text-white w-fit rounded-full absolute top-0 right-0 px-2">
                    OFF {data.discount}%
                </div>
            )}
            {/* تصویر */}

            <img src={data.images?.[0]} alt={data.title} className="w-full aspect-square sm:aspect-[4/3] mb-2 rounded-lg object-cover" />
            {/* عنوان */}
            <p className="text-xs sm:text-sm font-medium truncate ">
                {data.brand.name} {data.title}
            </p>
            {/* قیمت */}
            <div className="my-1.5 h-10 flex justify-center flex-col sm:my-2">
                {isDiscoun ? (
                    <>
                        <p className="line-through text-gray-400 text-[10px] sm:text-xs">{data.price.toLocaleString()} ریال</p>
                        <p className="text-red-500 font-bold text-xs sm:text-sm">{applyDiscount(data.price, data.discount).toLocaleString()} ریال</p>
                    </>
                ) : (
                    <p className="font-normal text-xs sm:text-sm">{data.price.toLocaleString()} ریال</p>
                )}
            </div>
            {/* رنگ‌ها */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {colors.slice(0, 3).map((color, index) => (
                        <div
                            key={index}
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border outline-2 outline-white border-[#00000022] -ml-1 sm:-ml-1"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                {colors.length > 3 && <span className="text-[10px] sm:text-xs text-gray-500">+{colors.length - 3} رنگ</span>}
            </div>
            {/* دکمه */}
            <div className="group">
                <Link
                    href={`/product/${data._id}`}
                    className="bg-[#6d071a43] text-[#6d071a] mt-2 p-1.5 sm:p-2 rounded-lg w-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer hover:bg-[#6D071A] hover:text-white hover:shadow-lg hover:shadow-[#6D071A]/40 transition-all duration-300 active:scale-95"
                >
                    <span className="group-hover:inline transition-all">خرید محصول</span>
                    <FiShoppingCart className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
