// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["google_analytics", "security_audition", "medium"],
    date: "19-07-24"
  });
}
