import { ZarinPal } from 'zarinpal-node-sdk';

import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';
import { buildOrderMessage } from '@/lib/telegram/orderMessage';
import { sendBaleMessage } from '@/lib/telegram/sendMessage';

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
            const refId = response.data.ref_id?.toString();

            transaction.paymentStatus = 'paid';
            transaction.refId = refId;
            transaction.cardPan = response.data.card_pan;
            transaction.paidAt = new Date();

            await transaction.save();

            console.log('\n\n\n', transaction, '\n\n\n');

            try {
                const message = buildOrderMessage(transaction, refId);
                await sendBaleMessage(message);
            } catch (err) {
                console.error('BALE ERROR:', err);
            }

            return res.redirect(`/payment/success?status=success&pay=${refId}`);
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
