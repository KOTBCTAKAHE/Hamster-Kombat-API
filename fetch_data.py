import os
import json
import cloudscraper
import requests
from pathlib import Path

# Получаем токен из переменной окружения
authorization_token = os.getenv('AUTHORIZATION_TOKEN') or os.getenv('TOKEN')

if not authorization_token:
    print('Authorization token is not defined in environment variables')
    exit(1)

# Инициализируем Cloudflare Scraper
scraper = cloudscraper.create_scraper()

# Определяем заголовки запроса
headers = {
    'authority': 'api.hamsterkombatgame.io',
    'Accept': '*/*',
    'Accept-Encoding': 'application/json',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Authorization': authorization_token,
    'Content-Length': '0',
    'Origin': 'https://hamsterkombatgame.io',
    'Referer': 'https://hamsterkombatgame.io/',
    'Sec-Ch-Ua': '"Not.A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
}

url = 'https://api.hamsterkombatgame.io/interlude/upgrades-for-buy'

# Выполняем POST запрос
response = scraper.post(url, headers=headers)

if response.status_code == 200:
    data = response.json()

    # Определяем путь к JSON файлу
    json_dir = Path(__file__).parent / 'json'
    json_dir.mkdir(parents=True, exist_ok=True)
    file_path = json_dir / 'all_card_ids.json'

    # Записываем данные в файл
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f'Data saved to {file_path}')
else:
    print(f'Failed to fetch data. Status code: {response.status_code}')
