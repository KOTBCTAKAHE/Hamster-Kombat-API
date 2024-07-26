// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["twitter_10_million", "hamster_drop", "special_hamster_conference"],
    date: "26-07-24"
  });
}
