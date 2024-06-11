// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["youtube", "hamster_drop", "instagram"],
    date: "10-06-24"
  });
}
