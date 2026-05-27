import { ZarinPal } from 'zarinpal-node-sdk';

import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

const sandboxMode = true;

const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT,
    sandbox: sandboxMode,
});

export default async function handler(req, res) {
    await connectDB();

    const { Authority, Status } = req.query;

    if (!Authority) {
        return res.redirect('/payment/fail');
    }

    // user cancelled payment
    if (Status !== 'OK') {
        return res.redirect('/payment/fail');
    }

    try {
        const transaction = await Transaction.findOne({
            authority: Authority,
        });

        if (!transaction) {
            return res.redirect('/payment/fail');
        }

        // already paid
        if (transaction.paymentStatus === 'paid') {
            return res.redirect('/payment/success');
        }

        // verify payment
        const response = await zarinpal.verifications.verify({
            amount: Math.floor(transaction.pricing.totalFinalPrice),

            authority: Authority,
        });

        // success
        if (response.data.code === 100 || response.data.code === 101) {
            transaction.paymentStatus = 'paid';

            transaction.refId = response.data.ref_id?.toString();

            transaction.cardPan = response.data.card_pan;

            transaction.paidAt = new Date();

            await transaction.save();

            return res.redirect(`/payment/success?status=success`);
        }

        // failed
        transaction.paymentStatus = 'failed';

        await transaction.save();

        return res.redirect('/payment/fail');
    } catch (error) {
        console.error('VERIFY ERROR:', error);

        return res.redirect('/payment/fail');
    }
}
