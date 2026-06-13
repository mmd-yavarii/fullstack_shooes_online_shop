import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="fa" dir="rtl">
            <Head>
                <link rel="icon" href="/icon.png" />

                <title>ژییانو | فروشگاه اینترنتی</title>

                <meta name="description" content="خرید آنلاین محصولات با بهترین قیمت، ارسال سریع و ضمانت کیفیت در ژییانو" />

                <meta property="og:title" content="ژییانو | فروشگاه اینترنتی" />
                <meta property="og:description" content="خرید آنلاین محصولات با بهترین قیمت، ارسال سریع و ضمانت کیفیت" />
                <meta property="og:image" content="https://your-domain.com/images/og-home.jpg" />
                <meta property="og:type" content="website" />

                <meta name="theme-color" content="#0f172a" />
            </Head>

            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
