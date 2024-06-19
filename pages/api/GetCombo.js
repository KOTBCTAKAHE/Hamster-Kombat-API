// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["special_hamster_conference", "trading_bots", "licence_india"],
    date: "19-06-24"
  });
}
