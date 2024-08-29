export default function handler(req, res) {
  // Импортируем данные из JSON-файла
  const data = require('../../json/Promo-Apps.json');

  // Устанавливаем заголовок для JSON и форматируем с отступами
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2)); // Отступ в 2 пробела
}
