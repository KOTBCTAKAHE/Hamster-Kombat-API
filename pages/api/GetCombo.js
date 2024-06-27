// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["long_squeeze", "short_squeeze", "licence_philippines"],
    date: "27-06-24"
  });
}
