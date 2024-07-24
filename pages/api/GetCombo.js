// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["telegram_miniapp_launch", "villa_for_dev_team", "hamster_youtube_gold_button"],
    date: "24-07-24"
  });
}
