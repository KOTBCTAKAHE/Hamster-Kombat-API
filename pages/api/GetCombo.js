// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["dex", "tg_leaders", "sports_integration_0907"],
    date: "09-07-24"
  });
}
