import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';

import theme from '@/theme.mui';
import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';
import { CartProvider } from '@/context/CartContext';

const queryClient = new QueryClient();

// FONT
const vazirmatn = localFont({
    src: [
        {
            path: '../src/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../src/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../src/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
});

export default function App({ Component, pageProps }) {
    return (
        <div className={vazirmatn.className}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CartProvider>
                        <CssBaseline />

                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CartProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    );
}
