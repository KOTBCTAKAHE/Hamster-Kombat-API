// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["p2p_trading", "apps_center_listing", "nft_collection_launch"],
    date: "15-06-24"
  });
}
