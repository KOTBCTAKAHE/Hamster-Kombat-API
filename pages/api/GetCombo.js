// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["tokenomics_expert", "hamster_youtube_gold_button", "anonymous_transactions_ban"],
    date: "31-07-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
