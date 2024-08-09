import { sql } from "@vercel/postgres";
import { JSDOM } from "jsdom";
import { DateTime } from "luxon";

export default async function handler(req, res) {
    const cardIds = require('../../allcardids.json');

    // Получаем текущее время в UTC
    const now = DateTime.now().toUTC();
    
    // Если текущее время до 12:00, используем вчерашнюю дату
    const referenceHour = 12;
    let date;
    if (now.hour < referenceHour) {
        date = now.minus({ days: 1 }).startOf('day');
    } else {
        date = now.startOf('day');
    }

    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    const monthName = months[date.month - 1];
    const day = date.day;

    try {
        // Получаем последнюю запись из таблицы combo
        const { rows } = await sql`SELECT * FROM combo ORDER BY date DESC LIMIT 1`;
        let apiData = rows[0];

        // Проверка на случай, если записи не найдено
        if (!apiData) {
            apiData = {
                combo: [],
                date: "01-01-70" // дата, которая точно будет меньше текущей
            };
        }

        let apiDate = DateTime.fromFormat(apiData.date, "dd-MM-yy");

        // Проверяем, нужно ли обновить данные
        if (apiDate.toISODate() !== date.toISODate()) {
            let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;

            const response = await fetch(url, { mode: 'no-cors' });
            const html = await response.text();
            const dom = new JSDOM(html);
            const tagLiList = dom.window.document.getElementsByTagName("li");

            let comboArr = [];
            for (let i = 0; i < tagLiList.length; i++) {
                cardIds.upgradesForBuy.forEach(card => {
                    if (card.name === tagLiList[i].textContent.slice(0, -1)) {
                        comboArr.push(card.id);
                    }
                });
            }

            if (comboArr.length !== 3) {
                return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
            }

            // Обновляем данные в базе данных
            const newComboData = {
                combo: comboArr,
                date: date.toFormat("dd-MM-yy")
            };

            await sql`INSERT INTO combo (combo, date) VALUES (${comboArr}, ${newComboData.date})`;

            res.status(200).send("Success");

        } else {
            res.status(200).send("Already updated");
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error: ' + error.message);
    }
}
