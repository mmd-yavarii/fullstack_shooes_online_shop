import AdminProductCard from '@/components/admin/adminProductCard';
import { Box, Button, CircularProgress, TextField, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Index() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [onlyActive, setOnlyActive] = useState(false);
    const [onlyInactive, setOnlyInactive] = useState(false);

    const [onlyDiscount, setOnlyDiscount] = useState(false);
    const [onlyNoDiscount, setOnlyNoDiscount] = useState(false);

    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/product');
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                setProducts(data.products);
                setFiltered(data.products);

                const cats = [...new Set(data.products.map((p) => p.category).filter(Boolean))];
                setCategories(cats);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (search) {
            result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (onlyActive) result = result.filter((p) => p.isActive === true);
        if (onlyInactive) result = result.filter((p) => p.isActive === false);

        if (onlyDiscount) result = result.filter((p) => p.discount > 0);
        if (onlyNoDiscount) result = result.filter((p) => !p.discount || p.discount === 0);

        if (category) result = result.filter((p) => p.category === category);

        setFiltered(result);
    }, [search, onlyActive, onlyInactive, onlyDiscount, onlyNoDiscount, category, products]);

    // delete products handeler
    const handleDelete = async (id) => {
        const backup = products;
        setProducts((prev) => prev.filter((p) => p._id !== id));

        try {
            const res = await fetch(`/api/product/delete/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();
        } catch (err) {
            setProducts(backup);
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <Link href="/admin/products/add">
                        <Button variant="contained">افزودن محصول</Button>
                    </Link>

                    <Link href="/admin/products/add-baner">
                        <Button variant="contained">مدیریت بنر ها</Button>
                    </Link>

                    <Link href="/admin/uploads">
                        <Button variant="contained">مدیریت تصاویر</Button>
                    </Link>

                    <Link href="/admin/transactions">
                        <Button variant="contained">تراکنش ها</Button>
                    </Link>
                </div>
            </div>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '20px' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
                        gap: 2,
                        alignItems: 'center',
                    }}
                >
                    {/* Category */}
                    <FormControl fullWidth size="small">
                        <InputLabel>دسته‌بندی</InputLabel>
                        <Select value={category} label="دسته‌بندی" onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="">همه</MenuItem>
                            {categories.map((c, i) => (
                                <MenuItem key={i} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Search */}
                    <TextField fullWidth size="small" label="جستجو محصول..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>

                {/* CHIPS (ALL DEFAULT COLOR) */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                    <Chip
                        label="فعال‌ها"
                        variant={onlyActive ? 'filled' : 'outlined'}
                        onClick={() => {
                            setOnlyActive(!onlyActive);
                            setOnlyInactive(false);
                        }}
                        clickable
                    />

                    <Chip
                        label="غیرفعال‌ها"
                        variant={onlyInactive ? 'filled' : 'outlined'}
                        onClick={() => {
                            setOnlyInactive(!onlyInactive);
                            setOnlyActive(false);
                        }}
                        clickable
                    />

                    <Chip
                        label="تخفیف‌دار"
                        variant={onlyDiscount ? 'filled' : 'outlined'}
                        onClick={() => {
                            setOnlyDiscount(!onlyDiscount);
                            setOnlyNoDiscount(false);
                        }}
                        clickable
                    />

                    <Chip
                        label="بدون تخفیف"
                        variant={onlyNoDiscount ? 'filled' : 'outlined'}
                        onClick={() => {
                            setOnlyNoDiscount(!onlyNoDiscount);
                            setOnlyDiscount(false);
                        }}
                        clickable
                    />

                    <Chip
                        label="ریست"
                        variant="outlined"
                        onClick={() => {
                            setOnlyActive(false);
                            setOnlyInactive(false);
                            setOnlyDiscount(false);
                            setOnlyNoDiscount(false);
                        }}
                        clickable
                    />
                </Box>
            </Box>

            {filtered.length === 0 ? (
                <p className="mt-8 text-center">هیچ محصولی پیدا نشد</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map((product) => (
                        <AdminProductCard key={product._id} info={product} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Index;
