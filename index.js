import express from "express";
import { crudRouter } from "./router/crudRouter.js";
const app = express();
const port = 4242;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

app.use("/api", crudRouter);

app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
