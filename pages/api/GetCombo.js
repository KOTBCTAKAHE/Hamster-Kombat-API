// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["compliance_officer", "antihacking_shield", "influencers"],
    date: "02-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
