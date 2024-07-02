// pages/api/GetCombo.js
export default function handler(req, res) {
  res.status(200).json({
    combo: ["sports_integration", "instagram", "trading_bots"],
    date: "02-07-24"
  });
}
