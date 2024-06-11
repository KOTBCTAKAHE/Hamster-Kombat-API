// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["youtube", "hamster_drop", "instagram"],
    date: "11-06-24"
  });
}
