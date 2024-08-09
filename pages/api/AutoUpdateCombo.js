export default function handler(req, res) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { DateTime } = require("luxon");
    const fs = require('node:fs');

    const apiData = require('../../json/combo.json');
    const cardIds = require('../../allcardids.json');

    let currentDateTime = DateTime.now().setZone('UTC');  
    let targetDate = currentDateTime.hour < 12 ? currentDateTime.minus({ days: 1 }) : currentDateTime;

    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[targetDate.month - 1];
    let day = targetDate.day;

    let apiDate = DateTime.fromFormat(apiData.date, "dd-MM-yy");

    if (apiDate.day != targetDate.day) {  // Проверка даты
        let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-${day}-${day + 1}-${monthName}-2024-goda`;
        fetch(url, { mode: 'no-cors'})
            .then(response => response.text())
            .then(html => new JSDOM(html))
            .then(dom => {
                let tagLiList = dom.window.document.getElementsByTagName("li");

                let comboArr = new Array();
                for(let i = 0; i < tagLiList.length; i++) {
                    cardIds.upgradesForBuy.forEach(card => {
                        if (card.name == tagLiList[i].textContent.slice(0, -1)) {
                            comboArr.push(card.id);
                        }
                    });
                }

                if (comboArr.length != 3) {
                    res.status(500).send(`Failed. Found ${comboArr.length} cards of 3`);
                    return;  // Завершаем выполнение, если не найдено 3 карты
                }

                let newComboJson = {
                    combo: comboArr,
                    date: targetDate.toFormat("dd-MM-yy")
                };

                fs.writeFile("./json/combo.json", JSON.stringify(newComboJson), function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error: ' + err);
                    } else {
                        res.status(200).send("Success");
                    }
                });

            })
            .catch(err => res.status(500).send('Error: ' + err));
    } else {
        res.status(200).send("Already updated");
    }
}
