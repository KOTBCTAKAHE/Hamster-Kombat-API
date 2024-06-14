export default function handler(req, res) {
  const validUserAgents = [
    "Python/3.11 aiohttp/3.9.3",
    "Python/3.10 aiohttp/3.9.3",
    "Python/3.10 aiohttp/3.9.1",
    "Python/3.12 aiohttp/3.9.3",
    "Python/3.12 aiohttp/3.9.5",
    "Python/3.11 aiohttp/3.9.5",
    "Python/3.10 aiohttp/3.9.5"
  ];

  const userAgent = req.headers['user-agent'];

  if (userAgent && (userAgent.startsWith('Python') || validUserAgents.includes(userAgent))) {
    res.status(200).json({
      combo: ["gamefi_tokens", "margin_trading_x30", "trading_bots"],
      date: "14-06-24"
    });
  } else {
    res.status(403).json({ message: "Ты не туда полез =)" });
  }
}
