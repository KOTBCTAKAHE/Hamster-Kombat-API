// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["p2p_trading", "hamster_kombat_merch", "defi2.0_tokens"],
    date: "08-06-24"
  });
}
