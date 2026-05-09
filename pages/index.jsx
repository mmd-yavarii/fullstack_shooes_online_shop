import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Link href={'/add_product'}>add new product</Link>
        </>
    );
}
