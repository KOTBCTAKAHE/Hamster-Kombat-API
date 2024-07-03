// pages/api/GetCombo.js
export default function handler(req, res) {
  res.status(200).json({
    combo: ["sec_transparancy", "gamefi_tokens", "web3_game_con"],
    date: "03-07-24"
  });
}
