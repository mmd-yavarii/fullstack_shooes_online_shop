export async function sendBaleMessage(message) {
    // https://tapi.bale.ai/bot<TOKEN>/getUpdates

    const token = process.env.BALE_BOT_TOKEN;
    const chatId = process.env.BALE_CHAT_ID;

    const response = await fetch(`https://tapi.bale.ai/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.description || 'Bale error');
    }

    return data;
}
