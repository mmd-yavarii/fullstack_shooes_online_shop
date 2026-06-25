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

/* ================= API ================= */
const fetchProducts = async ({ queryKey }) => {
    const [, page, categoryGroup, subCategory, search] = queryKey;

    const res = await fetch(`/api/product?page=${page}&categoryGroup=${categoryGroup}&subCategory=${subCategory}&search=${search}`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};

/* ================= PAGE ================= */
export default function Home({ discounted, initialProducts, productsLength }) {
    const [page, setPage] = useState(1);
    const [categoryGroup, setCategoryGroup] = useState('all');
    const [subCategory, setSubCategory] = useState('all');
    const [search, setSearch] = useState('');

    const isDefault = page === 1 && categoryGroup === 'all' && subCategory === 'all' && search === '';

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', page, categoryGroup, subCategory, search],
        queryFn: fetchProducts,
        enabled: true, // همیشه fetch کن (ساده و پایدار)
        placeholderData: (prev) => prev, // جلوگیری از flicker
    });

    const products = isDefault ? initialProducts : data?.products || [];
    const totalPages = Math.ceil((data?.productsLength || productsLength) / 8);

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
            {/* ================= DISCOUNTED ================= */}
            {discounted.length > 0 && (
                <>
                    <p className="mb-4 flex gap-3">
                        <span>محصولات با تخفیف</span>

                        <Link href="/discounts" className="inline-flex items-center gap-1 text-sm font-medium text-[#6d071a]">
                            مشاهده همه
                            <FaLink />
                        </Link>
                    </p>

                    <div className="flex overflow-x-auto gap-3 pb-4">
                        {discounted.map((item) => (
                            <div key={item._id} className="flex-shrink-0 w-48">
                                <ProductCard data={item} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ================= BANNER ================= */}
            <span className="mb-4 inline-block font-semibold">همه محصولات</span>

            <div className="mb-5">
                <BannerSlider />
            </div>

            {/* ================= PRODUCTS ================= */}
            <AllProductsList
                products={products}
                setCategoryGroup={setCategoryGroup}
                categoryGroup={categoryGroup}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                loading={isLoading}
                setSearch={setSearch}
                search={search}
                setPage={setPage}
            />

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center">
                <Stack spacing={2} className="my-8">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        shape="rounded"
                        sx={{
                            direction: 'ltr',
                        }}
                    />
                </Stack>
            </div>
        </div>
    );
}

/* ================= ISR ================= */
export async function getStaticProps() {
    await connectDB();

    const limit = 8;

    const [discounted, initialProducts, productsLength] = await Promise.all([
        Product.find({ discount: { $gt: 0 } })
            .limit(7)
            .lean(),
        Product.find({}).sort({ createdAt: -1 }).limit(limit).lean(),
        Product.countDocuments(),
    ]);

    return {
        props: {
            discounted: JSON.parse(JSON.stringify(discounted)),
            initialProducts: JSON.parse(JSON.stringify(initialProducts)),
            productsLength,
        },
        revalidate: 3600,
    };
}
