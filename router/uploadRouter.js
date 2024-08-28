import express from "express";
import upload from "../middleware/upload";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/upload", auth, upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send({ filePath: req.file.path });
});

export default uploadRouter = router;
