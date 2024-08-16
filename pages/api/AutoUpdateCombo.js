import { sql } from "@vercel/postgres";
import { DateTime } from "luxon";
import fetch from "node-fetch";
import cheerio from "cheerio";

export default async function handler(req, res) {
    const cardIds = require('../../allcardids.json');

    
    let date = DateTime.now().setZone('utc');

   
    if (date.hour < 12) {
        date = date.minus({ days: 1 });
    }

    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[date.month - 1];
    let day = date.day;

    try {
       
        const { rows } = await sql`SELECT combo, TO_CHAR(date, 'DD-MM-YY') as formatted_date FROM combo ORDER BY date DESC LIMIT 1`;

       
        if (rows.length === 0) {
            return res.status(500).send("No data found in the database.");
        }

        let apiData = rows[0];
        let currentCombo = apiData.combo; 

       
        let apiDate = DateTime.fromFormat(apiData.formatted_date, "dd-MM-yy");

        
        if (apiDate.day != date.day) {
            const response = await fetch("https://hamstercombos.com/hamstercombos/public/api/hamster-kombat-card-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ /* any necessary payload */ }),
            });

            let comboArr = [];

            if (response.ok) {
                const result = await response.json();
                if (!result.status) {
                    return res.status(500).send("Failed to fetch cards from API.");
                }

                const dailyComboCards = result.data.dailyComboCards;

                dailyComboCards.forEach(dailyCard => {
                    const cardName = dailyCard.card_name;
                    const matchedCard = cardIds.upgradesForBuy.find(card => card.name === cardName);

                    if (matchedCard) {
                        comboArr.push(matchedCard.id);
                    }
                });

            } else {
                
                const pageUrl = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;
                const pageResponse = await fetch(pageUrl);
                const pageHtml = await pageResponse.text();

                const $ = cheerio.load(pageHtml);
                const liElements = $('ul li');

                liElements.each((index, element) => {
                    let cardName = $(element).text().replace(/[\n\t]/g, '').replace(/&nbsp;/g, ' ').replace(/;/g, '').trim();
                    const matchedCard = cardIds.upgradesForBuy.find(card => card.name === cardName);

                    if (matchedCard) {
                        comboArr.push(matchedCard.id);
                    }
                });
            }

            
            if (comboArr.length !== 3) {
                return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
            }

            
            const isSameCombo = comboArr.length === currentCombo.length && 
                                comboArr.every((val, index) => val === currentCombo[index]);

            if (isSameCombo) {
                return res.status(200).send("Combo has not changed, no update needed.");
            }

            
            const newComboData = {
                combo: comboArr,
                date: date.toFormat("yyyy-MM-dd")
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
