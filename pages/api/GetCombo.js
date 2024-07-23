// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["hamster_youtube_channel", "bitcoin_pizza_day", "mini_game"],
    date: "23-07-24"
  });
}
