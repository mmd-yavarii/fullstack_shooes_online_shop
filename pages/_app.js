import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme.mui';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <CssBaseline />
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}
