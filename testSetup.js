import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "./db.js";

let mongoServer;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.NODE_ENV === "test" && (await connectToDatabase(uri));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
