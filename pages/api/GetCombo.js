// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["gamefi_tokens", "villa_for_dev_team", "p2p_trading"],
    date: "20-06-24"
  });
}
