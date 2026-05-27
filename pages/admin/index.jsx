import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Typography } from '@mui/material';

function AdminIndex() {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await res.json();

                if (!data.valid) {
                    router.replace('/admin/login_admin');
                    return;
                }

                router.replace('/admin/products');
            } catch (err) {
                console.error('Auth check failed:', err);
                router.replace('/admin/login_admin');
            }
        }

        checkAuth();
    }, []);

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
