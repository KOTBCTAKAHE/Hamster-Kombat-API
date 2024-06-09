// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["x", "dao", "trading_bots"],
    date: "09-06-24"
  });
}
