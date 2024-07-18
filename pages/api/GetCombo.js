// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["telegram_50m", "top10_global", "web3_academy_launch"],
    date: "18-07-24"
  });
}
