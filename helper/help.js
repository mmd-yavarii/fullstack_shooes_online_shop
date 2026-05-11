export function applyDiscount(price, discountPercent = 0) {
    if (!price || discountPercent <= 0) return price;

    return Math.round(price * (1 - discountPercent / 100));
}
