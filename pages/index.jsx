import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Link href={'/admin/login_admin'} className="text-blue-600 m-[50px] h-12">
                ادمین پنل
            </Link>
        </>
    );
}
