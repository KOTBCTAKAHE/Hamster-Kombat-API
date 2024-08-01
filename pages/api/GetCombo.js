// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["adv_integration_3107", "twitter_10_million", "top10_global"],
    date: "01-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
