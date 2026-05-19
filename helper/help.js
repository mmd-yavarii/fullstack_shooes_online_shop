export const COLOR_PALETTE = [
    // Neutrals
    { name: 'مشکی', hex: '#000000' },
    { name: 'سفید', hex: '#FFFFFF' },
    { name: 'خاکستری روشن', hex: '#F5F5F5' },
    { name: 'نقره‌ای', hex: '#C0C0C0' },
    { name: 'خاکستری', hex: '#808080' },
    { name: 'خاکستری تیره', hex: '#2C2C2C' },

    // Basic colors
    { name: 'قرمز', hex: '#FF0000' },
    { name: 'سبز لیمویی', hex: '#00FF00' },
    { name: 'آبی', hex: '#0000FF' },
    { name: 'زرد', hex: '#FFFF00' },
    { name: 'ارغوانی', hex: '#FF00FF' },
    { name: 'فیروزه‌ای', hex: '#00FFFF' },

    // Warm / Fashion tones
    { name: 'نارنجی', hex: '#FFA500' },
    { name: 'مرجانی', hex: '#FF7F50' },
    { name: 'گوجه‌ای', hex: '#FF6347' },
    { name: 'قهوه‌ای', hex: '#8B4513' },
    { name: 'دارچینی', hex: '#A0522D' },
    { name: 'شکلاتی', hex: '#D2691E' },

    // Natural / earthy tones
    { name: 'سبز', hex: '#008000' },
    { name: 'زیتونی تیره', hex: '#556B2F' },
    { name: 'سبز زیتونی', hex: '#6B8E23' },
    { name: 'بنفش', hex: '#800080' },
    { name: 'نیلی', hex: '#4B0082' },
    { name: 'زرشکی', hex: '#DC143C' },
];

function applyDiscount(price, discountPercent = 0) {
    if (!price || discountPercent <= 0) return price;

    return Math.round(price * (1 - discountPercent / 100));
}

export { applyDiscount, COLOR_PALETTE };
