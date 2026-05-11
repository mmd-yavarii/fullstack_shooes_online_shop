import { Card, CardContent, Typography, Box, Stack, Divider } from '@mui/material';

function TransactionSummaryCard({ total, pending, confirmed, cancelled, revenue }) {
    return (
        <Card
            sx={{
                mb: 3,
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                background: '#fff',
                transition: '0.3s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 14px 40px rgba(0,0,0,0.1)',
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    خلاصه تراکنش‌ها
                </Typography>

                {/* Main KPI */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827', lineHeight: 1 }}>
                        {total}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        تعداد کل تراکنش‌ها
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Stats */}
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                    <Stat label="در انتظار" value={pending} color="#f59e0b" />
                    <Stat label="تایید شده" value={confirmed} color="#16a34a" />
                    <Stat label="لغو شده" value={cancelled} color="#ef4444" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Revenue */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        مجموع درآمد
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
                        {Number(revenue || 0).toLocaleString()} تومان
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

function Stat({ label, value, color }) {
    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 100,
                p: 1.5,
                borderRadius: 3,
                background: 'rgba(0,0,0,0.02)',
                border: `1px solid ${color}20`,
                transition: '0.2s ease',
                '&:hover': {
                    transform: 'scale(1.03)',
                    background: `${color}08`,
                },
            }}
        >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {label}
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    fontWeight: 800,
                    color,
                }}
            >
                {value}
            </Typography>
        </Box>
    );
}

export default TransactionSummaryCard;
