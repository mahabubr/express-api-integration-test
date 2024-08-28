import request from "supertest";
import app from "..";
import jwt from "jsonwebtoken";

import "../testSetup";

describe("AUTHENTICATION API TEST WITH DATABASE", () => {
  describe("POST api/register", () => {
    it("should create a user", async () => {
      const payload = {
        username: "test user",
        password: "password123",
        email: "testuser@example.com",
      };

      const result = await request(app).post("/api/register").send(payload);

      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("username", "test user");
    });

    it("should return 400 if username is missing", async () => {
      const payload = {
        password: "password123",
        email: "testuser@example.com",
      };

      const result = await request(app).post("/api/register").send(payload);

      expect(result.status).toBe(400);
    });
  });

  describe("POST /api/login", () => {
    it("should login the user and return a valid JWT", async () => {
      const payload = {
        username: "test user",
        password: "password123",
      };

      const result = await request(app).post("/api/login").send(payload);

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("should return 400 if invalid credentials are provided", async () => {
      const payload = {
        username: "wrong user name",
        password: "wrong password",
      };

      const result = await request(app).post("/api/login").send(payload);

      expect(result.status).toBe(400);
    });
  });

  describe("GET /me", () => {
    it("should return the user profile if valid token is provided", async () => {
      const token = jwt.sign(
        { _id: "66cf337162b4cdc3ff3f81f0" },
        "your_jwt_secret"
      );

      const result = await request(app)
        .get("/api/me")
        .set("Authorization", token);

      expect(result.status).toBe(200);
    });

    it("should return 404 if not token is provided", async () => {
      const result = await request(app).get("/api/me");

      expect(result.status).toBe(401);
    });
  });
});
