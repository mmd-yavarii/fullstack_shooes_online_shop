import AllProductsList from '@/components/AllProductsList';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import { Box } from '@mui/material';

export default function Home({ products }) {
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

            {/* banner */}
            <div className="mb-5">
                <BannerSlider />
            </div>

            {/* all products */}
            <AllProductsList products={products.products || []} />

            {/* about */}
            <span className="mb-4 inline-block mt-3">درباره ما</span>
            <p className="text-center">
                فروشگاه ژیویانو با تمرکز بر ارائه محصولات باکیفیت و تجربه خرید مطمئن، همواره تلاش می‌کند بهترین خدمات را به مشتریان خود ارائه دهد.
            </p>
        </div>
    );
}

// 🔥 ISR PART
export async function getStaticProps() {
    try {
        const res = await fetch('http://localhost:3000/api/product');
        const data = await res.json();

        return {
            props: {
                products: data,
            },
            revalidate: 60, // ⬅️ ISR: هر 60 ثانیه آپدیت
        };
    } catch (error) {
        return {
            props: {
                products: null,
            },
            revalidate: 60,
        };
    }
}
