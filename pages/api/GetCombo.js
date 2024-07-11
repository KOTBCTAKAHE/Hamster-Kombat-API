// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["vesting_smartcontracts", "medium", "hamster_youtube_gold_button"],
    date: "11-07-24"
  });
}
