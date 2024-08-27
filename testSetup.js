import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "./db.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await connectToDatabase(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
