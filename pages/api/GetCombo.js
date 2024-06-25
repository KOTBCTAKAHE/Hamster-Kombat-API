// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["licence_turkey", "licence_asia", "consensys_piranja_pass"],
    date: "25-06-24"
  });
}
