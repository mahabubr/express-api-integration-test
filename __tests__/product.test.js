import request from "supertest";
import app from "..";

describe("PRODUCT CRUD API TEST WITHOUT DATABASE", () => {
  let productId = 1;

  it("POST /api/product should create a new product", async () => {
    const payload = {
      name: "Shoes",
      price: 542.05,
      category: "Adidas",
    };

    const result = await request(app).post("/api/product").send(payload);

    expect(result.status).toBe(201);

    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("price");
    expect(result.body).toHaveProperty("category");

    expect(result.body.name).toBe(payload.name);
    expect(result.body.price).toBe(payload.price);
    expect(result.body.category).toBe(payload.category);

    productId = result.body.id;
  });

  it("GET /api/product should return all the products", async () => {
    const result = await request(app).get("/api/product");

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("products");
    expect(result.body).toHaveProperty("limit");
    expect(result.body).toHaveProperty("page");
    expect(result.body).toHaveProperty("total");
    expect(result.body.products).toBeInstanceOf(Array);
    expect(result.body.products.length).toBeGreaterThan(0);
  });

  it("GET /api/product/:id should return single products", async () => {
    const result = await request(app).get(`/api/product/${productId}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", productId);
    expect(result.body.name).toBe("Shoes");
    expect(result.body.price).toBe(542.05);
    expect(result.body.category).toBe("Adidas");
  });

  it("PUT /api/product/:id should update product", async () => {
    const payload = {
      name: "Update Shoes",
      price: 100,
      category: "Update Adidas",
    };

    const result = await request(app)
      .put(`/api/product/${productId}`)
      .send(payload);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", productId);
    expect(result.body.name).toBe("Update Shoes");
    expect(result.body.price).toBe(100);
    expect(result.body.category).toBe("Update Adidas");
  });

  it("DELETE /api/product/:id should delete the product", async () => {
    const result = await request(app).delete(`/api/product/${productId}`);

    expect(result.status).toBe(200);

    const getResponse = await request(app).get(`/api/product/${productId}`);

    expect(getResponse.status).toBe(404);
  });
});

describe("PRODUCT ERROR CRUD API TEST WITHOUT DATABASE", () => {
  let productId = -1;

  it("POST /api/product should give validation error", async () => {
    const result = await request(app).post("/api/product").send({});

    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty("message", "Missing fields");
  });

  it("GET /api/product/:id should give validation error", async () => {
    const result = await request(app).get(`/api/product/${productId}`);

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("Product not found");
  });
});
