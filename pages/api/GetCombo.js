// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["healthy_hamster", "hamster_youtube_gold_button", "partnership_program"],
    date: "06-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
