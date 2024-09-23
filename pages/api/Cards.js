export default function handler(req, res) {
  // Импортируем данные из JSON-файла
  const data = require('../../json/all_card_ids.json');

  // Устанавливаем заголовок для JSON
  res.setHeader('Content-Type', 'application/json');

  // Разрешаем CORS для любых сайтов
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Возвращаем данные с отступами
  res.status(200).send(JSON.stringify(data, null, 2)); // Отступ в 2 пробела
}
