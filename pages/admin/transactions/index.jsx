import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { CircularProgress, Box, Typography, TextField, Stack, Chip } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import TransactionCard from '@/components/admin/TransactionCard';
import TransactionSummaryCard from '@/components/admin/TransactionSummaryCard';
import Link from 'next/link';

function Index() {
    const router = useRouter();

    const { search: querySearch } = router.query;

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // auto search
    useEffect(() => {
        if (!router.isReady) return;

        setSearch(querySearch || '');
    }, [router.isReady, querySearch]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await fetch('/api/transaction', {
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error('Failed to fetch transactions');
            }

            return data;
        },
    });

    const transactions = data?.data || [];

    const processedData = useMemo(() => {
        let pending = 0;
        let confirmed = 0;
        let cancelled = 0;
        let revenue = 0;

        const filtered = [];
        const normalizedSearch = search.trim().toLowerCase();

        for (const t of transactions) {
            switch (t.orderStatus) {
                case 'pending':
                    pending++;
                    break;
                case 'confirmed':
                    confirmed++;
                    revenue += t.pricing?.totalFinalPrice || 0;
                    break;
                case 'cancelled':
                    cancelled++;
                    break;
            }

            // const matchSearch = !normalizedSearch || t.user?.fullName?.toLowerCase().includes(normalizedSearch);
            const matchSearch =
                !normalizedSearch ||
                t.user?.fullName?.toLowerCase().includes(normalizedSearch) ||
                t._id?.toLowerCase().includes(normalizedSearch) ||
                t.user?.phone?.includes(normalizedSearch) ||
                t.user?.nationalCode?.includes(normalizedSearch);

            const matchStatus = filter === 'all' ? true : t.orderStatus === filter;

            if (matchStatus && matchSearch) {
                filtered.push(t);
            }
        }

        return {
            filtered,
            summary: {
                total: transactions.length,
                pending,
                confirmed,
                cancelled,
                revenue,
            },
        };
    }, [transactions, filter, search]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 5,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography color="error">خطا در دریافت تراکنش‌ها</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
            {!querySearch && (
                <>
                    <TransactionSummaryCard {...processedData.summary} />

                    <TextField
                        fullWidth
                        label="جستجو بر اساس نام، شماره سفارش، موبایل "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Stack
                        direction="row"
                        sx={{
                            mb: 3,
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        <Chip
                            label="همه"
                            clickable
                            color={filter === 'all' ? 'primary' : 'default'}
                            variant={filter === 'all' ? 'filled' : 'outlined'}
                            onClick={() => setFilter('all')}
                        />

                        <Chip
                            label="در انتظار"
                            clickable
                            color={filter === 'pending' ? 'warning' : 'default'}
                            variant={filter === 'pending' ? 'filled' : 'outlined'}
                            onClick={() => setFilter('pending')}
                        />

                        <Chip
                            label="تایید شده"
                            clickable
                            color={filter === 'confirmed' ? 'success' : 'default'}
                            variant={filter === 'confirmed' ? 'filled' : 'outlined'}
                            onClick={() => setFilter('confirmed')}
                        />

                        <Chip
                            label="لغو شده"
                            clickable
                            color={filter === 'cancelled' ? 'error' : 'default'}
                            variant={filter === 'cancelled' ? 'filled' : 'outlined'}
                            onClick={() => setFilter('cancelled')}
                        />
                    </Stack>
                </>
            )}

            {processedData.filtered.length === 0 ? (
                <Typography>هیچ تراکنشی پیدا نشد</Typography>
            ) : (
                processedData.filtered.map((t) => <TransactionCard key={t._id} data={t} />)
            )}
        </Box>
    );
}

export default Index;
