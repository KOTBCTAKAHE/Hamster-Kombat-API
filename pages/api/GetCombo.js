// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["oracle", "margin_trading_x30", "sports_integration_1007"],
    date: "10-07-24"
  });
}
