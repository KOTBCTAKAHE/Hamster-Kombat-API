const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const comboSchema = new mongoose.Schema({
    combo: [String],
    date: String
});

const Combo = mongoose.model('Combo', comboSchema);

export default async function handler(req, res) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { DateTime } = require("luxon");

    const cardIds = require('../../allcardids.json');

    let date = DateTime.now();
    let apiDate = DateTime.fromFormat(apiData.date, "dd-MM-yy");

    const months = ["yanvarya", "fevralya", "marta", "aprelya", "maya", "iyunya", 
                    "iyulya", "avgusta", "sentyabrya", "oktyabrya", "noyabrya", "dekabrya"];
    let monthName = months[date.month - 1];
    let day = date.day;

    if (apiDate.day != date.day) {
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

                const newCombo = new Combo({
                    combo: comboArr,
                    date: date.toFormat("dd-MM-yy")
                });

                newCombo.save(function(err) {
                    if (err) {
                        return res.status(500).send('Error: ' + err);
                    }
                    res.status(200).send("Success");
                });

            })
            .catch(err => res.status(500).send('Error: ' + err));
    } else {
        res.status(200).send("Already updated");
    }
}
