// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["blocking_suspicious_accounts", "youtube_25_million", "compliance_officer"],
    date: "29-06-24"
  });
}
