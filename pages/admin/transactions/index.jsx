import React, { useEffect, useState, useMemo } from 'react';
import { CircularProgress, Box, Typography, TextField, Stack, Chip } from '@mui/material';

import TransactionCard from '@/components/admin/TransactionCard';
import TransactionSummaryCard from '@/components/admin/TransactionSummaryCard';

function Index() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('all'); // all | pending | confirmed | cancelled
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/transaction/');
                const data = await res.json();

                setTransactions(data.data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // 🚀 single pass processor (بهینه)
    const processedData = useMemo(() => {
        let pending = 0;
        let confirmed = 0;
        let cancelled = 0;
        let revenue = 0;

        const filtered = [];

        for (const t of transactions) {
            // summary
            if (t.orderStatus === 'pending') pending++;
            if (t.orderStatus === 'confirmed') {
                confirmed++;
                revenue += t.totalPrice || 0;
            }
            if (t.orderStatus === 'cancelled') cancelled++;

            // filter
            const matchStatus = filter === 'all' ? true : t.orderStatus === filter;
            const matchSearch = t.fullName?.toLowerCase().includes(search.toLowerCase());

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
        <Box sx={{ p: 3, maxWidth: 900, margin: '0 auto' }}>
            {/* 📊 Summary */}
            <TransactionSummaryCard {...processedData.summary} />

            {/* 🔍 Search */}
            <TextField fullWidth label="جستجو بر اساس نام" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 2 }} />

            {/* 🎯 Filters */}
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

            {/* 📦 List */}
            {processedData.filtered.length === 0 ? (
                <Typography>هیچ تراکنشی پیدا نشد</Typography>
            ) : (
                processedData.filtered.map((t) => <TransactionCard key={t._id} data={t} />)
            )}
        </Box>
    );
}

export default Index;
