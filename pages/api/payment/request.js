const sandboxMode = true;

import Transaction from '@/models/Transaction';
import { ZarinPal } from 'zarinpal-node-sdk';
import connectDB from '@/lib/db';

// zarinpal init
const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT,
    sandbox: sandboxMode,
});

// create payment request
async function initiatePayment(amount, phone, orderId) {
    const response = await zarinpal.payments.create({
        amount,
        callback_url: `${process.env.BASE_URL}/api/payment/callback`,
        description: `phone: ${phone} | orderId: ${orderId}`,
        mobile: phone,
    });

    return response;
}

export default async function handler(req, res) {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        const { pricing, user, orderId } = req.body || {};

        // validation
        if (!orderId) {
            return res.status(400).json({
                message: 'Order id is required',
            });
        }

        if (!pricing?.totalFinalPrice || !user?.phone) {
            return res.status(400).json({
                message: 'Invalid input',
            });
        }

        // find transaction
        const transaction = await Transaction.findById(orderId);

        if (!transaction) {
            return res.status(404).json({
                message: 'Transaction not found',
            });
        }

        // avoid repay transaction
        if (transaction.paymentStatus === 'paid') {
            return res.status(400).json({
                message: 'Transaction already paid',
            });
        }

        const amount = Math.floor(pricing.totalFinalPrice);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Invalid amount',
            });
        }

        // create payment
        const payment = await initiatePayment(amount, user.phone, orderId);

        const authority = payment?.data?.authority;

        if (!authority) {
            throw new Error('No authority returned from ZarinPal');
        }

        // save authority
        transaction.authority = authority;

        transaction.paymentStatus = 'pending';

        await transaction.save();

        return res.status(200).json({
            success: true,
            authority,
            url: sandboxMode ? `https://sandbox.zarinpal.com/pg/StartPay/${authority}` : `https://www.zarinpal.com/pg/StartPay/${authority}`,
        });
    } catch (error) {
        console.error('PAYMENT REQUEST ERROR:', error);

        return res.status(500).json({
            success: false,
            message: 'Payment failed',
        });
    }
}
