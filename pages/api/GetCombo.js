// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["it_team", "hamster_youtube_gold_button", "product_team"],
    date: "13-06-24"
  });
}
