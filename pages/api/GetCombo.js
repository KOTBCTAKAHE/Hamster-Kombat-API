// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["prediction_markets", "derivatives", "licence_japan"],
    date: "16-06-24"
  });
}
