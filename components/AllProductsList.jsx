import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination, Stack } from '@mui/material';
import { allOptions, CATEGORY_GROUP } from '@/helper/categories';
import { FiSearch } from 'react-icons/fi';
import { SearchX } from 'lucide-react';
import Image from 'next/image';

// cache labels
const categoryMap = Object.fromEntries(allOptions.map((i) => [i.value, i.label]));

function AllProductsList({ products = [] }) {
    const [filterValue, setFilterValue] = useState('all');
    const [groupFilter, setGroupFilter] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const filteredProducts = useMemo(() => {
        return products
            .filter((item) => {
                // group filter
                if (groupFilter !== 'all' && item.group !== groupFilter) return false;

                // category filter
                if (filterValue !== 'all' && item.category !== filterValue) return false;

                return true;
            })
            .filter((item) => {
                if (!searchValue) return true;
                return item.title?.toLowerCase().includes(searchValue.toLowerCase().trim());
            });
    }, [products, filterValue, groupFilter, searchValue]);

    const categories = useMemo(() => {
        const base = products.filter((item) => {
            if (groupFilter !== 'all' && item.group !== groupFilter) return false;
            return true;
        });

        const uniqueCategories = [...new Set(base.map((i) => i.category))];

        return ['all', ...uniqueCategories];
    }, [products, groupFilter]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function handleCategory(value) {
        setFilterValue(value);
        setCurrentPage(1);
    }

    function handleGroupFilter(value) {
        setGroupFilter(value);
        setFilterValue('all');
        setCurrentPage(1);
    }

    function handleSearch(value) {
        setSearchValue(value);
        setCurrentPage(1);
    }

    return (
        <>
            <span className="mb-4 inline-block font-semibold">همه محصولات</span>

            {/* SEARCH */}

            <div className="relative w-full mb-6">
                <FiSearch
                    className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 w-4 h-4
            pointer-events-none
        "
                />

                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                        w-full
                        pr-9 pl-4 py-2.5
                        rounded-xl
                        bg-white
                        border border-gray-200
                        text-sm text-right
                        placeholder:text-gray-400
                        outline-none
                        transition-all duration-200
                        hover:border-gray-300
                        focus:border-[#6D071A]
                    "
                    dir="rtl"
                />
            </div>

            {/* GROUP FILTER */}
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar">
                <button onClick={() => handleGroupFilter('all')} className="relative flex flex-col items-center min-w-[90px]">
                    {/* glow background */}
                    <div
                        className={`absolute -bottom-2 w-12 h-12 rounded-full blur-xl transition ${
                            groupFilter === 'all' ? 'bg-[radial-gradient(circle,rgba(109,7,26,0.6)_0%,transparent_70%)]' : 'bg-transparent'
                        }`}
                    />

                    <img src="/category_groups/allgoods.png" alt="all" className="w-13 h-13 object-contain relative z-10" />

                    <span className={`text-xs relative z-10 ${groupFilter === 'all' ? 'text-[#6d071a]' : ''}`}>همه گروه‌ها</span>

                    {/* underline */}
                    <div className={`h-[2px] w-8 mt-1 rounded-full transition ${groupFilter === 'all' ? 'bg-[#6d071a]' : 'bg-transparent'}`} />
                </button>

                {CATEGORY_GROUP.map((group) => (
                    <button
                        key={group.value}
                        onClick={() => handleGroupFilter(group.value)}
                        className="relative flex flex-col items-center min-w-[90px]"
                    >
                        <div
                            className={`absolute -bottom-2 w-12 h-12 rounded-full blur-xl transition ${
                                groupFilter === group.value ? 'bg-[radial-gradient(circle,rgba(109,7,26,0.6)_0%,transparent_70%)]' : 'bg-transparent'
                            }`}
                        />
                        <Image src={group.image} alt={group.label} width={52} height={52} className="object-contain" />{' '}
                        <span className={`text-xs relative z-10 ${groupFilter === group.value ? 'text-[#6d071a]' : ''}`}>{group.label}</span>
                        <div
                            className={`h-[2px] w-8 mt-1 rounded-full transition ${groupFilter === group.value ? 'bg-[#6d071a]' : 'bg-transparent'}`}
                        />
                    </button>
                ))}
            </div>

            {/* CATEGORY FILTER */}
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar mt-3">
                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => handleCategory(item)}
                        className={`px-4 py-1 rounded-full border whitespace-nowrap ${
                            filterValue === item ? 'bg-[#6d071a] text-white' : 'bg-[#f5f7fb] border-[#eaedf3]'
                        }`}
                    >
                        {item === 'all' ? 'همه' : categoryMap[item] || item}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            {currentItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {currentItems.map((item) => (
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

            {/* PAGINATION */}
            <div className="flex items-center justify-center">
                {totalPages > 1 && (
                    <Stack spacing={2} alignItems="center" className="my-8">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(e, page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            shape="rounded"
                            color="primary"
                            sx={{
                                direction: 'ltr',
                                '& .MuiPaginationItem-root': {
                                    fontFamily: 'Vazirmatn, sans-serif',
                                },
                            }}
                        />
                    </Stack>
                )}
            </div>
        </>
    );
}

export default AllProductsList;
