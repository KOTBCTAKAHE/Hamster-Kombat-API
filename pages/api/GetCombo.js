// pages/api/GetCombo.js
// с первым июля
export default function handler(req, res) {
  res.status(200).json({
    combo: ["sports_integration", "hamster_youtube_channel", "hamster_youtube_gold_button"],
    date: "01-07-24"
  });
}
