export default async function handler(req, res) {
    const { Authority, Status } = req.query;

    if (Status !== 'OK') {
        return res.redirect('/payment-failed');
    }

    const verifyRes = await fetch('https://api.zarinpal.com/pg/v4/payment/verify.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            merchant_id: process.env.ZARINPAL_MERCHANT_ID,
            authority: Authority,
            amount: 100000,
        }),
    });

    const data = await verifyRes.json();

    if (data.data?.code === 100) {
        // پرداخت موفق
        return res.redirect('/payment-success');
    }

    return res.redirect('/payment-failed');
}
