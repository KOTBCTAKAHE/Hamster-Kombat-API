// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["kyb", "tokenomics_expert", "tg_leaders"],
    date: "30-06-24"
  });
}
