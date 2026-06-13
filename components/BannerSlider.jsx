import React, { useEffect, useState } from 'react';

const DURATION = 9000;

function BannerSlider() {
    const [banners, setBanners] = useState([]);
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/baner/get-baner-imgs');
                const data = await res.json();

                setBanners(data.baners || []);
            } catch (err) {
                console.error('Failed to load banners', err);
                setBanners([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (!banners.length) return;

        let start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percent = (elapsed / DURATION) * 100;

            if (percent >= 100) {
                start = Date.now();
                setProgress(0);

                setFade(false);

                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % banners.length);
                    setFade(true);
                }, 300);
            } else {
                setProgress(percent);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [banners]);

    if (loading) {
        return <div className="w-full flex justify-center py-10 text-gray-500">در حال بارگذاری بنرها...</div>;
    }

    if (!banners.length) {
        return <></>;
    }

    const current = banners[index];

    return (
        <div className="w-full flex justify-center" dir="rtl">
            <div className="relative w-full max-w-[900px] h-[300px] overflow-hidden rounded-xl shadow-md">
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />

                {/* progress bar */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[92%] h-[6px] z-[3]">
                    <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-md overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6d071a]/20 to-[#a10b2a]/20 animate-pulse" />
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#6d071a] to-[#a10b2a] shadow-[0_0_12px_rgba(109,7,26,0.6)] transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* image */}
                <img
                    src={current.image}
                    alt={current.title}
                    className={`absolute w-full h-full object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* text */}
                <div className="absolute bottom-6 right-6 z-[2] text-white max-w-[70%] text-right">
                    <h2 className="text-2xl font-bold">{current.title}</h2>
                    <p className="text-sm mt-2 opacity-90 leading-6">{current.description}</p>
                </div>
            </div>
        </div>
    );
}

export default BannerSlider;
