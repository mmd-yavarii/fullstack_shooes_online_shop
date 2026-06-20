import { CATEGORY_GROUP } from '@/helper/categories';
import Image from 'next/image';

export default function FilterGroups({ categoryGroup, setCategoryGroup }) {
    const items = [{ value: 'all', label: 'همه', image: '/category_groups/allgoods.png' }, ...CATEGORY_GROUP];

    return (
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {items.map((item) => {
                const active = categoryGroup === item.value;

                return (
                    <button
                        key={item.value}
                        onClick={() => setCategoryGroup(item.value)}
                        className={`
                            group relative flex flex-col items-center justify-center
                            p-4 rounded-2xl transition-all duration-300

                            ${active ? 'bg-white shadow-lg scale-[1.04]' : 'bg-white hover:shadow-md'}
                        `}
                    >
                        {/* glow layer */}
                        <div
                            className={`
                                absolute inset-0 rounded-2xl transition-opacity duration-300
                                ${
                                    active
                                        ? 'opacity-100 bg-gradient-to-b from-[#6d071a]/5 to-transparent'
                                        : 'opacity-0 group-hover:opacity-100 bg-black/5'
                                }
                            `}
                        />

                        {/* icon wrapper */}
                        <div
                            className={`
                                relative w-16 h-16 flex items-center justify-center rounded-2xl
                                transition-all duration-300

                                ${active ? 'scale-110' : 'group-hover:scale-105'}
                            `}
                        >
                            <Image src={item.image} alt={item.label} fill className="object-contain drop-shadow-sm" />
                        </div>

                        {/* label */}
                        <span
                            className={`
                                mt-3 text-sm text-center transition-all duration-300
                                ${active ? 'text-gray-900 font-semibold' : 'text-gray-500 group-hover:text-gray-700'}
                            `}
                        >
                            {item.label}
                        </span>

                        {/* indicator */}
                        <div
                            className={`
                                mt-2 h-[2px] rounded-full transition-all duration-300
                                ${active ? 'w-10 bg-[#6d071a]' : 'w-4 bg-gray-200 group-hover:w-6'}
                            `}
                        />

                        {/* subtle ring instead of border */}
                        <div
                            className={`
                                absolute inset-0 rounded-2xl transition-all duration-300
                                ${active ? 'ring-1 ring-[#6d071a]/15' : 'ring-0'}
                            `}
                        />
                    </button>
                );
            })}
        </div>
    );
}
