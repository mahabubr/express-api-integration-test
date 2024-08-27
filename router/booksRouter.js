import express from "express";
import Book from "../model/booksModel.js";

const router = express.Router();

router.post("/books/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ errors: error.errors });
  }
});

router.get("/books/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ errors: error.errors });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});


export const booksRouter = router;
