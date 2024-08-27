import request from "supertest";
import app from "..";

import "../testSetup";

describe("PRODUCT CRUD API TEST WITH DATABASE", () => {
  it("POST /api/books/ should create and new book and check its properties", async () => {
    const payload = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedYear: 1925,
      genre: "Novel",
    };

    const result = await request(app).post("/api/books").send(payload);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("_id");
    expect(result.body.title).toBe("The Great Gatsby");
    expect(result.body.author).toBe("F. Scott Fitzgerald");
    expect(result.body.publishedYear).toBe(1925);
    expect(result.body.genre).toBe("Novel");
  });
});
