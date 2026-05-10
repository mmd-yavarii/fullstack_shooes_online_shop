import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Link href={'/products/add_product'}>add new product</Link>
            <Link href={'/products'}>products list</Link>
        </>
    );
}
