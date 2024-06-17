// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["it_team", "meme_coins", "web3_academy_launch"],
    date: "17-06-24"
  });
}
