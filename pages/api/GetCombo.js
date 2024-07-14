// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["sports_integration_1407", "youtube", "anti_money_loundering"],
    date: "11-07-24"
  });
}
