import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Database", conn.connection.host);
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

export default connectDB;
