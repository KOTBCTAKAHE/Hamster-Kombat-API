// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["qa_team", "meme_coins", "license_japan"],
    date: "07-06-24"
  });
}
