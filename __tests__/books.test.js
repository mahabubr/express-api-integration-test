import request from "supertest";
import app from "..";

import "../testSetup";

describe("PRODUCT CRUD API TEST WITH DATABASE", () => {
  let bookId;

  it("POST /api/books/ should create and new book and check its properties", async () => {
    const payload = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedYear: 1925,
      genre: "Novel",
    };

    const result = await request(app).post("/api/books").send(payload);

    bookId = result.body._id;

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("_id");
    expect(result.body.title).toBe("The Great Gatsby");
    expect(result.body.author).toBe("F. Scott Fitzgerald");
    expect(result.body.publishedYear).toBe(1925);
    expect(result.body.genre).toBe("Novel");
  });

  it("GET /books/ should retrieve all books", async () => {
    const result = await request(app).get("/api/books");

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
    expect(result.body[0]).toHaveProperty("_id");
    expect(result.body[0].title).toBe("The Great Gatsby");
    expect(result.body[0].author).toBe("F. Scott Fitzgerald");
    expect(result.body[0].publishedYear).toBe(1925);
    expect(result.body[0].genre).toBe("Novel");
  });

  it("GET /books/:id should return a single book", async () => {
    const result = await request(app).get(`/api/books/${bookId}`);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("_id");
    expect(result.body.title).toBe("The Great Gatsby");
    expect(result.body.author).toBe("F. Scott Fitzgerald");
    expect(result.body.publishedYear).toBe(1925);
    expect(result.body.genre).toBe("Novel");
  });

  it("PUT /books/:id should update the book data", async () => {
    const result = await request(app)
      .put(`/api/books/${bookId}`)
      .send({ title: "The Super Great Gatsby" });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("_id");
    expect(result.body.title).toBe("The Super Great Gatsby");
    expect(result.body.author).toBe("F. Scott Fitzgerald");
    expect(result.body.publishedYear).toBe(1925);
    expect(result.body.genre).toBe("Novel");
  });

  it("DELETE /books/:id should delete the single book by ID", async () => {
    const result = await request(app).delete(`/api/books/${bookId}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("_id");
    expect(result.body.title).toBe("The Super Great Gatsby");
    expect(result.body.author).toBe("F. Scott Fitzgerald");
    expect(result.body.publishedYear).toBe(1925);
    expect(result.body.genre).toBe("Novel");
  });
});
