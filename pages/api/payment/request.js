export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { amount, email } = req.body;

    const response = await fetch('https://api.zarinpal.com/pg/v4/payment/request.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            merchant_id: process.env.ZARINPAL_MERCHANT_ID,
            amount,
            callback_url: 'http://localhost:3000/api/payment/callback',
            description: 'Order Payment',
            metadata: {
                email,
            },
        }),
    });

    const data = await response.json();

    if (data.data?.code === 100) {
        return res.json({
            url: `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`,
        });
    }

    return res.status(400).json({ error: 'Payment failed' });
}
