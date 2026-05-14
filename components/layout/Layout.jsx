import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

function Layout({ children }) {
    const router = useRouter();

    const isAdminRoute = router.pathname.startsWith('/admin');

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <div>
            {/* header */}
            <div
                className="flex items-center justify-between p-4 bg-white max-w-[900px]"
                style={{
                    boxShadow: '1px 2px 10px #00000011',
                    position: 'sticky',
                    top: '0',
                    zIndex: '2',
                    borderRadius: '10px',
                    margin: '0 auto',
                }}
            >
                <Link href="">
                    <FiShoppingCart size="25px" />
                </Link>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#6d071a] font-bold">Zhiyano</p>
                    <p className="text-[#6d071a] font-bold">ژیویانو</p>
                </div>

                <Link href="">
                    <FiShoppingCart size="25px" />
                </Link>
            </div>

            {children}

            {/* footer */}
            <div className="border-t border-[#0000001c] p-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#6d071a] font-bold">Zhiyano</p>
                    <p className="text-[#6d071a] font-bold">ژیویانو</p>
                </div>

                <div className="flex items-center justify-evenly mt-3">
                    <Link href="" className="w-15">
                        پیگیری سفارش
                    </Link>
                    <img width={70} src="https://cloud.rtl-theme.com/wp-content/uploads/2024/07/1d2ab0.png" alt="" />
                    <Link href="" className="w-15">
                        درباره ما
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Layout;
