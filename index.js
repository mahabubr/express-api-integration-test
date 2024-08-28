import express from "express";
import { crudRouter } from "./router/crudRouter.js";
import { searchRouter } from "./router/searchRouter.js";
import { productRouter } from "./router/productRouter.js";
import { booksRouter } from "./router/booksRouter.js";
import connectToDatabase from "./db.js";
import authRouter from "./router/authRouter.js";
import uploadRouter from "./router/uploadRouter.js";

const app = express();
const port = 4242;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

// connectToDatabase("mongodb://localhost:27017/books");

app.use("/api", crudRouter);
app.use("/api", searchRouter);
app.use("/api", productRouter);
app.use("/api", booksRouter);
app.use("/api", authRouter);
app.use("/api", uploadRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
