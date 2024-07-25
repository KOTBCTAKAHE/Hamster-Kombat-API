// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["telegram_stars_integration", "bitcoin_conference_2024", "kamala_calling"],
    date: "25-07-24"
  });
}
