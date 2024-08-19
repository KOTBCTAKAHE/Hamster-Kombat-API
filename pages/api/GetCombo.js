// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["anti_money_loundering", "trading_bots", "compliance_officer"],
    date: "18-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
