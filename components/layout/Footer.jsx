import Link from 'next/link';
import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import Image from 'next/image';

function Footer() {
    return (
        <footer className="relative mt-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80 backdrop-blur-2xl" />
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#6d071a]/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-[950px] px-4">
                <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3 md:gap-16">
                    {/* BRAND */}
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                            <span className="bg-gradient-to-r from-[#6d071a] to-[#d82a70] bg-clip-text text-transparent">Zhiyano</span>
                        </h2>

                        <p className="mx-auto max-w-[280px] text-xs leading-6 text-gray-600 md:mx-0 md:text-sm">
                            تجربه خرید مدرن، سریع و بدون پیچیدگی.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <h3 className="text-sm font-bold text-[#6d071a]">لینک‌ها</h3>

                        <div className="flex flex-col gap-2">
                            <Link href="/" className="text-sm text-gray-600 hover:text-[#6d071a]">
                                خانه
                            </Link>

                            <Link href="/about" className="text-sm text-gray-600 hover:text-[#6d071a]">
                                درباره ما
                            </Link>

                            <Link href="/developer-contact" className="text-sm text-gray-600 hover:text-[#6d071a]">
                                ارتباط با توسعه‌دهنده
                            </Link>
                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex flex-col items-center gap-3 md:items-start">
                        <h3 className="text-sm font-bold text-[#6d071a]">پشتیبانی</h3>

                        <div className="flex gap-6">
                            <a
                                href="https://instagram.com/zhiyano.1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/70 shadow-sm backdrop-blur-xl transition hover:-translate-y-1">
                                    <FiInstagram className="text-[#6d071a]" />
                                </div>

                                <span className="text-xs text-gray-600">اینستاگرام</span>
                            </a>

                            <a
                                href="https://t.me/Yoseef1_3_7_5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/70 shadow-sm backdrop-blur-xl transition hover:-translate-y-1">
                                    <FaTelegramPlane className="text-[#6d071a]" />
                                </div>

                                <span className="text-xs text-gray-600">تلگرام</span>
                            </a>

                            <a
                                href="https://rubika.ir/yo13755"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/70 shadow-sm backdrop-blur-xl transition hover:-translate-y-1">
                                    <Image src="/Rubika-Logo.webp" alt="Rubika" width={20} height={20} />
                                </div>

                                <span className="text-xs text-gray-600">روبیکا</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
