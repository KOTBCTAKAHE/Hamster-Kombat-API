// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["licence_vietnam", "security_team", "prediction_markets"],
    date: "23-06-24"
  });
}
