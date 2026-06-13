export default function ProductPageSkeleton() {
    return (
        <div className="max-w-[1100px] mx-auto p-4 pb-24 flex flex-col lg:flex-row gap-8 mt-4">
            {/* MEDIA SKELETON */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative overflow-hidden bg-gray-200 border border-black/5 rounded-2xl h-[420px]">
                    <div className="shimmer" />
                </div>

                <div className="flex gap-2 overflow-x-auto">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-[72px] h-[72px] rounded-lg bg-gray-200 relative overflow-hidden">
                            <div className="shimmer" />
                        </div>
                    ))}
                </div>
            </div>

            {/* INFO + ACTIONS SKELETON */}
            <div className="flex-1 flex flex-col gap-6">
                {/* TITLE */}
                <div className="h-6 w-2/3 bg-gray-200 rounded-md relative overflow-hidden">
                    <div className="shimmer" />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                    <div className="h-3 w-5/6 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                </div>

                {/* PRICE */}
                <div className="flex gap-3 items-center mt-2">
                    <div className="h-5 w-24 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                    <div className="h-6 w-32 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                </div>

                {/* COLORS */}
                <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-9 h-9 rounded-full bg-gray-200 relative overflow-hidden">
                                <div className="shimmer" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* SIZES */}
                <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                        <div className="shimmer" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-10 w-12 bg-gray-200 rounded relative overflow-hidden">
                                <div className="shimmer" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* BUTTON */}
                <div className="h-12 w-full bg-gray-200 rounded-full relative overflow-hidden mt-4">
                    <div className="shimmer" />
                </div>
            </div>

            {/* SHIMMER STYLE */}
            <style jsx>{`
                .shimmer {
                    position: absolute;
                    inset: 0;
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
            `}</style>
        </div>
    );
}
