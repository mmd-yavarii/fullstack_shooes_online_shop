import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination, Stack, TextField } from '@mui/material';

function AllProductsList({ products }) {
    const [resultProducts, setResultProducts] = useState(products);
    const [filterValue, setFilterValue] = useState('همه');
    const [searchValue, setSerachValue] = useState('');

    // pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(resultProducts.length / itemsPerPage);
    const currentItems = resultProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // filter handeler
    function filterHandeler(filter) {
        setFilterValue(filter);
        if (filter == 'همه') {
            setResultProducts(products);
        } else {
            setResultProducts(products?.filter((i) => i.category == filter));
        }
        setCurrentPage(1);
    }

    // search handeler
    function searchHandeler(value) {
        setSerachValue(value);
        setResultProducts(products?.filter((i) => i.title.includes(value.trim())));
        setCurrentPage(1);
    }

    return (
        <>
            <span className="mb-4 inline-block">همه محصولات</span>

            {/* search  */}
            <div className="mb-6">
                <TextField fullWidth size="small" label="جستجو ..." value={searchValue} onChange={(e) => searchHandeler(e.target.value)} />
            </div>

            {/* filters */}
            <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {['همه', ...new Set(products.map((i) => i?.category))].map((item) => (
                    <button
                        className={`px-4 cursor-pointer h-fit py-1 w-fit rounded-full ${filterValue == item ? 'bg-[#6d071a] text-white' : 'bg-[#f5f7fb] border border-[#eaedf3]'}`}
                        onClick={() => filterHandeler(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* show items */}
            {currentItems.length ? (
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2 sm:gap-3 md:gap-4">
                    {currentItems?.map((item) => (
                        <ProductCard data={item} />
                    ))}
                </div>
            ) : (
                <p className="my-10 mb-30 text-center">محصولی یافت نشد :(</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Stack spacing={2} alignItems="center" className="my-8 flex items-center" style={{ direction: 'ltr' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                        size="medium"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontFamily: 'Vazirmatn, sans-serif',
                                borderRadius: '8px',
                            },
                            '& .MuiPaginationItem-previousNext': {
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
