import { useEffect, useState } from 'react';
import AllProductsList from '@/components/AllProductsList';
import { Pagination, Stack } from '@mui/material';

export default function DiscountPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [productsLength, setProductsLength] = useState(0);

    const [categoryGroup, setCategoryGroup] = useState('all');
    const [subCategory, setSubCategory] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `/api/product?discounts=true&page=${page}&categoryGroup=${categoryGroup}&subCategory=${subCategory}&search=${search}`
                );
                const data = await res.json();

                setProducts(data);
                setProductsLength(data.productsLength || 0);
            } catch (err) {
                console.log(err);
                setProducts({ products: [], productsLength: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, categoryGroup, subCategory, search]);

    const totalPages = Math.ceil(productsLength / 8);

    return (
        <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
            <span className="mb-4 inline-block font-semibold">همه محصولات تخفیف دار</span>

            <AllProductsList
                products={products.products || []}
                setCategoryGroup={setCategoryGroup}
                categoryGroup={categoryGroup}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                loading={loading}
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
