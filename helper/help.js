export const COLOR_PALETTE = [
    // Neutrals
    { name: 'مشکی', hex: '#000000' },
    { name: 'سفید', hex: '#FFFFFF' },
    { name: 'خاکستری', hex: '#808080' },
    { name: 'ذغالی', hex: '#333333' },

    // Red family
    { name: 'قرمز', hex: '#FF0000' },
    { name: 'زرشکی', hex: '#800020' },
    { name: 'صورتی', hex: '#FFC0CB' },

    // Blue family
    { name: 'آبی', hex: '#0000FF' },
    { name: 'سرمه‌ای', hex: '#000080' },
    { name: 'آبی آسمانی', hex: '#87CEEB' },

    // Green family
    { name: 'سبز', hex: '#008000' },
    { name: 'سبز تیره', hex: '#006400' },
    { name: 'زیتونی', hex: '#808000' },

    // Yellow / Orange
    { name: 'زرد', hex: '#FFFF00' },
    { name: 'نارنجی', hex: '#FFA500' },
    { name: 'طلایی', hex: '#FFD700' },

    // Purple
    { name: 'بنفش', hex: '#800080' },

    // Brown
    { name: 'قهوه‌ای', hex: '#8B4513' },

    // Metallic / Fashion colors
    { name: 'بژ', hex: '#F5F5DC' },
    { name: 'کرم', hex: '#FFFDD0' },
    { name: 'نقره‌ای', hex: '#C0C0C0' },
    { name: 'رزگلد', hex: '#B76E79' },
];

export function getColorNameByHex(hex) {
    if (!hex) return null;

    const normalizedHex = hex.toUpperCase().replace('#', '');

    const color = COLOR_PALETTE.find((item) => item.hex.toUpperCase().replace('#', '') === normalizedHex);

    return color ? color.name : 'نامشخص';
}

function applyDiscount(price, discountPercent = 0) {
    if (!price || discountPercent <= 0) return price;

    return Math.floor(price * (1 - discountPercent / 100));
}

export { applyDiscount, COLOR_PALETTE };
