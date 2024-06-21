// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["staking", "licence_bangladesh", "hamster_youtube_gold_button"],
    date: "21-06-24"
  });
}
