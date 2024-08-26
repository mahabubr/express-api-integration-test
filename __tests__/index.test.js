import request from 'supertest'
import app from "..";

describe("CRUD ERROR API TEST WITHOUT DATABASE", () => {
  it("GET /api/unknown should return a 404 error", async () => {
    const result = await request(app).get('/api/unknown')

    expect(result.statusCode).toEqual(404)
    expect(result.body).toHaveProperty("error", "Not Found")
  });
});
