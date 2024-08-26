import express from "express";

const router = express.Router();

router.get("/greeting", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

router.post("/echo", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  res.status(200).json({ message });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(200).json({ id, name });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Item ${id} deleted` });
});

export const crudRouter = router;
