import connectDB from '@/lib/db';
import Product from '@/models/Product';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AllProductsList from '@/components/AllProductsList';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';

import { Pagination, Stack } from '@mui/material';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

const fetchProducts = async ({ queryKey }) => {
    const [, page, categoryGroup, subCategory, search] = queryKey;

    const res = await fetch(`/api/product?page=${page}&categoryGroup=${categoryGroup}&subCategory=${subCategory}&search=${search}`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};

export default function Home({ discounted }) {
    const [page, setPage] = useState(1);

    const [categoryGroup, setCategoryGroup] = useState('all');
    const [subCategory, setSubCategory] = useState('all');
    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', page, categoryGroup, subCategory, search],
        queryFn: fetchProducts,
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
            {/* discounted */}
            {discounted.length > 0 && (
                <>
                    <p className="mb-4 flex gap-3">
                        <span>محصولات با تخفیف</span>

                        <Link
                            href="/discounts"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#6d071a] hover:text-[#4b0511] transition-colors duration-200"
                        >
                            مشاهده همه تخفیف‌ها
                            <FaLink />
                        </Link>
                    </p>

                    <div className="hide-scrollbar flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4">
                        {discounted.map((item) => (
                            <div key={item._id} className="flex-shrink-0 w-44 sm:w-48 md:w-52 lg:w-56">
                                <ProductCard data={item} />
                            </div>
                        ))}
                    </div>

                    <style jsx>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }

                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                </>
            )}

            {/* all products */}
            <span className="mb-4 inline-block font-semibold">همه محصولات</span>

            <div className="mb-5">
                <BannerSlider />
            </div>

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

            {/* PAGINATION */}
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

export async function getStaticProps() {
    await connectDB();

    const discounted = await Product.find({
        discount: { $gt: 0 },
    }).limit(7);

    return {
        props: {
            discounted: JSON.parse(JSON.stringify(discounted)),
        },
        revalidate: 3600,
    };
}
