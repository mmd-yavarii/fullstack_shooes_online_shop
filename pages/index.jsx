import { useEffect, useState } from 'react';
import AllProductsList from '@/components/AllProductsList';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import { Box } from '@mui/material';
import LoadingScreen from '@/components/loadings/LoadingScreen';

export default function Home() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/product');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.log(err);
                setProducts(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!products) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <p>محصولی یافت نشد</p>
            </Box>
        );
    }

    return (
        <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
            {/* discounted */}
            {products.products?.filter((item) => item.discount)?.length > 0 && (
                <>
                    <span className="mb-4 inline-block">محصولات با تخفیف</span>
                    <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4">
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

            <div className="mb-5">
                <BannerSlider />
            </div>

            <AllProductsList products={products.products || []} />
        </div>
    );
}
