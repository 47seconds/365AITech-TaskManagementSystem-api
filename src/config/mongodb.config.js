import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  } catch (error) {
    console.log(`ERROR: Failed to connect to MongoDB server: ${error}`);
    process.exit(-1);
  }
};
