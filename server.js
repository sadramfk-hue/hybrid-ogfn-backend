
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3552;

app.get("/", (req, res) => {
  res.json({
    project: "HYBRID OGFN",
    season: "Chapter 1 Season 8",
    status: "online"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/matchmaking/status", (req, res) => {
  res.json({
    status: "waiting",
    players: 0,
    gameServerConnected: false
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`HYBRID backend running on port ${PORT}`);
});
