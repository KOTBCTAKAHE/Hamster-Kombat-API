// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["nft_metaverse", "nft_collection_launch", "hamster_green_energy"],
    date: "29-07-24"
  });
}
