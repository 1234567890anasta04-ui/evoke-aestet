export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, contact, idea } = req.body || {};

  const TOKEN = '8471702638:AAGlNesaCJ91sigxSj4epI5-7TSrY8g08oo';
  const CHAT_ID = '1060165238';

  let message = `🖤 <b>Новая заявка на татуировку!</b>\n\n`;
  message += `👤 <b>Имя:</b> ${name || 'Не указано'}\n`;
  message += `📞 <b>Контакт:</b> ${contact || 'Не указано'}\n`;
  message += `💡 <b>Идея / размер:</b> ${idea || 'Не указано'}\n`;
  message += `📍 <i>Краснодарский край, г. Армавир, ул. Халтурина</i>`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
      })
    });

    const data = await telegramRes.json();
    if (data.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(500).json({ error: data.description });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
