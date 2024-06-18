// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["youtube", "reddit", "licence_india"],
    date: "18-06-24"
  });
}
