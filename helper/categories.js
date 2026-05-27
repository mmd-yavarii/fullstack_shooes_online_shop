const CATEGORY_GROUP = [
    { value: 'shoes', label: 'کفش', image: '/category_groups/pngtree-sports-shoes-png-image_15910407.png' },
    { value: 'accessory', label: 'اکسسوری', image: '/category_groups/watch.webp' },
    { value: 'clothes', label: 'لباس', image: '/category_groups/cloths.webp' },
    { value: 'bag', label: 'کیف', image: '/category_groups/bag.png' },
    { value: 'box', label: 'باکس هدیه', image: '/category_groups/box.png' },
];

const shoesOptions = [
    { value: 'casual', label: 'روزمره' },
    { value: 'sport', label: 'ورزشی' },
    { value: 'boots', label: 'بوت' },
    { value: 'formal', label: 'رسمی' },
    { value: 'basketball', label: 'بسکتبال' },
];

const hatOptions = [
    { value: 'beanie', label: 'لبه‌دار' },
    { value: 'winter', label: 'زمستانی' },
    { value: 'cowboy', label: 'کابویی' },
];

const clothesOptions = [
    { value: 'tshirt', label: 'تی‌شرت ' },
    { value: 'shirt', label: 'پیراهن ' },
    { value: 'hoodie', label: 'هودی ' },
    { value: 'pants', label: 'شلوار ' },
    { value: 'polo', label: 'پولوشرت ' },
    { value: 'jacket', label: 'ژاکت ' },
    { value: 'tanktop', label: 'تنک تاپ ' },
    { value: 'tanktop', label: 'نیم‌تنه' },
    { value: 'shorts', label: 'شلوارک ' },
    { value: 'undershirt', label: 'زیرپوش' },
    { value: 'underwear', label: 'لباس زیر' },
    { value: 'scarf', label: 'شال و روسری' },
];

const accessoryOptions = [
    { value: 'necklace', label: 'گردنبند' },
    { value: 'necklace_choker', label: 'چوکر' },
    { value: 'ring', label: 'انگشتر' },
    { value: 'watch', label: 'ساعت ' },
    { value: 'bracelet', label: 'دستبند' },
    { value: 'glasses_sun', label: 'عینک آفتابی' },
    { value: 'glasses', label: 'عینک' },
    { value: 'belt', label: 'کمربند' },
    { value: 'earring', label: 'گوشواره' },
    { value: 'anklet', label: 'پابند' },
    { value: 'brooch', label: 'سنجاق سینه' },
    { value: 'cufflinks', label: 'دکمه سردست' },
    { value: 'tie_clip', label: 'کلیپس کراوات' },
    { value: 'hair_clip', label: 'کلیپس مو' },
    { value: 'hair_band', label: 'کش مو' },
    { value: 'hair_pin', label: 'سنجاق مو' },
];

const giftOptions = [{ value: 'gift_box', label: 'باکس هدیه' }];

const bagOptions = [
    { value: 'bag_handbag', label: 'کیف دستی' },
    { value: 'bag_backpack', label: 'کوله‌پشتی' },
    { value: 'bag_wallet', label: 'کیف پول' },
    { value: 'bag_crossbody', label: 'کیف کراس‌بادی' },
];

const allOptions = [...shoesOptions, ...bagOptions, ...giftOptions, ...accessoryOptions, ...clothesOptions, ...hatOptions];

export { shoesOptions, bagOptions, giftOptions, accessoryOptions, clothesOptions, hatOptions, allOptions, CATEGORY_GROUP };
