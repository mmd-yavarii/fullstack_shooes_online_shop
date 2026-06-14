import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { allOptions, CATEGORY_GROUP } from '@/helper/categories';
import { FiSearch } from 'react-icons/fi';
import { SearchX } from 'lucide-react';
import Image from 'next/image';
import LoadingScreen from './loadings/LoadingScreen';

function AllProductsList({ products = [], categoryGroup, setCategoryGroup, subCategory, setSubCategory, loading, setSearch, search }) {
    const [searchValue, setSearchValue] = useState(search);
    const categoryMap = Object.fromEntries(allOptions.map((i) => [i.value, i.label]));
    const categories = useMemo(() => {
        const filtered = allOptions.filter((item) => categoryGroup === 'all' || item.group === categoryGroup);

        return ['all', ...filtered.map((item) => item.value)];
    }, [categoryGroup]);

    function handleCategoryGroup(value) {
        setCategoryGroup(value);
        setSubCategory('all');
    }

    function handleSearch(value) {
        setSearchValue(value);
    }

    return (
        <>
            {/* SEARCH */}
            <div
                className="
                    flex items-center
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-white
                    focus-within:border-[#6D071A]
                    focus-within:ring-2 focus-within:ring-[#6D071A]/15
                    transition
                "
            >
                {/* icon */}
                <FiSearch className="mx-3 text-gray-400 w-4 h-4 shrink-0" />

                {/* input (بدون سایه واقعی) */}
                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                        w-full
                        py-3
                        bg-transparent
                        text-sm text-right
                        outline-none
                        placeholder:text-gray-400
                    "
                    dir="rtl"
                />

                {/* button با سایه همرنگ خودش */}
                <button
                    onClick={() => setSearch(searchValue)}
                    className="
                    m-1 px-4 py-2
                    text-xs font-medium text-white
                    bg-[#6D071A]
                    rounded-lg

                    shadow-[0_4px_12px_rgba(109,7,26,0.25)]
                    hover:shadow-[0_6px_16px_rgba(109,7,26,0.35)]

                    hover:bg-[#4b0511]
                    active:scale-95

                    transition-all duration-200
                "
                >
                    جستجو
                </button>
            </div>

            {/* GROUP FILTER */}
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar mt-6">
                <button onClick={() => handleCategoryGroup('all')} className="relative flex flex-col items-center min-w-[90px]">
                    <div
                        className={`absolute -bottom-2 w-12 h-12 rounded-full blur-xl transition ${
                            categoryGroup === 'all' ? 'bg-[radial-gradient(circle,rgba(109,7,26,0.6)_0%,transparent_70%)]' : 'bg-transparent'
                        }`}
                    />

                    <img src="/category_groups/allgoods.png" alt="all" className="w-13 h-13 object-contain relative z-10" />

                    <span className={`text-xs relative z-10 ${categoryGroup === 'all' ? 'text-[#6d071a]' : ''}`}>همه گروه‌ها</span>

                    <div className={`h-[2px] w-8 mt-1 rounded-full transition ${categoryGroup === 'all' ? 'bg-[#6d071a]' : 'bg-transparent'}`} />
                </button>

                {CATEGORY_GROUP.map((group) => (
                    <button
                        key={group.value}
                        onClick={() => handleCategoryGroup(group.value)}
                        className="relative flex flex-col items-center min-w-[90px]"
                    >
                        <div
                            className={`absolute -bottom-2 w-12 h-12 rounded-full blur-xl transition ${
                                categoryGroup === group.value
                                    ? 'bg-[radial-gradient(circle,rgba(109,7,26,0.6)_0%,transparent_70%)]'
                                    : 'bg-transparent'
                            }`}
                        />

                        <Image src={group.image} alt={group.label} width={52} height={52} className="object-contain" />

                        <span className={`text-xs relative z-10 ${categoryGroup === group.value ? 'text-[#6d071a]' : ''}`}>{group.label}</span>

                        <div
                            className={`h-[2px] w-8 mt-1 rounded-full transition ${
                                categoryGroup === group.value ? 'bg-[#6d071a]' : 'bg-transparent'
                            }`}
                        />
                    </button>
                ))}
            </div>

            {/* LOADING GUARD */}
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {/* CATEGORY FILTER */}
                    <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar mt-3">
                        {categories.map((item) => (
                            <button
                                key={item}
                                onClick={() => setSubCategory(item)}
                                className={`px-4 py-1 rounded-full border whitespace-nowrap ${
                                    subCategory === item ? 'bg-[#6d071a] text-white' : 'bg-[#f5f7fb] border-[#eaedf3]'
                                }`}
                            >
                                {item === 'all' ? 'همه' : categoryMap[item]}
                            </button>
                        ))}
                    </div>

                    {/* PRODUCTS */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {products.map((item) => (
                                <ProductCard key={item._id} data={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="my-16 flex flex-col items-center justify-center text-center">
                            <SearchX className="mb-4 h-14 w-14 text-[#800020]" />

                            <h3 className="text-xl font-semibold text-gray-800">محصولی یافت نشد</h3>

                            <p className="mt-2 max-w-sm text-sm text-gray-500">
                                نتیجه‌ای برای جستجوی شما پیدا نشد. فیلترها را بررسی کنید یا عبارت دیگری را امتحان کنید.
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default AllProductsList;
