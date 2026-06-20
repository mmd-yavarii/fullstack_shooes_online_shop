import React, { useMemo, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { allOptions } from '@/helper/categories';
import { FiSearch } from 'react-icons/fi';
import { SearchX } from 'lucide-react';
import LoadingScreen from './loadings/LoadingScreen';
import FilterGroups from './FilterGroups';

function AllProductsList({ products = [], categoryGroup, setCategoryGroup, subCategory, setSubCategory, loading, setSearch, search }) {
    const [searchValue, setSearchValue] = useState(search);

    const productsRef = useRef(null);

    const categoryMap = Object.fromEntries(allOptions.map((i) => [i.value, i.label]));

    const categories = useMemo(() => {
        const filtered = allOptions.filter((item) => categoryGroup === 'all' || item.group === categoryGroup);
        return ['all', ...filtered.map((item) => item.value)];
    }, [categoryGroup]);

    function handleGroupChange(value) {
        setCategoryGroup(value);
        setSubCategory('all');

        setTimeout(() => {
            if (!productsRef.current) return;

            const top = productsRef.current.getBoundingClientRect().top;
            const offset = window.scrollY + top - 200;

            window.scrollTo({
                top: offset,
                behavior: 'smooth',
            });
        }, 50);
    }

    return (
        <>
            <FilterGroups categoryGroup={categoryGroup} setCategoryGroup={handleGroupChange} />

            {/* SEARCH */}
            <div className="flex items-center w-full my-3 rounded-xl border border-gray-200 bg-white focus-within:border-[#6D071A] focus-within:ring-2 focus-within:ring-[#6D071A]/15 transition">
                <FiSearch className="mx-3 text-gray-400 w-4 h-4 shrink-0" />

                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full py-3 bg-transparent text-sm text-right outline-none placeholder:text-gray-400"
                    dir="rtl"
                />

                <button onClick={() => setSearch(searchValue)} className="m-1 px-4 py-2 text-xs font-medium text-white bg-[#6D071A] rounded-lg">
                    جستجو
                </button>
            </div>

            {/* LOADING */}
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div className="flex overflow-x-auto gap-2 pb-4 mt-3 no-scrollbar">
                        {categories.map((item) => {
                            const active = subCategory === item;

                            return (
                                <button
                                    key={item}
                                    onClick={() => setSubCategory(item)}
                                    className={`
                    relative whitespace-nowrap px-4 py-1.5 rounded-full
                    text-xs font-medium transition-all duration-300
                    border

                    ${
                        active
                            ? `
                                bg-[#6d071a]
                                text-white
                                border-[#6d071a]/20
                            `
                            : `
                                bg-white/60
                                text-gray-500
                                border-gray-200
                                hover:bg-white
                                hover:border-gray-300
                                hover:text-gray-700
                                hover:shadow-sm
                            `
                    }
                `}
                                >
                                    {/* subtle glow */}
                                    <div
                                        className={`
                        absolute inset-0 rounded-full transition-opacity duration-300
                        ${active ? 'opacity-100 bg-[radial-gradient(circle,rgba(109,7,26,0.08)_0%,transparent_70%)]' : 'opacity-0'}
                    `}
                                    />

                                    <span className="relative z-10">{item === 'all' ? 'همه' : categoryMap[item]}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* PRODUCTS */}
                    <div ref={productsRef}>
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

                                <p className="mt-2 max-w-sm text-sm text-gray-500">نتیجه‌ای برای جستجوی شما پیدا نشد. فیلترها را بررسی کنید.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default AllProductsList;
