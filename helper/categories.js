const CATEGORY_GROUP = [
    { value: 'shoes', label: 'کفش', image: '/category_groups/pngtree-sports-shoes-png-image_15910407.png' },
    { value: 'accessory', label: 'اکسسوری', image: '/category_groups/watch.webp' },
    { value: 'clothes', label: 'لباس', image: '/category_groups/cloths.webp' },
    // { value: 'bag', label: 'کیف', image: '/category_groups/bag.png' },
    { value: 'hat', label: 'کلاه', image: '/category_groups/hat.png' },
    { value: 'box', label: 'باکس هدیه', image: '/category_groups/box.png' },
];

const shoesOptions = [
    { value: 'casual', label: 'روزمره', group: 'shoes' },
    { value: 'sport', label: 'ورزشی', group: 'shoes' },
    { value: 'boots', label: 'بوت', group: 'shoes' },
    { value: 'formal', label: 'رسمی', group: 'shoes' },
    { value: 'basketball', label: 'بسکتبال', group: 'shoes' },
];

const hatOptions = [
    { value: 'beanie', label: 'لبه‌دار', group: 'accessory' },
    { value: 'winter', label: 'زمستانی', group: 'accessory' },
    { value: 'cowboy', label: 'کابویی', group: 'accessory' },
];

const clothesOptions = [
    { value: 'tshirt', label: 'تی‌شرت', group: 'clothes' },
    { value: 'shirt', label: 'پیراهن', group: 'clothes' },
    { value: 'hoodie', label: 'هودی', group: 'clothes' },
    { value: 'pants', label: 'شلوار', group: 'clothes' },
    { value: 'polo', label: 'پولوشرت', group: 'clothes' },
    { value: 'jacket', label: 'ژاکت', group: 'clothes' },
    { value: 'tanktop', label: 'تنک تاپ', group: 'clothes' },
    { value: 'crop_top', label: 'نیم‌تنه', group: 'clothes' },
    { value: 'shorts', label: 'شلوارک', group: 'clothes' },
    { value: 'undershirt', label: 'زیرپوش', group: 'clothes' },
    { value: 'underwear', label: 'لباس زیر', group: 'clothes' },
    { value: 'scarf', label: 'شال و روسری', group: 'clothes' },
];

const accessoryOptions = [
    { value: 'necklace', label: 'گردنبند', group: 'accessory' },
    { value: 'necklace_choker', label: 'چوکر', group: 'accessory' },
    { value: 'ring', label: 'انگشتر', group: 'accessory' },
    { value: 'watch', label: 'ساعت', group: 'accessory' },
    { value: 'bracelet', label: 'دستبند', group: 'accessory' },
    { value: 'glasses_sun', label: 'عینک آفتابی', group: 'accessory' },
    { value: 'glasses', label: 'عینک', group: 'accessory' },
    { value: 'belt', label: 'کمربند', group: 'accessory' },
    { value: 'earring', label: 'گوشواره', group: 'accessory' },
    { value: 'anklet', label: 'پابند', group: 'accessory' },
    { value: 'brooch', label: 'سنجاق سینه', group: 'accessory' },
    { value: 'cufflinks', label: 'دکمه سردست', group: 'accessory' },
    { value: 'tie_clip', label: 'کلیپس کراوات', group: 'accessory' },
    { value: 'hair_clip', label: 'کلیپس مو', group: 'accessory' },
    { value: 'hair_band', label: 'کش مو', group: 'accessory' },
    { value: 'hair_pin', label: 'سنجاق مو', group: 'accessory' },
];

const giftOptions = [{ value: 'gift_box', label: 'باکس هدیه', group: 'box' }];

const bagOptions = [
    { value: 'bag_handbag', label: 'کیف دستی', group: 'bag' },
    { value: 'bag_backpack', label: 'کوله‌پشتی', group: 'bag' },
    { value: 'bag_wallet', label: 'کیف پول', group: 'bag' },
    { value: 'bag_crossbody', label: 'کیف کراس‌بادی', group: 'bag' },
];

const allOptions = [...shoesOptions, ...bagOptions, ...giftOptions, ...accessoryOptions, ...clothesOptions, ...hatOptions];

export { shoesOptions, bagOptions, giftOptions, accessoryOptions, clothesOptions, hatOptions, allOptions, CATEGORY_GROUP };
