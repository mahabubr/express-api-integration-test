import request from "supertest";
import app from "..";

describe("SEARCH API TEST WITHOUT DATABASE", () => {
  it("GET /api/search should return a search query", async () => {
    const result = await request(app)
      .get("/api/search")
      .query({ term: "Finding bugs" });

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("results", [{ term: "Finding bugs" }]);
  });

  it("GET /data/async should complete async operations correctly", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout").mockImplementation((cb) => cb());

    const result = await request(app).get("/api/data/async");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("data", "Delayed Data");
  });
});
