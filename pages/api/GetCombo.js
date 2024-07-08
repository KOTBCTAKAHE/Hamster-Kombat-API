// pages/api/GetCombo.js
// уснул немного
export default function handler(req, res) {
  res.status(200).json({
    combo: ["security_team", "top10_global", "sports_integration_0807"],
    date: "08-07-24"
  });
}
