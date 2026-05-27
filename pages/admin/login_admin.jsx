import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from 'next/link';

function LoginAdmin() {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/verify', {
                    credentials: 'include',
                });

                const data = await res.json();

                if (data.valid) {
                    router.replace('/admin/products/');
                }
            } catch (err) {
                router.back();
            }
        }

        checkAuth();
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // log inn handeler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // ✅ redirect بعد از لاگین موفق
            router.push('/admin/products');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <AdminPanelSettingsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                </Box>

                <Typography variant="h5" textAlign="center" fontWeight="bold">
                    ورود ادمین
                </Typography>

                <Typography variant="body2" textAlign="center" sx={{ mb: 3 }} color="text.secondary">
                    ورود به پنل مدیریت
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField fullWidth label="نام کاربری" value={form.username} onChange={(e) => handleChange('username', e.target.value)} />
                    <TextField
                        fullWidth
                        label="رمز عبور"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" disabled={loading} sx={{ py: 1.5, borderRadius: 2 }}>
                        {loading ? 'در حال ورود...' : 'ورود'}
                    </Button>

                    <Link href="/admin/signup_admin" className="text-center">
                        ایجاد ادمین
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default LoginAdmin;
