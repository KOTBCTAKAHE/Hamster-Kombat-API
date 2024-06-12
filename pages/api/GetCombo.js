// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["licence_europe", "top10_global", "prediction_markets"],
    date: "12-06-24"
  });
}
