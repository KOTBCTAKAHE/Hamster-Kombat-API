import { sql } from "@vercel/postgres";
import { JSDOM } from "jsdom";
import { DateTime } from "luxon";
import iconv from 'iconv-lite';

export default async function handler(req, res) {
    const cardIds = require('../../allcardids.json');

    // Получаем текущее время по UTC
    let date = DateTime.now().setZone('utc');

    // Если время еще не 12:00 по UTC, используем вчерашнюю дату
    if (date.hour < 12) {
        date = date.minus({ days: 1 });
    }

    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[date.month - 1];
    let day = date.day;

    try {
        // Подключение к базе данных и получение последней записи
        const { rows } = await sql`SELECT combo, TO_CHAR(date, 'DD-MM-YY') as formatted_date FROM combo ORDER BY date DESC LIMIT 1`;
        
        // Проверка, есть ли данные в базе
        if (rows.length === 0) {
            return res.status(500).send("No data found in the database.");
        }

        let apiData = rows[0];
        
        // Получаем дату из базы данных в виде строки
        let apiDate = DateTime.fromFormat(apiData.formatted_date, "dd-MM-yy");

        // Проверка, нужно ли обновлять данные
        if (apiDate.day != date.day) {
            let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;

            const response = await fetch(url, { mode: 'no-cors' });
            const buffer = await response.arrayBuffer();
            const decodedHtml = iconv.decode(Buffer.from(buffer), 'utf-8'); // Декодируем в UTF-8

            const dom = new JSDOM(decodedHtml);
            const tagLiList = dom.window.document.getElementsByTagName("li");

            let comboArr = [];
            let foundCards = [];
            let notFoundCards = [];
            
            for (let i = 0; i < tagLiList.length; i++) {
                let cardName = tagLiList[i].textContent?.trim();  // Убираем лишние пробелы
                if (typeof cardName === 'string') {
                    let found = false;
                    cardIds.upgradesForBuy.forEach(card => {
                        if (card.name === cardName) {
                            comboArr.push(card.id);
                            foundCards.push(cardName);
                            found = true;
                        }
                    });
                    if (!found) {
                        notFoundCards.push(cardName);
                    }
                }
            }

            if (comboArr.length !== 3) {
                return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3. Found cards: ${foundCards.join(', ')}. Missing cards: ${notFoundCards.join(', ')}`);
            }

            // Обновление данных в базе данных
            const newComboData = {
                combo: comboArr,
                date: date.toFormat("yyyy-MM-dd") // Сохраняем в формате 'yyyy-MM-dd' для совместимости с типом DATE
            };

            await sql`INSERT INTO combo (combo, date) VALUES (${newComboData.combo}, ${newComboData.date})`;

            res.status(200).send("Success");

        } else {
            res.status(200).send("Already updated");
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error: ' + error.message);
    }
}
