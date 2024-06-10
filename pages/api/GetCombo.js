// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["meme_coins", "shit_coins", "influencers"],
    date: "10-06-24"
  });
}
