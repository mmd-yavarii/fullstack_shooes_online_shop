import React, { useState } from 'react';

import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function LoginAdmin() {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        // API Login
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
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(124,58,237,0.35)',
                        }}
                    >
                        <AdminPanelSettingsIcon
                            sx={{
                                color: '#fff',
                                fontSize: 36,
                            }}
                        />
                    </Box>
                </Box>

                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    ورود ادمین
                </Typography>

                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
                    برای ورود اطلاعات حساب خود را وارد کنید
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                    }}
                >
                    <TextField fullWidth label="ایمیل" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />

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

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            py: 1.4,
                            borderRadius: 3,
                            fontWeight: 'bold',
                            boxShadow: '0 8px 20px rgba(124,58,237,0.35)',
                        }}
                    >
                        ورود به پنل
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default LoginAdmin;
