import express from "express";

const router = express.Router();

router.get("/search", (req, res) => {
  const { term } = req.query;
  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }
  res.status(200).json({ results: [{ term }] });
});

router.get("/data/async", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ data: "Delayed Data" });
  }, 1000);
});


export const searchRouter = router