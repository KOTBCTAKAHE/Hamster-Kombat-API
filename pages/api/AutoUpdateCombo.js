export default function handler(req, res) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { DateTime } = require("luxon");
    const fs = require('node:fs');

    const apiData = require('../../json/combo.json');
    const cardIds = require('../../allcardids.json');

    let date = DateTime.now();
    let apiDate = DateTime.fromFormat(apiData.date, "dd-MM-yy");

    // Массив с названиями месяцев на транслите
    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[date.month - 1]; // -1, потому что месяцы идут от 1 до 12
    let day = date.day;

    let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;

    fetch(url, { mode: 'no-cors'})
        .then(response => response.text())
        .then(html => new JSDOM(html))
        .then(dom => {
            let tagLiList = dom.window.document.getElementsByTagName("li");

            let comboArr = new Array();
            // Перебираем все li в #list
            for(let i = 0; i < tagLiList.length; i++) {
                cardIds.upgradesForBuy.forEach(card => {
                    if (card.name == tagLiList[i].textContent.slice(0, -1)) {
                        comboArr.push(card.id);
                    }
                });
            }

            if (comboArr.length != 3) {
                res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
            }

            apiData.combo = comboArr;
            let newComboJson = {
                             combo: comboArr,
                             date: date.toFormat("dd-MM-yy")
                           };

            fs.writeFile("./json/combo.json", JSON.stringify(newComboJson), function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error: ' + err)
                }
            });

            res.status(200).send("Success");

        })
        .catch(err => res.status(500).send('Error: ' + err));
    } else {
        res.status(200).send("Already updated");
    }
}
