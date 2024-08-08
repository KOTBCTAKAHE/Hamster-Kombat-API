// pages/api/GetCombo.js
import 'dotenv/config';

export default function handler(req, res) {
  const combo = process.env.COMBO ? process.env.COMBO.split(',') : [];
  const date = process.env.DATE || 'Unknown date';

  const data = {
    combo: combo,
    date: date,
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
