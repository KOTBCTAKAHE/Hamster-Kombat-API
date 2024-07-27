// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["hamsterbank", "top10_global", "usdt_on_ton"],
    date: "27-07-24"
  });
}
