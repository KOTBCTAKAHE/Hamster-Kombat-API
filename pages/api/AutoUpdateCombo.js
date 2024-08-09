export default function handler(req, res) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { DateTime } = require("luxon");
    const fs = require('node:fs');

    const apiData = require('../../json/combo.json');
    const cardIds = require('../../allcardids.json');

    let url = `https://www.cybersport.ru/tags/games/kombo-karty-v-hamster-kombat-khomiak-na-8-9-avgusta-2024-goda`;
    
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
            } else {
                res.status(200).send("Success");
            }

        })
        .catch(err => res.status(500).send('Error: ' + err));
}
