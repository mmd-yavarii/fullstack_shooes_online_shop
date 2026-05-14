import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination, Stack } from '@mui/material';

function AllProductsList({ products = [] }) {
    const [filterValue, setFilterValue] = useState('همه');
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // FILTER + SEARCH (optimized)
    const filteredProducts = useMemo(() => {
        return products
            .filter((item) => {
                if (filterValue === 'همه') return true;
                return item.category === filterValue;
            })
            .filter((item) => {
                if (!searchValue) return true;
                return item.title?.toLowerCase().includes(searchValue.toLowerCase().trim());
            });
    }, [products, filterValue, searchValue]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function filterHandler(filter) {
        setFilterValue(filter);
        setCurrentPage(1);
    }

    function searchHandler(value) {
        setSearchValue(value);
        setCurrentPage(1);
    }

    const categories = ['همه', ...new Set(products.map((i) => i?.category))];

    return (
        <>
            <span className="mb-4 inline-block font-semibold">همه محصولات</span>

            {/* SEARCH INPUT */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchValue}
                    onChange={(e) => searchHandler(e.target.value)}
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
                        transition: '0.2s ease',
                    }}
                    onFocus={(e) => {
                        e.target.style.border = '1px solid #6d071a';
                    }}
                    onBlur={(e) => {
                        e.target.style.border = '1px solid #eaedf3';
                    }}
                />
            </div>

            {/* FILTERS */}
            <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => filterHandler(item)}
                        className={`px-4 py-1 rounded-full border transition whitespace-nowrap ${
                            filterValue === item ? 'bg-[#6d071a] text-white' : 'bg-[#f5f7fb] border-[#eaedf3]'
                        }`}
                    >
                        {item}
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
                            display: 'flex',
                            justifyContent: 'center',
                            '& .MuiPaginationItem-root': {
                                fontFamily: 'Vazirmatn, sans-serif',
                                borderRadius: '8px',
                            },
                        }}
                    />
                </Stack>
            )}
        </>
    );
}

export default AllProductsList;
