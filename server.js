import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/spin", (req, res) => {
  const randomIndex = Math.floor(Math.random() * 12);
  res.json({ index: randomIndex });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Spin server running on port ${PORT}`);
});
