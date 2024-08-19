// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = require('../../json/combo.json');

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
