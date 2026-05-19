import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination, Stack } from '@mui/material';
import { allOptions, CATEGORY_GROUP } from '@/helper/categories';

// cache labels
const categoryMap = Object.fromEntries(allOptions.map((i) => [i.value, i.label]));

function AllProductsList({ products = [] }) {
    const [filterValue, setFilterValue] = useState('all'); // category
    const [groupFilter, setGroupFilter] = useState('all'); // group
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // ---------------------------
    // FILTERED PRODUCTS (group + category + search)
    // ---------------------------
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

    // ---------------------------
    // CATEGORY LIST (DEPENDENT ON GROUP)
    // ---------------------------
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

    // ---------------------------
    // HANDLERS
    // ---------------------------
    function handleCategory(value) {
        setFilterValue(value);
        setCurrentPage(1);
    }

    function handleGroupFilter(value) {
        setGroupFilter(value);
        setFilterValue('all'); // مهم: جلوگیری از mismatch
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
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #eaedf3',
                        backgroundColor: '#f5f7fb',
                        fontSize: '14px',
                        outline: 'none',
                        direction: 'rtl',
                        textAlign: 'right',
                    }}
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

                    <img src="/category_groups/allgoods.png" alt="all" className="w-16 h-16 object-contain relative z-10" />

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
                        <img src={group.image} alt={group.label} className="w-16 h-16 object-contain relative z-10" />
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
                <p className="my-10 text-center text-gray-500">محصولی یافت نشد :(</p>
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
