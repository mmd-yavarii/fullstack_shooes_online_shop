export async function sendBaleMessage(message) {
    const token = process.env.BALE_BOT_TOKEN;

    const chatIds = [process.env.BALE_CHAT_ID, process.env.BALE_CHAT_ID2, process.env.BALE_CHAT_ID3].filter(Boolean);

    const url = `https://tapi.bale.ai/bot${token}/sendMessage`;

    const responses = await Promise.all(
        chatIds.map((chatId) =>
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
        )
    );

    const results = await Promise.all(responses.map((res) => res.json()));

    return results;
}
