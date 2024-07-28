// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["web3_academy_launch", "grant_developers", "apps_center_listing"],
    date: "28-07-24"
  });
}
