// pages/api/GetCombo.js
export default function handler(req, res) {
  res.status(200).json({
    combo: ["licence_europe", "staking", "sports_integration_0607"],
    date: "06-07-24"
  });
}
