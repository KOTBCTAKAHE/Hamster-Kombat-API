// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["defi2.0_tokens", "x", "derivatives"],
    date: "04-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
