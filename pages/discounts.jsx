import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AllProductsList from '@/components/AllProductsList';
import { Pagination, Stack } from '@mui/material';

const fetchDiscountProducts = async ({ queryKey }) => {
    const [, page, categoryGroup, subCategory, search] = queryKey;

    const res = await fetch(`/api/product?discounts=true&page=${page}&categoryGroup=${categoryGroup}&subCategory=${subCategory}&search=${search}`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};

export default function DiscountPage() {
    const [page, setPage] = useState(1);

    const [categoryGroup, setCategoryGroup] = useState('all');
    const [subCategory, setSubCategory] = useState('all');
    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['discount-products', page, categoryGroup, subCategory, search],
        queryFn: fetchDiscountProducts,
        placeholderData: (previousData) => previousData,
    });

    const products = data?.products || [];
    const productsLength = data?.productsLength || 0;

    const totalPages = Math.ceil(productsLength / 8);

    if (error) {
        return <div className="text-center py-10">خطا در دریافت محصولات</div>;
    }

    return (
        <div
            style={{
                padding: 20,
                maxWidth: '900px',
                margin: '0 auto',
            }}
        >
            <span className="mb-4 inline-block font-semibold">همه محصولات تخفیف دار</span>

            <AllProductsList
                products={products}
                setCategoryGroup={setCategoryGroup}
                categoryGroup={categoryGroup}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                loading={isLoading}
                setSearch={setSearch}
                search={search}
            />

            <div className="flex items-center justify-center">
                <Stack spacing={2} alignItems="center" className="my-8">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
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
            </div>
        </div>
    );
}
