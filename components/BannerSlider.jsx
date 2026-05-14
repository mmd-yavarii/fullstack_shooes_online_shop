import React, { useEffect, useState } from 'react';

const DURATION = 9000;

function BannerSlider() {
    const [banners, setBanners] = useState([]);
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    // 1. fetch from server
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/baner/get-baner-imgs');
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

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

    // 2. slider logic (only when data exists)
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
                <div className="absolute top-0 left-0 w-full h-[4px] bg-white/20 z-[1]">
                    <div className="h-full bg-[#6d071a]" style={{ width: `${progress}%` }} />
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
