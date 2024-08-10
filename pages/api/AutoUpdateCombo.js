import { sql } from "@vercel/postgres";
import { JSDOM } from "jsdom";
import { DateTime } from "luxon";

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
        
        
        let apiDate = DateTime.fromFormat(apiData.formatted_date, "dd-MM-yy");


        if (apiDate.day != date.day) {
            let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;
            
            const response = await fetch(url, { mode: 'no-cors' });
            const html = await response.text();
            const dom = new JSDOM(html);
            const tagLiList = dom.window.document.getElementsByTagName("li");

            let comboArr = [];
            for (let i = 0; i < tagLiList.length; i++) {
                let cardName = tagLiList[i].textContent?.slice(0, -1);  // Защита от undefined
                

                cardName = cardName.replace(/&[^\;]*;/g, "");

                console.log("Parsed card name:", cardName);  // Debugging line

                if (typeof cardName === 'string') {
                    cardIds.upgradesForBuy.forEach(card => {
                        // Используем includes() для более гибкого соответствия
                        if (cardName.includes(card.name)) {
                            console.log(`Match found: ${cardName} matches ${card.name}`);  // Debugging line
                            comboArr.push(card.id);
                        }
                    });
                }
            }

            if (comboArr.length !== 3) {
                return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
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
