// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["twitter_10_million", "security_audition", "usdt_on_ton"],
    date: "26-06-24"
  });
}
