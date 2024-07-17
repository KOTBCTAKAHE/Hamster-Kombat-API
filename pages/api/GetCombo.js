// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["appstore_launch", "nft_collection_launch", "tg_leaders"],
    date: "17-07-24"
  });
}
