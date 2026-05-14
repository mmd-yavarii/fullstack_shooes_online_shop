import AllProductsList from '@/components/AllProductsList';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/product');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
            {/* discounted */}
            {products.products.filter((item) => item.discount) && (
                <>
                    <span className="mb-4 inline-block">محصولات با تخفیف</span>
                    <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {products.products
                            .filter((item) => item.discount)
                            .map((item) => (
                                <div key={item._id} className="flex-shrink-0 w-44 sm:w-48 md:w-52 lg:w-56">
                                    <ProductCard data={item} />
                                </div>
                            ))}
                    </div>
                </>
            )}

            {/* image baner */}
            <div className="mb-5">
                <BannerSlider />
            </div>

            {/* all products */}
            {products.products ? <AllProductsList products={products.products} /> : <p className="mt-10 text-center">محصولی یافت نشد</p>}

            {/* about us */}
            <span className="mb-4 inline-block">درباره ما</span>
            <p className="text-center">
                فروشگاه ژیویانو با بیش از 10 سال سابقه کاری پررنگ و درخشان توانسته است با پخش اجناس با کیفیت خود محبوبیت خوبی را بین مشتریان خود در
                نقاط مختلف کشور کسب کند.
            </p>
        </div>
    );
}
