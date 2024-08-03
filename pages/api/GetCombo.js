// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["youtube_25_million", "two_factor_authentication", "hamstergpt"],
    date: "03-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
