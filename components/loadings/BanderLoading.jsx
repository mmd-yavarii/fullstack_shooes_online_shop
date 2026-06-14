import React from 'react';

function BanderLoading() {
    return (
        <div className="w-full flex justify-center" dir="rtl">
            <div className="relative w-full max-w-[900px] h-[300px] overflow-hidden rounded-xl shadow-md bg-gray-100">
                {/* overlay skeleton */}
                <div className="absolute inset-0 bg-gray-200 shimmer" />

                {/* progress bar skeleton */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[92%] h-[6px] z-[3]">
                    <div className="w-full h-full rounded-full bg-gray-300 shimmer" />
                </div>

                {/* text skeleton */}
                <div className="absolute bottom-6 right-6 z-[2] text-right w-[70%] space-y-3">
                    <div className="h-6 w-2/3 bg-gray-300 rounded shimmer" />
                    <div className="h-4 w-full bg-gray-300 rounded shimmer" />
                    <div className="h-4 w-5/6 bg-gray-300 rounded shimmer" />
                </div>
            </div>

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
                        rgba(255, 255, 255, 0.15) 35%,
                        rgba(255, 255, 255, 0.6) 50%,
                        rgba(255, 255, 255, 0.15) 65%,
                        transparent 100%
                    );
                    transform: skewX(-20deg);
                    animation: shimmerMove 1.2s infinite ease-in-out;
                }

                @keyframes shimmerMove {
                    0% {
                        left: -150%;
                    }
                    100% {
                        left: 150%;
                    }
                }
            `}</style>
        </div>
    );
}

export default BanderLoading;
