import mongoose from "mongoose";

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri, {});
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
