// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["compliance_officer", "dao", "rolex_soulmate"],
    date: "21-07-24"
  });
}
