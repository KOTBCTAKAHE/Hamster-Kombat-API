import { sql } from "@vercel/postgres";
import { DateTime } from "luxon";

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
        let currentCombo = apiData.combo; // Сохраняем текущую комбинацию карт

        // Получаем дату из базы данных в виде строки
        let apiDate = DateTime.fromFormat(apiData.formatted_date, "dd-MM-yy");

        // Проверка, нужно ли обновлять данные
        if (apiDate.day != date.day) {
            // Отправка POST запроса на API для получения списка карт
            const response = await fetch("https://hamstercombos.com/hamstercombos/public/api/hamster-kombat-card-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ /* any necessary payload */ }),
            });
            
            const result = await response.json();
            if (!result.status) {
                return res.status(500).send("Failed to fetch cards from API.");
            }

            let comboArr = [];
            const dailyComboCards = result.data.dailyComboCards;

            dailyComboCards.forEach(dailyCard => {
                const cardName = dailyCard.card_name;
                
                // Находим соответствующий ID карты из allcardids.json
                const matchedCard = cardIds.upgradesForBuy.find(card => card.name === cardName);
                
                if (matchedCard) {
                    comboArr.push(matchedCard.id);
                }
            });

            // Сравнение текущих карт с новыми
            const isSameCombo = comboArr.length === currentCombo.length && 
                                comboArr.every((val, index) => val === currentCombo[index]);

            if (isSameCombo) {
                return res.status(200).send("Combo has not changed, no update needed.");
            }

            if (comboArr.length !== 3) {
                return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
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
