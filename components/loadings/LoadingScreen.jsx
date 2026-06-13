import React from 'react';

export default function LoadingScreen() {
    return (
        <>
            <div className="p-4 max-w-6xl mx-auto">
                {/* TITLE */}
                <div className="relative overflow-hidden bg-gray-200 h-5 w-40 rounded-md mb-6 shimmer" />

                {/* DISCOUNT PRODUCTS */}
                <div className="mb-4">
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-44 border border-black/5 rounded-xl p-3 bg-white shadow-sm">
                                <div className="relative overflow-hidden bg-gray-200 h-28 w-full mb-3 rounded-lg shimmer" />
                                <div className="relative overflow-hidden bg-gray-200 h-4 w-3/4 mb-2 shimmer" />
                                <div className="relative overflow-hidden bg-gray-200 h-3 w-1/2 mb-2 shimmer" />
                                <div className="relative overflow-hidden bg-gray-200 h-3 w-1/3 shimmer" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* BANNER */}
                <div className="relative overflow-hidden bg-gray-200 w-full max-w-[900px] h-[300px] rounded-xl mx-auto mb-6 shimmer" />

                {/* SEARCH */}
                <div className="relative overflow-hidden bg-gray-200 h-4 w-28 mb-3 rounded-md shimmer" />
                <div className="relative overflow-hidden bg-gray-200 h-11 w-full rounded-xl mb-6 shimmer" />

                {/* GROUP FILTER */}
                <div className="flex gap-4 overflow-x-auto mb-4 pb-4 no-scrollbar">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center min-w-[90px] gap-2">
                            <div className="relative overflow-hidden bg-gray-200 w-12 h-12 rounded-full shimmer" />
                            <div className="relative overflow-hidden bg-gray-200 w-16 h-3 rounded-md shimmer" />
                        </div>
                    ))}
                </div>

                {/* CATEGORY FILTER */}
                <div className="flex gap-2 overflow-x-auto mb-6 no-scrollbar">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="relative overflow-hidden bg-gray-200 h-7 w-20 rounded-full shimmer" />
                    ))}
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="border border-black/5 rounded-xl p-3 bg-white shadow-sm">
                            <div className="relative overflow-hidden bg-gray-200 h-28 w-full mb-3 rounded-lg shimmer" />
                            <div className="relative overflow-hidden bg-gray-200 h-4 w-3/4 mb-2 shimmer" />
                            <div className="relative overflow-hidden bg-gray-200 h-3 w-1/2 mb-2 shimmer" />
                            <div className="relative overflow-hidden bg-gray-200 h-3 w-1/3 shimmer" />
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-8">
                    <div className="relative overflow-hidden bg-gray-200 h-9 w-40 rounded-md shimmer" />
                </div>
            </div>

            {/* STYLES */}
            <style jsx>{`
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }

                .shimmer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -150%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(
                        120deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.12) 35%,
                        rgba(255, 255, 255, 0.65) 50%,
                        rgba(255, 255, 255, 0.12) 65%,
                        transparent 100%
                    );
                    transform: skewX(-20deg);
                    animation: shimmerMove 1.4s infinite ease-in-out;
                }

                @keyframes shimmerMove {
                    0% {
                        left: -150%;
                    }
                    100% {
                        left: 150%;
                    }
                }

                /* HIDE SCROLLBAR */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}
