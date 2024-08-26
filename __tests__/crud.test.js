import request from "supertest";
import app from "..";

describe("CRUD API TEST WITHOUT DATABASE", () => {
  it("GET /api/greeting should return a greeting message", async () => {
    const result = await request(app).get("/api/greeting");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("message", "Hello, World!");
  });

  it("POST /api/echo should return the echo message", async () => {
    const message = "Hello, Jest!";

    const result = await request(app).post("/api/echo").send({ message });

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("message", message);
  });

  it("PUT /api/update/:id should update and return the updated item", async () => {
    const update = { name: "Update Item" };
    const result = await request(app).put("/api/update/1").send(update);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("name", "Update Item");
  });

  it("DELETE /api/delete/:id should delete and return an item", async () => {
    const result = await request(app).delete("/api/delete/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("message", "Item 1 deleted");
  });
});

describe("CRUD API ERROR HANDLING TEST WITHOUT DATABASE", () => {
  it("POST /api/echo should return a 400 error if message is not provided", async () => {
    const result = await request(app).post("/api/echo").send({});

    expect(result.statusCode).toEqual(400);
    expect(result.body).toHaveProperty("error", "Message is required");
  });

  it("UPDATE /api/update/:id should return a 400 error if name is not provided", async () => {
    const result = await request(app).put("/api/update/1").send({});

    expect(result.statusCode).toEqual(400);
    expect(result.body).toHaveProperty("error", "Name is required");
  });
});
