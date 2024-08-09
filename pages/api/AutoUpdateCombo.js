const mysql = require('mysql2/promise');
const { JSDOM } = require("jsdom");
const { DateTime } = require("luxon");
const cardIds = require('../../allcardids.json');

export default async function handler(req, res) {
    
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    let date = DateTime.now();
    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[date.month - 1];
    let day = date.day;


    const [rows] = await connection.execute('SELECT * FROM combos ORDER BY id DESC LIMIT 1');
    let apiDate = rows.length ? DateTime.fromFormat(rows[0].date, "dd-MM-yy") : null;

    if (!apiDate || apiDate.day != date.day) {
        let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;
        fetch(url, { mode: 'no-cors'})
            .then(response => response.text())
            .then(html => new JSDOM(html))
            .then(dom => {
                let tagLiList = dom.window.document.getElementsByTagName("li");

                let comboArr = [];
                for(let i = 0; i < tagLiList.length; i++) {
                    cardIds.upgradesForBuy.forEach(card => {
                        if (card.name == tagLiList[i].textContent.slice(0, -1)) {
                            comboArr.push(card.id);
                        }
                    });
                }

                if (comboArr.length != 3) {
                    return res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
                }

                
                connection.execute(
                    'INSERT INTO combos (combo, date) VALUES (?, ?)',
                    [JSON.stringify(comboArr), date.toFormat("dd-MM-yy")]
                ).then(() => {
                    res.status(200).send("Success");
                }).catch(err => {
                    res.status(500).send('Error: ' + err);
                });

            })
            .catch(err => res.status(500).send('Error: ' + err));
    } else {
        res.status(200).send("Already updated");
    }

    
    connection.end();
}
