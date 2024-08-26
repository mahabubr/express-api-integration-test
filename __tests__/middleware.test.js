import request from "supertest";
import app from "..";

describe("MIDDLEWARE TEST", () => {
  it("should log the request url", async () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});

    await request(app).get("/api/greeting");

    expect(spy).toHaveBeenCalledWith(expect.stringContaining("/api/greeting"));
    spy.mockRestore();
  });
});
