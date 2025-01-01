import mongoose from "mongoose";

// MongoDB connection configuration
export const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("connected to MongoDB database...");
  } catch (error) {
    console.log(`ERROR: Failed to connect to MongoDB server: ${error}`);
    process.exit(-1);
  }
};
