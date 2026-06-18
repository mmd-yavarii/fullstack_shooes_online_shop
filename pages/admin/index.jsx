import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

function AdminIndex() {
    const router = useRouter();

    const { data, error } = useQuery({
        queryKey: ['admin-auth'],
        queryFn: async () => {
            const res = await fetch('/api/auth/verify', {
                method: 'GET',
                credentials: 'include',
            });

            return res.json();
        },
    });

    useEffect(() => {
        if (error) {
            console.error('Auth check failed:', error);
            router.replace('/admin/login_admin');
            return;
        }

        if (!data) return;

        if (!data.valid) {
            router.replace('/admin/login_admin');
            return;
        }

        router.replace('/admin/products');
    }, [data, error, router]);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />

            <Typography sx={{ mt: 2 }} color="text.secondary">
                در حال بررسی وضعیت ورود...
            </Typography>
        </Box>
    );
}

export default AdminIndex;
