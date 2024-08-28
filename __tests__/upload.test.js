import request from "supertest";
import app from "..";
import jwt from "jsonwebtoken";
import path from "path";

describe("UPLOAD IMAGE API TEST WITH MULTER", () => {
  describe("POST /api/upload", () => {
    it("should upload a photo successfully", async () => {
      const token = jwt.sign(
        { _id: "66cf337162b4cdc3ff3f81f0" },
        "your_jwt_secret"
      );

      const filePath = path.join("images.png");

      const result = await request(app)
        .post("/api/upload")
        .set("Authorization", token)
        .attach("photo", filePath);

      expect(result.status).toBe(200);
    });

    it("should return 400 if not file is uploaded", async () => {
      const token = jwt.sign(
        { _id: "66cf337162b4cdc3ff3f81f0" },
        "your_jwt_secret"
      );

      const result = await request(app)
        .post("/api/upload")
        .set("Authorization", token);

      expect(result.status).toBe(400);
      expect(result.text).toBe("No file uploaded.");
    });
  });
});
