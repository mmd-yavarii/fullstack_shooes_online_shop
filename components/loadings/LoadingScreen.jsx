import React from 'react';

export default function LoadingScreen() {
    return (
        <>
            <div className="p-4 max-w-6xl mx-auto">
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
