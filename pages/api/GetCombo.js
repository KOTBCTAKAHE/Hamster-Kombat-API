// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["bitcoin_pizza_day", "marketing", "adv_integration_1307"],
    date: "16-07-24"
  });
}
