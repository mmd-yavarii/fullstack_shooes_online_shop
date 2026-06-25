export function buildOrderMessage(transaction, refId) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const formatPrice = (price) => Number(price || 0).toLocaleString('fa-IR');

    return `
🧾 سفارش جدید ثبت شد

🆔 پرداخت: ${refId}
📦 سفارش: ${transaction._id}

👤 مشتری
• نام: ${transaction.user.fullName}
• موبایل: ${transaction.user.phone}
• آدرس: ${transaction.user.address}
• کد پستی: ${transaction.user.postalCode}

💰 مالی
• مبلغ کل: ${formatPrice(transaction.pricing.totalFinalPrice)}
• تخفیف: ${formatPrice(transaction.pricing.totalDiscount)}
• مبلغ اولیه: ${formatPrice(transaction.pricing.totalOriginalPrice)}

💳 پرداخت
• وضعیت: ${transaction.paymentStatus}
• درگاه: زرین‌پال
• کارت: ${transaction.cardPan || '-'}

⏰ زمان‌ها
• ایجاد: ${new Date(transaction.createdAt).toLocaleString('fa-IR')}
• پرداخت: ${transaction.paidAt ? new Date(transaction.paidAt).toLocaleString('fa-IR') : '-'}

🔗 مشاهده سفارش:
${baseUrl}/admin/transactions?search=${transaction._id}
    `.trim();
}
