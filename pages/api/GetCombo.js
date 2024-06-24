// pages/api/GetCombo.js

export default function handler(req, res) {
  res.status(200).json({
    combo: ["vc_labs", "hamster_drop", "hamster_green_energy],
    date: "24-06-24"
  });
}
