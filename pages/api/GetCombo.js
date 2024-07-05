// pages/api/GetCombo.js
// вчера апи не менял, извиняюсь, занят был.
export default function handler(req, res) {
  res.status(200).json({
    combo: ["villa_for_dev_team", "youtube_25_million", "sports_integration_0607"],
    date: "05-07-24"
  });
}
