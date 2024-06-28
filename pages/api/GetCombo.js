// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["licence_ethiopia", "premarket_launch", "nft_collection_launch"],
    date: "28-06-24"
  });
}
