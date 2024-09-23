require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');

// Получаем токен из переменной окружения
const authorizationToken = process.env.AUTHORIZATION_TOKEN || process.env.TOKEN;

if (!authorizationToken) {
  console.error('Authorization token is not defined in environment variables');
  process.exit(1);
}

// Определяем заголовки запроса
const options = {
  hostname: 'api.hamsterkombatgame.io',
  path: '/interlude/upgrades-for-buy',
  method: 'POST',
  headers: {
    'authority': 'api.hamsterkombatgame.io',
    'Accept': '*/*',
    'Accept-Encoding': 'application/json',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Authorization': authorizationToken,
    'Content-Length': '0',
    'Origin': 'https://hamsterkombatgame.io',
    'Referer': 'https://hamsterkombatgame.io/',
    'Sec-Ch-Ua': '"Not.A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  }
};

const request = https.request(options, (res) => {
  let data = '';

  // Получаем ответ
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Путь к json-файлу
    const filePath = path.join(__dirname, 'json', 'all_card_ids.json');

    // Проверяем, существует ли директория
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Записываем данные в файл
    fs.writeFileSync(filePath, data, 'utf-8');
    console.log('Data saved to json/all_card_ids.json');
  });
});

request.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Завершаем запрос
request.end();
