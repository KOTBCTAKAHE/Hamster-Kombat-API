// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["long_squeeze", "youtube", "fight_fight"],
    date: "22-07-24"
  });
}
