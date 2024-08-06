// pages/api/GetCombo.js

export default function handler(req, res) {
  const data = {
    combo: ["sleeping_hamster", "bisdev_team", "hamster_youtube_channel"],
    date: "06-08-24"
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(data, null, 2));
}
