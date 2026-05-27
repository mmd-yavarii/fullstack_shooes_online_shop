import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from 'next/link';

function LoginAdmin() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await res.json();

                if (data.valid) {
                    router.replace('/admin/products');
                    return;
                }
            } catch (err) {
                console.log(err);
            } finally {
                setCheckingAuth(false);
            }
        }

        checkAuth();
    }, []);

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch('/api/create_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Create admin failed');
            }

            setSuccess('ادمین با موفقیت ساخته شد');

            setTimeout(() => {
                router.push('/admin/login_admin');
            }, 1200);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>در حال بررسی وضعیت ورود...</Box>;
    }

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
                    ایجاد ادمین
                </Typography>

                <Typography variant="body2" textAlign="center" sx={{ mb: 3 }} color="text.secondary">
                    ایجاد ادمین فقط یک بار امکان‌پذیر است
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleCreateAdmin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'در حال ایجاد ادمین...' : 'ایجاد ادمین'}
                    </Button>

                    <Link href="/admin/login_admin" className="text-center">
                        ورود به پنل ادمین
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default LoginAdmin;
