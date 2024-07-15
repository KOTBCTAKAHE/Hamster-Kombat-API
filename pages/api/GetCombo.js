// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["call_btc_rise", "product_team", "eth_pairs"],
    date: "15-07-24"
  });
}
