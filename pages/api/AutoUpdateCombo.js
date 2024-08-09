import { sql } from "@vercel/postgres";
import { JSDOM } from "jsdom";
import { DateTime } from "luxon";

const cardIds = require('../../allcardids.json');

export default async function handler(req, res) {
  let date = DateTime.now().setZone('utc');
  if (date.hour < 12) date = date.minus({ days: 1 });
  const months = ["yanvarya", "fevralya", ...];
  let monthName = months[date.month - 1];
  let day = date.day;

  const { rows } = await sql`SELECT combo, TO_CHAR(date, 'DD-MM-YY') as formatted_date FROM combo ORDER BY date DESC LIMIT 1`;
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
      let cardName = tagLiList[i].textContent?.replace(/&[^\w;]+/g, "").trim().replace(/\s+$/, '');
      cardIds.upgradesForBuy.forEach(card => {
        if (card.name === cardName) comboArr.push(card.id);
      });
    }

    if (comboArr.length !== 3) {
      console.error(`Unexpected number of cards: ${comboArr.length}. HTML snippet:`, tagLiList[i].outerHTML);
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
}
