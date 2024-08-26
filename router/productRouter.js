import express from "express";

const router = express.Router();

let products = [];
let nextId = 1;

router.post("/product", (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price)
    return res.status(400).send({ message: "Missing fields" });

  const newProduct = { id: nextId++, name, category, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get("/product/", (req, res) => {
  let { page = 1, limit = 10, search = "", filter = "" } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  let filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? p.category.toLowerCase() === filter.toLowerCase() : true)
  );

  const total = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  res.json({
    total,
    page,
    limit,
    products: paginatedProducts,
  });
});

router.get("/product/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id, 10));
  if (!product) return res.status(404).send({ message: "Product not found" });
  res.json(product);
});

router.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const index = products.findIndex((p) => p.id === parseInt(id, 10));

  if (index === -1) return res.status(404).send("Product not found");
  if (!name || !category || !price)
    return res.status(400).send("Missing fields");

  products[index] = { id: parseInt(id, 10), name, category, price };
  res.json(products[index]);
});

router.delete("/product/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).send("Product not found");

  products.splice(index, 1);
  res.status(200).send();
});

export const productRouter = router;
