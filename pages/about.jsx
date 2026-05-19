import React from 'react';
import { Typography, Divider, Box } from '@mui/material';

function About() {
    return (
        <div className="max-w-[900px] mx-auto p-4 flex flex-col gap-10">
            {/* ABOUT */}
            <div>
                <Typography variant="h5" fontWeight={800} mb={2}>
                    درباره ما
                </Typography>

                <Typography color="text.secondary" lineHeight={2}>
                    ما در فروشگاه Zhiyano تلاش می‌کنیم تجربه‌ای ساده، سریع و مطمئن از خرید آنلاین برای کاربران فراهم کنیم. هدف ما ارائه محصولات با
                    کیفیت و قیمت مناسب همراه با پشتیبانی واقعی است.
                </Typography>
            </div>

            <Divider />

            {/* CONTACT */}
            <div>
                <Typography variant="h5" fontWeight={800} mb={2}>
                    تماس با ما
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography color="text.secondary">📞 تلفن: 0912-123-4567</Typography>

                    <Typography color="text.secondary">📧 ایمیل: support@zhiyano.com</Typography>

                    <Typography color="text.secondary">📍 آدرس: ایران، تهران</Typography>
                </Box>

                <Typography fontSize={13} color="text.secondary" mt={3}>
                    پاسخگویی همه روزه از ساعت ۹ صبح تا ۶ عصر
                </Typography>
            </div>
        </div>
    );
}

export default About;
