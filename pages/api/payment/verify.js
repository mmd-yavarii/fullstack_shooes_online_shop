import { ZarinPal } from 'zarinpal-node-sdk';

import Transaction from '@/models/Transaction';
import connectDB from '@/lib/db';

const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT,
    sandbox: true,
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    await connectDB();

    const { Authority, Status } = req.query;

    // کاربر پرداخت را لغو کرده یا ناموفق بوده
    if (!Authority || Status !== 'OK') {
        return res.redirect(`${process.env.BASE_URL}/payment/fail?reason=cancelled`);
    }

    try {
        // پیدا کردن تراکنش
        const transaction = await Transaction.findOne({
            authority: Authority,
        });

        if (!transaction) {
            return res.redirect(`${process.env.BASE_URL}/payment/fail?reason=not_found`);
        }

        // اگر قبلاً پرداخت شده
        if (transaction.paymentStatus === 'paid') {
            return res.redirect(`${process.env.BASE_URL}/payment/success`);
        }

        // verify پرداخت
        const response = await zarinpal.verifications.verify({
            amount: transaction.pricing.totalFinalPrice,
            authority: Authority,
        });

        const code = response?.data?.code;

        // پرداخت موفق
        if (code === 100 || code === 101) {
            transaction.paymentStatus = 'paid';
            transaction.orderStatus = 'confirmed';

            // ذخیره اطلاعات پرداخت
            transaction.refId = response.data.ref_id;
            transaction.cardPan = response.data.card_pan;

            await transaction.save();

            return res.redirect(`${process.env.BASE_URL}/payment/success`);
        }

        // پرداخت ناموفق
        transaction.paymentStatus = 'failed';
        await transaction.save();

        return res.redirect(`${process.env.BASE_URL}/payment/fail?reason=verify_failed`);
    } catch (error) {
        console.error('VERIFY ERROR:', error);

        return res.redirect(`${process.env.BASE_URL}/payment/fail?reason=server_error`);
    }
}
