export const COLOR_PALETTE = [
    // Neutral
    { name: 'مشکی', hex: '#000000' },
    { name: 'سفید', hex: '#FFFFFF' },
    { name: 'خاکستری روشن', hex: '#D3D3D3' },
    { name: 'خاکستری', hex: '#808080' },
    { name: 'خاکستری تیره', hex: '#2F2F2F' },
    { name: 'نقره‌ای', hex: '#C0C0C0' },
    { name: 'ذغالی', hex: '#36454F' },
    { name: 'کرم', hex: '#F5F5DC' },
    { name: 'بژ', hex: '#F5F5DC' },
    { name: 'شیری', hex: '#FFFDD0' },

    // Red / Pink
    { name: 'قرمز', hex: '#FF0000' },
    { name: 'زرشکی', hex: '#800020' },
    { name: 'شرابی', hex: '#722F37' },
    { name: 'صورتی', hex: '#FFC0CB' },
    { name: 'صورتی چرک', hex: '#D8A39D' },
    { name: 'گلبهی', hex: '#FFB07C' },

    // Orange / Yellow
    { name: 'نارنجی', hex: '#FFA500' },
    { name: 'نارنجی سوخته', hex: '#CC5500' },
    { name: 'طلایی', hex: '#FFD700' },
    { name: 'زرد', hex: '#FFFF00' },
    { name: 'خردلی', hex: '#D4A017' },

    // Green
    { name: 'سبز', hex: '#008000' },
    { name: 'سبز تیره', hex: '#006400' },
    { name: 'سبز لیمویی', hex: '#32CD32' },
    { name: 'زیتونی', hex: '#808000' },
    { name: 'یشمی', hex: '#00A86B' },
    { name: 'سدری', hex: '#738678' },

    // Blue
    { name: 'آبی', hex: '#0000FF' },
    { name: 'سرمه‌ای', hex: '#000080' },
    { name: 'آبی نفتی', hex: '#003153' },
    { name: 'آبی کاربنی', hex: '#123456' },
    { name: 'آبی آسمانی', hex: '#87CEEB' },
    { name: 'فیروزه‌ای', hex: '#40E0D0' },

    // Purple
    { name: 'بنفش', hex: '#800080' },
    { name: 'یاسی', hex: '#C8A2C8' },
    { name: 'بادمجانی', hex: '#614051' },

    // Brown
    { name: 'قهوه‌ای', hex: '#8B4513' },
    { name: 'قهوه‌ای روشن', hex: '#A52A2A' },
    { name: 'شکلاتی', hex: '#D2691E' },
    { name: 'نسکافه‌ای', hex: '#967969' },

    // Fashion / Popular
    { name: 'نود', hex: '#E3BC9A' },
    { name: 'موکا', hex: '#96705B' },
    { name: 'رزگلد', hex: '#B76E79' },
    { name: 'کالباسی', hex: '#CD5C5C' },
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
