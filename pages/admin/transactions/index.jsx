import React, { useEffect, useState, useMemo } from 'react';

import { CircularProgress, Box, Typography, TextField, Stack, Chip } from '@mui/material';

import TransactionCard from '@/components/admin/TransactionCard';
import TransactionSummaryCard from '@/components/admin/TransactionSummaryCard';

function Index() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const fetchTransactions = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/transaction', {
                    signal: controller.signal,
                });

                const data = await res.json();

                setTransactions(data.data || []);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();

        return () => controller.abort();
    }, []);

    const processedData = useMemo(() => {
        let pending = 0;
        let confirmed = 0;
        let cancelled = 0;
        let revenue = 0;

        const filtered = [];
        const normalizedSearch = search.trim().toLowerCase();

        for (const t of transactions) {
            // summary
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

            // search FIX
            const matchSearch = !normalizedSearch || t.user?.fullName?.toLowerCase().includes(normalizedSearch);

            // filter
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
            <TransactionSummaryCard {...processedData.summary} />

            <TextField fullWidth label="جستجو بر اساس نام" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 2 }} />

            <Stack direction="row" sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
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

            {processedData.filtered.length === 0 ? (
                <Typography>هیچ تراکنشی پیدا نشد</Typography>
            ) : (
                processedData.filtered.map((t) => <TransactionCard key={t._id} data={t} />)
            )}
        </Box>
    );
}

export default Index;
